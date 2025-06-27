import React from 'react';
import { Truck, Shield, RotateCcw, type LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  features?: Feature[];
}

const defaultFeatures: Feature[] = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Free shipping on orders above ₹499"
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7-day return policy for most items"
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "100% secure payment protection"
  }
];

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  features = defaultFeatures
}) => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;