import React, { useState, useEffect, useMemo } from 'react';
import { Search, Grid, List, Heart, ShoppingCart, Star, X, Loader2, AlertCircle, Filter, MapPin, Truck, Shield, RotateCcw, Leaf } from 'lucide-react';
import { useAppContext, useSearch, useCart, useWishlist } from '@/context/AppContext';
import Header from '@/components/common/Header';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import { useNavigate } from 'react-router-dom';

// Product Interface (from original code)
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  image: string;
  rating: number;
  ecoRating: number;
  category: string;
  brand?: string;
  inStock?: boolean;
  createdAt?: string;
  reviews?: number;
  badge?: string;
}

// Enhanced ProductCard Component
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onWishlist: (product: Product) => void;
  onProductClick: (product: Product) => void;
  isWishlisted: boolean;
  isAddingToCart: boolean;
  isTogglingWishlist: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onWishlist,
  onProductClick,
  isWishlisted,
  isAddingToCart,
  isTogglingWishlist
}) => {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-3.5 w-3.5 ${
          i < Math.floor(rating)
            ? 'text-amber-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const renderEcoLeaves = (ecoRating: number) => {
    return [...Array(5)].map((_, i) => (
      <Leaf
        key={i}
        className={`h-3.5 w-3.5 ${
          i < Math.floor(ecoRating)
            ? 'text-emerald-500 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Bestseller':
        return 'bg-gradient-to-r from-orange-500 to-red-500';
      case 'Choice':
        return 'bg-gradient-to-r from-emerald-500 to-teal-500';
      case 'Deal of the Day':
        return 'bg-gradient-to-r from-red-500 to-pink-500';
      default:
        return 'bg-gradient-to-r from-blue-500 to-indigo-500';
    }
  };

  return (
    <div className="bg-white w-80 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 group border border-gray-100 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700 cursor-pointer"
          onClick={() => onProductClick(product)}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4">
            <span className={`${getBadgeColor(product.badge)} text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm`}>
              {product.badge}
            </span>
          </div>
        )}
        
        {/* Wishlist button */}
        <div className="absolute top-4 right-4">
          <button 
            onClick={() => onWishlist(product)}
            disabled={isTogglingWishlist}
            className={`backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:scale-110 transition-all duration-300 group/heart
              ${isWishlisted
                ? 'bg-red-500 text-white shadow-red-200'
                : 'bg-white/90 text-gray-600 hover:bg-white'
              } ${isTogglingWishlist ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {isTogglingWishlist ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : 'group-hover/heart:text-red-500'} transition-colors`} />
            )}
          </button>
        </div>
        
        {/* Discount badge */}
        {product.discount && (
          <div className="absolute bottom-4 right-4">
            <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg">
              {product.discount}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 
          className="font-semibold text-lg text-gray-900 mb-3 line-clamp-2 cursor-pointer hover:text-emerald-600 transition-colors duration-300 leading-snug"
          onClick={() => onProductClick(product)}
        >
          {product.name}
        </h3>
        
        {/* Ratings section */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center bg-emerald-500 text-white px-3 py-1 rounded-full">
              <span className="text-sm font-semibold mr-1">{product.rating}</span>
              <Star className="h-3.5 w-3.5 fill-current" />
            </div>
            <span className="text-sm text-gray-600 font-medium">({product.reviews.toLocaleString()})</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {renderEcoLeaves(product.ecoRating)}
              <span className="text-sm text-emerald-600 ml-2 font-medium">Eco-Friendly</span>
            </div>
            <span className="text-sm font-semibold text-emerald-600">{product.ecoRating}/5</span>
          </div>
        </div>
        
        {/* Price section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
        </div>

        {/* Free delivery */}
        <div className="flex items-center mb-4 text-sm text-gray-600">
          <Truck className="h-4 w-4 mr-2 text-emerald-500" />
          <span className="font-medium">Free delivery</span>
        </div>
        
        {/* Add to cart button */}
        <button 
          onClick={() => onAddToCart(product)}
          disabled={isAddingToCart}
          className={`w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 group/button
            ${isAddingToCart ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          {isAddingToCart ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ShoppingCart className="h-4 w-4 group-hover/button:scale-110 transition-transform" />
          )}
          <span>{isAddingToCart ? 'Adding...' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
};

const RangeSlider = ({ 
  min, 
  max, 
  value, 
  onChange, 
  step = 1, 
  formatLabel = (v) => v.toString() 
}) => {
  const [minVal, maxVal] = value;
  
  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), maxVal - step);
    onChange([newMin, maxVal]);
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), minVal + step);
    onChange([minVal, newMax]);
  };

  const getPercent = (value) => ((value - min) / (max - min)) * 100;

  return (
    <div className="px-2">
      {/* Input Fields */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Min</label>
          <input
            type="number"
            value={minVal}
            onChange={(e) => onChange([Number(e.target.value), maxVal])}
            min={min}
            max={maxVal - step}
            step={step}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50 hover:bg-white"
            placeholder="Min"
          />
        </div>
        <div className="text-gray-400 text-lg font-bold mt-8">—</div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Max</label>
          <input
            type="number"
            value={maxVal}
            onChange={(e) => onChange([minVal, Number(e.target.value)])}
            min={minVal + step}
            max={max}
            step={step}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50 hover:bg-white"
            placeholder="Max"
          />
        </div>
      </div>

      {/* Modern Visual Slider */}
      <div className="relative mb-6">
        <div className="slider-container relative">
          {/* Track */}
          <div className="h-3 bg-gray-200 rounded-full relative shadow-inner">
            {/* Active range */}
            <div 
              className="absolute h-3 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 rounded-full shadow-sm"
              style={{
                left: `${getPercent(minVal)}%`,
                width: `${getPercent(maxVal) - getPercent(minVal)}%`
              }}
            />
          </div>
          
          {/* Min Range Input */}
          <input
            type="range"
            min={min}
            max={max}
            value={minVal}
            onChange={handleMinChange}
            step={step}
            className="absolute w-full h-3 bg-transparent appearance-none cursor-pointer slider-thumb"
            style={{ 
              zIndex: 1,
              background: 'transparent'
            }}
          />
          
          {/* Max Range Input */}
          <input
            type="range"
            min={min}
            max={max}
            value={maxVal}
            onChange={handleMaxChange}
            step={step}
            className="absolute w-full h-3 bg-transparent appearance-none cursor-pointer slider-thumb"
            style={{ 
              zIndex: 2,
              background: 'transparent'
            }}
          />
        </div>
        
        {/* Labels */}
        <div className="flex justify-between text-sm text-gray-500 mt-3 font-medium">
          <span>{formatLabel(min)}</span>
          <span>{formatLabel(max)}</span>
        </div>
      </div>

      {/* Current Values Display */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-100">
        <div className="text-sm text-emerald-700 font-medium mb-1">Selected Range</div>
        <div className="text-lg font-bold text-emerald-800">
          {formatLabel(minVal)} - {formatLabel(maxVal)}
        </div>
      </div>

      {/* Custom CSS for slider thumbs */}
      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid #10b981;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
          transition: all 0.2s ease;
        }

        .slider-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
          border-color: #059669;
        }

        .slider-thumb::-webkit-slider-thumb:active {
          transform: scale(1.2);
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.5);
        }

        .slider-thumb::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid #10b981;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
          transition: all 0.2s ease;
        }

        .slider-thumb::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
          border-color: #059669;
        }

        .slider-thumb::-moz-range-track {
          background: transparent;
        }

        .slider-thumb::-ms-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid #10b981;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .slider-thumb::-ms-track {
          background: transparent;
          border: none;
          color: transparent;
        }
      `}</style>
    </div>
  );
};

// Alternative: Even Simpler Version (if the above still has issues)
const SimplePriceFilter: React.FC<{
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}> = ({ min, max, value, onChange }) => {
  const [minVal, maxVal] = value;
  
  const priceRanges = [
    { label: 'Under ₹500', min: 0, max: 500 },
    { label: '₹500 - ₹1,000', min: 500, max: 1000 },
    { label: '₹1,000 - ₹5,000', min: 1000, max: 5000 },
    { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
    { label: '₹10,000 - ₹25,000', min: 10000, max: 25000 },
    { label: '₹25,000 - ₹50,000', min: 25000, max: 50000 },
    { label: 'Above ₹50,000', min: 50000, max: 200000 },
  ];

  const handleRangeClick = (rangeMin: number, rangeMax: number) => {
    onChange([rangeMin, rangeMax]);
  };

  const isRangeSelected = (rangeMin: number, rangeMax: number) => {
    return minVal === rangeMin && maxVal === rangeMax;
  };

  return (
    <div className="space-y-3">
      {/* Custom Range Inputs */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Min Price</label>
          <input
            type="number"
            value={minVal}
            onChange={(e) => onChange([Number(e.target.value), maxVal])}
            min={min}
            max={maxVal}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Min"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Max Price</label>
          <input
            type="number"
            value={maxVal}
            onChange={(e) => onChange([minVal, Number(e.target.value)])}
            min={minVal}
            max={max}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Max"
          />
        </div>
      </div>

      {/* Quick Select Price Ranges */}
      <div className="space-y-2">
        <h5 className="text-xs font-medium text-gray-700">Quick Select:</h5>
        <div className="space-y-1">
          {priceRanges.map((range, index) => (
            <button
              key={index}
              onClick={() => handleRangeClick(range.min, range.max)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                isRangeSelected(range.min, range.max)
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Current Selection Display */}
      <div className="bg-blue-50 rounded-lg p-3">
        <div className="text-sm text-blue-800 font-medium">
          Current: ₹{minVal.toLocaleString()} - ₹{maxVal.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

// CSS for the slider (add this to your global CSS or component styles)
const sliderCSS = `
  .slider-thumb {
    background: transparent;
  }

  .slider-thumb::-webkit-slider-thumb {
    appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #059669;
    border: 2px solid #ffffff;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .slider-thumb::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #059669;
    border: 2px solid #ffffff;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .slider-thumb::-webkit-slider-thumb:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .slider-thumb::-moz-range-thumb:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const ProductsPage: React.FC = () => {
  // Hooks from AppContext
  const { clearAllErrors, isLoggedIn } = useAppContext();
  const { addItem: addToCart, error: cartError } = useCart();
  const { toggle: toggleWishlist, isInList: isInWishlist, error: wishlistError } = useWishlist();

  const {
    query: searchInput,
    results: products,
    filters: searchFilters,
    meta,
    loading: searchLoading,
    error: searchError,
    search,
    setFilters,
    clear: clearSearch
  } = useSearch();

  const navigate = useNavigate();

  // Local UI State
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // State for individual product loading
  const [loadingStates, setLoadingStates] = useState<{
    cart: { [key: string]: boolean };
    wishlist: { [key: string]: boolean };
  }>({
    cart: {},
    wishlist: {}
  });

  // Effects
  useEffect(() => {
    search('', { page: 1, limit: 12 });
  }, []);

  // Handlers
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ q: e.target.value });
  };

  const handleSearchSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    await search(searchInput, { ...searchFilters, page: 1 });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ category: e.target.value || undefined });
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ brand: e.target.value || undefined });
  };

  const handlePriceRangeChange = (value: [number, number]) => {
    setFilters({ priceRange: { min: value[0], max: value[1] } });
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ sortBy: e.target.value });
  };

  const applyFilters = async () => {
    await search(searchInput, { ...searchFilters, page: 1 });
    setShowMobileFilters(false);
  };

  const clearAllActiveFilters = async () => {
    clearSearch();
    await search('', { page: 1, limit: 12 });
  };

  const goToPage = async (pageNumber: number) => {
    await search(searchInput, { ...searchFilters, page: pageNumber });
  };

  const handleAddToCart = async (product: Product) => {
    if (!isLoggedIn) {
      alert('Please log in to add items to cart');
      return;
    }

    setLoadingStates(prev => ({
      ...prev,
      cart: { ...prev.cart, [product.id]: true }
    }));

    try {
      await addToCart(product);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setLoadingStates(prev => ({
        ...prev,
        cart: { ...prev.cart, [product.id]: false }
      }));
    }
  };

  const handleWishlistToggle = async (product: Product) => {
    if (!isLoggedIn) {
      alert('Please log in to manage your wishlist');
      return;
    }

    setLoadingStates(prev => ({
      ...prev,
      wishlist: { ...prev.wishlist, [product.id]: true }
    }));

    try {
      await toggleWishlist(product);
    } catch (error) {
      console.error('Failed to toggle wishlist:', error);
    } finally {
      setLoadingStates(prev => ({
        ...prev,
        wishlist: { ...prev.wishlist, [product.id]: false }
      }));
    }
  };

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  const categories = useMemo(() => {
    const cats = [...new Set(products.map(p => p.category))];
    return cats.filter(Boolean).sort();
  }, [products]);

  const brands = useMemo(() => {
    const brandList = [...new Set(products.map(p => p.brand))];
    return brandList.filter(Boolean).sort();
  }, [products]);

  const areFiltersActive = useMemo(() => {
    const defaultPriceRange = { min: 0, max: 200000 };
    return (
      searchInput !== '' ||
      searchFilters.category !== undefined ||
      searchFilters.brand !== undefined ||
      searchFilters.priceRange.min !== defaultPriceRange.min ||
      searchFilters.priceRange.max !== defaultPriceRange.max ||
      searchFilters.sortBy !== 'newest'
    );
  }, [searchInput, searchFilters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      <div className="max-w-5/6 mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <form onSubmit={handleSearchSubmit} className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                value={searchInput}
                onChange={handleSearchInputChange}
                placeholder="Search for products, brands and more"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={searchLoading}
              className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2 font-medium disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {searchLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">Search</span>
            </button>
          </form>
        </div>

        <div className="flex gap-4">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                {areFiltersActive && (
                  <button
                    onClick={clearAllActiveFilters}
                    className="text-green-600 hover:text-green-700 text-sm font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Categories</h4>
                  <select
                    value={searchFilters.category || ''}
                    onChange={handleCategoryChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Brands */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Brands</h4>
                  <select
                    value={searchFilters.brand || ''}
                    onChange={handleBrandChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">All Brands</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
                  <div className="mb-4">
                    <RangeSlider
                      min={0}
                      max={200000}
                      value={[searchFilters.priceRange.min, searchFilters.priceRange.max||200000]}
                      onChange={handlePriceRangeChange}
                      step={1000}
                      formatLabel={(value) => `₹${value.toLocaleString()}`}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{searchFilters.priceRange.min.toLocaleString()}</span>
                    <span>₹{searchFilters.priceRange.max.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={applyFilters}
                  className="w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filters and Sort */}
            <div className="lg:hidden mb-4">
              <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="flex items-center space-x-2 text-gray-700"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                  {areFiltersActive && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full ml-1">
                      Active
                    </span>
                  )}
                </button>
                <div className="flex items-center space-x-4">
                  <select
                    value={searchFilters.sortBy}
                    onChange={handleSortByChange}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                    <option value="popularity">Popularity</option>
                  </select>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-400'}`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-400'}`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Sort and View Controls */}
            <div className="hidden lg:flex items-center justify-between bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Showing {meta.from}-{meta.to} of {meta.total} results
                  {searchInput && (
                    <span className="ml-2 text-green-600">
                      for "{searchInput}"
                    </span>
                  )}
                </span>
                {areFiltersActive && (
                  <button
                    onClick={clearAllActiveFilters}
                    className="flex items-center space-x-1 text-green-600 hover:text-green-700 text-sm font-medium"
                  >
                    <X className="h-3 w-3" />
                    <span>Clear filters</span>
                  </button>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={searchFilters.sortBy}
                    onChange={handleSortByChange}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                    <option value="popularity">Popularity</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-400'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-400'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Error Display */}
            {(searchError || cartError || wishlistError) && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="text-red-700">
                    {searchError || cartError || wishlistError}
                  </span>
                </div>
              </div>
            )}

            {/* Loading State */}
            {searchLoading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                <span className="ml-2 text-gray-600">Loading products...</span>
              </div>
            )}

            {/* No Results */}
            {!searchLoading && products.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto mb-2" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={clearAllActiveFilters}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Products Grid/List */}
            {!searchLoading && products.length > 0 && (
              <div className={`
                ${viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4' 
                  : 'space-y-4'
                }
              `}>
                {products.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onWishlist={handleWishlistToggle}
                    onProductClick={handleProductClick}
                    isWishlisted={isInWishlist(product.id)}
                    isAddingToCart={loadingStates.cart[product.id] || false}
                    isTogglingWishlist={loadingStates.wishlist[product.id] || false}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!searchLoading && products.length > 0 && meta.totalPages > 1 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mt-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Page {meta.currentPage} of {meta.totalPages}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => goToPage(meta.currentPage - 1)}
                      disabled={meta.currentPage === 1}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    {/* Page Numbers */}
                    {Array.from({ length: Math.min(5, meta.totalPages) }, (_, i) => {
                      const startPage = Math.max(1, meta.currentPage - 2);
                      const pageNum = startPage + i;
                      
                      if (pageNum > meta.totalPages) return null;
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium ${
                            pageNum === meta.currentPage
                              ? 'bg-green-600 text-white'
                              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => goToPage(meta.currentPage + 1)}
                      disabled={meta.currentPage === meta.totalPages}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setShowMobileFilters(false)} />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto">
              {/* Categories */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Categories</h4>
                <select
                  value={searchFilters.category || ''}
                  onChange={handleCategoryChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Brands */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Brands</h4>
                <select
                  value={searchFilters.brand || ''}
                  onChange={handleBrandChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">All Brands</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
             <div>
  <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
  <SimplePriceFilter
    min={0}
    max={200000}
    value={[searchFilters.priceRange.min, searchFilters.priceRange.max]}
    onChange={handlePriceRangeChange}
  />
</div>
            </div>

            <div className="p-4 border-t bg-gray-50">
              <div className="flex space-x-3">
                {areFiltersActive && (
                  <button
                    onClick={clearAllActiveFilters}
                    className="flex-1 bg-white text-gray-700 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={applyFilters}
                  className="flex-1 bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

// CSS for Range Slider
const rangeSliderCSS = `
  .slider {
    position: relative;
    width: 100%;
  }

  .slider__track,
  .slider__range {
    height: 8px;
    border-radius: 4px;
  }

  .slider__track {
    background: #e5e7eb;
    width: 100%;
    z-index: 1;
  }

  .slider__range {
    background: #059669;
    position: absolute;
    z-index: 2;
  }

  .thumb {
    -webkit-appearance: none;
    appearance: none;
    background: #059669;
    border-radius: 50%;
    cursor: pointer;
    height: 20px;
    width: 20px;
    margin-top: -6px;
    pointer-events: all;
    position: relative;
    z-index: 3;
  }

  .thumb::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background: #059669;
    border: 2px solid #ffffff;
    border-radius: 50%;
    cursor: pointer;
    height: 20px;
    width: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .thumb::-moz-range-thumb {
    background: #059669;
    border: 2px solid #ffffff;
    border-radius: 50%;
    cursor: pointer;
    height: 20px;
    width: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .thumb--zindex-3 {
    z-index: 3;
  }

  .thumb--zindex-4 {
    z-index: 4;
  }

  .thumb:hover::-webkit-slider-thumb {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .thumb:hover::-moz-range-thumb {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

// Add CSS to document head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = rangeSliderCSS;
  document.head.appendChild(style);
}

export default ProductsPage;