import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, Leaf, Truck, Shield, Recycle, Star, ArrowRight, ChevronDown, Package, Award, Zap } from 'lucide-react';
import Header from '@/components/common/Header';
import FeaturedProducts from '@/components/FeatureProduct';
import Footer from '@/components/common/Footer';
import type { Product } from '@/types';
import { Link } from 'react-router-dom';

// Mock data
const categories = [
  { id: 1, name: 'Electronics', icon: '📱', color: 'bg-blue-500' },
  { id: 2, name: 'Fashion', icon: '👕', color: 'bg-purple-500' },
  { id: 3, name: 'Home & Garden', icon: '🏠', color: 'bg-green-500' },
  { id: 4, name: 'Beauty', icon: '💄', color: 'bg-pink-500' },
  { id: 5, name: 'Sports', icon: '⚽', color: 'bg-orange-500' },
  { id: 6, name: 'Books', icon: '📚', color: 'bg-indigo-500' },
];

const featuredProducts = [
  {
    id: 1,
    name: 'Eco-Friendly Bamboo Phone Case',
    price: 599,
    originalPrice: 799,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop',
    ecoScore: 95,
    carbonNeutral: true,
    discount: 25
  },
  {
    id: 2,
    name: 'Organic Cotton T-Shirt',
    price: 899,
    originalPrice: 1299,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
    ecoScore: 88,
    carbonNeutral: true,
    discount: 31
  },
  {
    id: 3,
    name: 'Solar Power Bank 20000mAh',
    price: 2499,
    originalPrice: 3499,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop',
    ecoScore: 92,
    carbonNeutral: true,
    discount: 29
  },
  {
    id: 4,
    name: 'Recycled Plastic Sneakers',
    price: 1999,
    originalPrice: 2999,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop',
    ecoScore: 90,
    carbonNeutral: false,
    discount: 33
  }
];



const Navigation = ({ onCategoryClick }) => {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center space-x-8">
            <button className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors">
              <Menu className="h-4 w-4" />
              <span className="text-sm font-medium">All Categories</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {categories.slice(0, 4).map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryClick(category)}
                className="text-sm text-gray-700 hover:text-green-600 transition-colors"
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-4 text-sm">
            <span className="flex items-center space-x-1 text-green-600">
              <Leaf className="h-4 w-4" />
              <span className="font-medium">Carbon Neutral Shipping</span>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

const HeroBanner = ({ onPrimaryClick, onSecondaryClick }) => {
  return (
    <div className="relative bg-gradient-to-r from-green-50 to-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full">
              <Leaf className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-800">100% Sustainable Shopping</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Shop
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {' '}Sustainably
              </span>
              <br />
              Live Better
            </h1>
            
            <p className="text-xl text-gray-600 max-w-lg">
              Discover thousands of eco-friendly products that make a positive impact on our planet while meeting your everyday needs.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to={'/products'}
                onClick={onPrimaryClick}
                className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Start Shopping</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <button
                onClick={onSecondaryClick}
                className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors"
              >
                Explore Deals
              </button>
            </div>
            
            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Eco Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">95%</div>
                <div className="text-sm text-gray-600">Carbon Neutral</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">1M+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl transform rotate-3"></div>
            <img
              src="https://debutify-prd-admin-strapi.s3.amazonaws.com/6_Pu_G7_Pe2_W7bdx_T_Qb8t_O67_QI_Ujnb_L03_GT_0h0i_Qfap_40abb146b8.png"
              alt="Eco-friendly products"
              className="relative rounded-3xl shadow-2xl w-full h-96 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      title: "100% Sustainable",
      description: "Every product is carefully vetted for environmental impact"
    },
    {
      icon: <Truck className="h-8 w-8 text-blue-600" />,
      title: "Carbon Neutral Delivery",
      description: "Free shipping with zero carbon footprint"
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: "Quality Guaranteed",
      description: "30-day return policy on all eco-friendly products"
    },
    {
      icon: <Recycle className="h-8 w-8 text-orange-600" />,
      title: "Packaging Recycled",
      description: "100% recyclable and biodegradable packaging"
    }
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose EcoMart?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to making sustainable shopping accessible, affordable, and delightful for everyone.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-gradient-to-b hover:from-white hover:to-gray-50 transition-all hover:shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



const BannerOffers = () => {
  return (
    <div className="bg-gradient-to-r from-green-600 to-blue-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full mb-6">
            <Zap className="h-5 w-5 mr-2" />
            <span className="font-medium">Limited Time Offer</span>
          </div>
          
          <h2 className="text-4xl font-bold mb-4">
            Green Friday Sale
          </h2>
          
          <p className="text-xl mb-8 opacity-90">
            Save up to 70% on eco-friendly products + Free carbon-neutral shipping
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-3xl font-bold">15</div>
                <div className="text-sm opacity-75">Days</div>
              </div>
              <div className="text-2xl">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold">08</div>
                <div className="text-sm opacity-75">Hours</div>
              </div>
              <div className="text-2xl">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold">42</div>
                <div className="text-sm opacity-75">Minutes</div>
              </div>
            </div>
          </div>
          
          <button className="mt-8 bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};



const LandingPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
  };

  const handleAddToCart = (product) => {
    setCartItems(prev => [...prev, product]);
    console.log('Added to cart:', product.name);
  };

   const handleWishlist = (product: Product) => {
    const isInWishlist = wishlistItems.some(item => item.id === product.id);
    if (isInWishlist) {
      setWishlistItems(prev => prev.filter(item => item.id !== product.id));
      console.log('Removed from wishlist:', product.name);
    } else {
      setWishlistItems(prev => [...prev, product]);
      console.log('Added to wishlist:', product.name);
    }
  };
  const handleProductClick = (product) => {
    console.log('Navigate to product page:', product.id);
  };

  const handleCategoryClick = (category) => {
    console.log('Navigate to category:', category.name);
  };

  const handleCartClick = () => {
    console.log('Navigate to cart page');
  };

  const handleLoginClick = () => {
    console.log('Open login modal/page');
  };

  const handleWishlistClick = () => {
    console.log('Navigate to wishlist page');
  };

  const handleHeroPrimaryClick = () => {
    console.log('Start shopping clicked');
  };

  const handleHeroSecondaryClick = () => {
    console.log('Explore deals clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartCount={cartItems.length}
        onSearch={handleSearch}
        onCartClick={handleCartClick}
        onLoginClick={handleLoginClick}
        onWishlistClick={handleWishlistClick}
      />
      
      <Navigation
        onCategoryClick={handleCategoryClick}
      />
      
      <HeroBanner
        onPrimaryClick={handleHeroPrimaryClick}
        onSecondaryClick={handleHeroSecondaryClick}
      />
      
      <FeaturesSection />
      
      <FeaturedProducts
        onAddToCart={handleAddToCart}
        onWishlist={handleWishlist}
        onProductClick={handleProductClick}
      />
      
      <BannerOffers />
      
      <Footer />
    </div>
  );
};

export default LandingPage;