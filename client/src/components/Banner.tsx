import React from 'react';

interface BannerOffer {
  title: string;
  subtitle: string;
  cta: string;
  gradient: string;
  icon?: string;
  onClick?: () => void;
}

interface BannerOffersProps {
  offers?: BannerOffer[];
}

const defaultOffers: BannerOffer[] = [
  {
    title: 'Mega Electronics Sale',
    subtitle: 'Up to 80% off on Electronics',
    cta: 'Shop Now',
    gradient: 'from-green-400 to-emerald-600',
    icon: '📱'
  },
  {
    title: 'Fashion Fiesta',
    subtitle: 'Trending styles at unbeatable prices',
    cta: 'Explore',
    gradient: 'from-emerald-500 to-teal-600',
    icon: '👕'
  },
  {
    title: 'Home Essentials',
    subtitle: 'Transform your space with 60% off',
    cta: 'Discover',
    gradient: 'from-teal-400 to-green-600',
    icon: '🏠'
  }
];

const BannerOffers: React.FC<BannerOffersProps> = ({
  offers = defaultOffers
}) => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r ${offer.gradient} rounded-2xl p-8 text-white relative overflow-hidden cursor-pointer hover:transform hover:scale-105 transition-transform duration-300`}
              onClick={offer.onClick}
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                <p className="text-white/90 mb-6">{offer.subtitle}</p>
                <button className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  {offer.cta}
                </button>
              </div>
              {offer.icon && (
                <div className="absolute -right-4 -bottom-4 text-8xl opacity-20">
                  {offer.icon}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BannerOffers;