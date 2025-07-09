import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link, Links } from 'react-router-dom';

interface HeroBannerProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  title = "Shop Everything You Love",
  subtitle = "Discover millions of products with unbeatable prices and lightning-fast delivery",
  primaryButtonText = "Start Shopping",
  secondaryButtonText = "Explore Deals",
  onPrimaryClick,
  onSecondaryClick
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {title.split(' ').slice(0, -2).join(' ')}
              <span className="block text-yellow-300">
                {title.split(' ').slice(-2).join(' ')}
              </span>
            </h1>
            <p className="text-xl mb-8 text-green-100">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                 to={'/products'}
                onClick={onPrimaryClick}
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                {primaryButtonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button 
                onClick={onSecondaryClick}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                {secondaryButtonText}
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="animate-pulse">
              <div className="bg-white/20 rounded-2xl p-8 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-6xl mb-4">🛍️</div>
                  <div className="text-2xl font-bold">Special Offers</div>
                  <div className="text-green-200 mt-2">Up to 80% OFF</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;