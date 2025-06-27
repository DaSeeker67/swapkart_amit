import React from 'react';

interface Category {
  name: string;
  icon: string;
  items: string[];
}

interface NavigationProps {
  categories?: Category[];
  onCategoryClick?: (category: Category) => void;
}

const defaultCategories: Category[] = [
  { name: 'Electronics', icon: '📱', items: ['Mobiles', 'Laptops', 'Tablets'] },
  { name: 'Fashion', icon: '👕', items: ['Men', 'Women', 'Kids'] },
  { name: 'Home & Kitchen', icon: '🏠', items: ['Furniture', 'Appliances', 'Decor'] },
  { name: 'Books', icon: '📚', items: ['Fiction', 'Non-Fiction', 'Academic'] },
  { name: 'Sports', icon: '⚽', items: ['Cricket', 'Football', 'Fitness'] },
  { name: 'Beauty', icon: '💄', items: ['Skincare', 'Makeup', 'Haircare'] }
];

const Navigation: React.FC<NavigationProps> = ({
  categories = defaultCategories,
  onCategoryClick
}) => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center space-x-8 overflow-x-auto">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => onCategoryClick?.(category)}
                className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors group whitespace-nowrap"
              >
                <span className="text-lg">{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;