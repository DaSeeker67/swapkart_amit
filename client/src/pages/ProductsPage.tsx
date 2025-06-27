import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Grid, List, SlidersHorizontal, Heart, ShoppingCart, Star, X, ChevronDown, Loader2, AlertCircle } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import Header from '@/components/common/Header';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: any;
  onAddToCart: (product: any) => void;
  onWishlist: (product: any) => void;
  onProductClick: (product: any) => void;
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
        className={`h-3 w-3 ${
          i < Math.floor(rating)
            ? 'text-green-400 fill-current' // Changed to green-400 for stars
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 group overflow-hidden">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-xl cursor-pointer"
          onClick={() => onProductClick(product)}
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 text-xs font-semibold rounded-full shadow">
            {product.badge}
          </span>
        )}
        <button
          onClick={() => onWishlist(product)}
          disabled={isTogglingWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 shadow-md
            ${isWishlisted
              ? 'bg-red-500 text-white' // Wishlist remains red for emphasis
              : 'bg-white text-gray-400 hover:text-red-500 hover:bg-gray-50'
            } ${isTogglingWishlist ? 'opacity-60 cursor-not-allowed' : ''}`
          }
        >
          {isTogglingWishlist ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
          )}
        </button>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3
        
          className="text-base font-semibold text-gray-800 mb-2 line-clamp-2 cursor-pointer hover:text-green-700 transition-colors"
          onClick={() => onProductClick(product)}
        >
          {product.name}
        </h3>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {renderStars(product.rating)}
          </div>
          <span className="ml-2 text-xs text-gray-500">
            ({product?.reviews?.toLocaleString() || 0} reviews)
          </span>
        </div>

        <div className="flex items-center justify-between mb-3 mt-auto">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          {product.discount && (
            <span className="text-xs bg-green-100 text-green-800 px-2.5 py-1 rounded-full font-medium">
              {product.discount} Off
            </span>
          )}
        </div>

        <button
          onClick={() => onAddToCart(product)}
          disabled={isAddingToCart}
          className={`w-full bg-green-600 text-white py-2.5 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2 font-medium
            ${isAddingToCart ? 'opacity-60 cursor-not-allowed' : ''}`
          }
        >
          {isAddingToCart ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ShoppingCart className="h-4 w-4" />
          )}
          <span>{isAddingToCart ? 'Adding...' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
};

const ProductsPage: React.FC = () => {
  const {
    // Search functionality
    searchQuery,
    searchResults,
    searchLoading,
    searchError,
    performSearch,
    clearSearch,
    searchFilters,
    setSearchFilters, // Keeping this if you plan to use it directly
    searchMeta,

    // Cart functionality
    addToCart,
    cartLoading, // Not directly used for individual product loading
    cartError,

    // Wishlist functionality
    toggleWishlist,
    isInWishlist,
    wishlistLoading, // Not directly used for individual product loading
    wishlistError,

    // User state
    isLoggedIn,

    // General error handling
    clearAllErrors
  } = useAppContext();

  // Local state for UI
  const [searchInput, setSearchInput] = useState(searchQuery || '');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [loadingStates, setLoadingStates] = useState<{
    cart: { [key: string]: boolean }; // Product IDs could be strings or numbers
    wishlist: { [key: string]: boolean };
  }>({
    cart: {},
    wishlist: {}
  });

  // Initialize search on component mount or when search results are empty
  useEffect(() => {
    if (!searchQuery && searchResults.length === 0 && !searchLoading && !searchError) {
      performSearch(''); // Load all products initially
    }
  }, [searchQuery, searchResults.length, searchLoading, searchError, performSearch]);


  // Handle search input
  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    await performSearch(searchInput, {
      category: selectedCategory || undefined,
      brand: selectedBrand || undefined,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      sortBy: sortBy as any
    });
  };

  // Handle filter changes
  const applyFilters = async () => {
    await performSearch(searchInput, { // Use searchInput instead of searchQuery here to re-apply current search term
      category: selectedCategory || undefined,
      brand: selectedBrand || undefined,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      sortBy: sortBy as any
    });
  };

  // Apply filters when they change, only if filters are shown or if there's an active search query
  useEffect(() => {
    if (showFilters || searchQuery) { // Apply filters if panel is open or if there's an active search
      applyFilters();
    }
  }, [selectedCategory, selectedBrand, priceRange, sortBy, searchQuery]); // Added searchQuery to dependencies


  // Clear all filters
  const clearAllActiveFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setPriceRange([0, 200000]);
    setSortBy('newest');
    setSearchInput(''); // Clear search input as well
    clearSearch(); // Clear search context state
    performSearch(''); // Re-fetch all products after clearing filters
  };

  // Handle add to cart with loading state
  const handleAddToCart = async (product: any) => {
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
      // Optionally show a user-friendly error message
    } finally {
      setLoadingStates(prev => ({
        ...prev,
        cart: { ...prev.cart, [product.id]: false }
      }));
    }
  };

  // Handle wishlist toggle with loading state
  const handleWishlistToggle = async (product: any) => {
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
      // Optionally show a user-friendly error message
    } finally {
      setLoadingStates(prev => ({
        ...prev,
        wishlist: { ...prev.wishlist, [product.id]: false }
      }));
    }
  };
  // Handle product click
  const handleProductClick = (product: any) => {
    window.location.href=`/product/${product.name}`
  };

  // Get unique categories and brands for filters
  const categories = useMemo(() => {
    // Only get categories from current searchResults if they are available
    // Otherwise, you might want to fetch a master list of categories from your API
    const cats = [...new Set(searchResults.map(p => p.category))];
    return cats.filter(Boolean).sort(); // Filter out undefined/null and sort
  }, [searchResults]);

  const brands = useMemo(() => {
    // Only get brands from current searchResults if they are available
    // Otherwise, you might want to fetch a master list of brands from your API
    const brandList = [...new Set(searchResults.map(p => p.brand))];
    return brandList.filter(Boolean).sort(); // Filter out undefined/null and sort
  }, [searchResults]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <Navigation />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <form onSubmit={handleSearch} className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={searchLoading}
              className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2 font-medium shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {searchLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              <span>Search</span>
            </button>
          </form>
        </div>

        {/* Filters and View Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-white px-4 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm font-medium"
            >
              <SlidersHorizontal className="h-4 w-4 text-gray-600" />
              <span>Filters</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {(selectedCategory || selectedBrand || (priceRange[0] !== 0 || priceRange[1] !== 200000) || sortBy !== 'newest' || searchQuery) && (
              <button
                onClick={clearAllActiveFilters}
                className="flex items-center space-x-1.5 text-red-600 hover:text-red-700 transition-colors font-medium"
              >
                <X className="h-4 w-4" />
                <span>Clear All Filters</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all pr-8"
            >
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name A-Z</option>
            </select>

            <div className="flex items-center bg-white rounded-lg border border-gray-300 shadow-sm overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-50'} rounded-l-lg transition-colors`}
                aria-label="Grid View"
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 ${viewMode === 'list' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-50'} rounded-r-lg transition-colors`}
                aria-label="List View"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-sm p-5 mb-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  id="category-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all pr-8"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="brand-select" className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <select
                  id="brand-select"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all pr-8"
                >
                  <option value="">All Brands</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range: <span className="font-semibold">₹{priceRange[0].toLocaleString()}</span> - <span className="font-semibold">₹{priceRange[1].toLocaleString()}</span>
                </label>
                <div className="flex flex-col space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="1000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), Math.max(parseInt(e.target.value), priceRange[1])])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-green"
                  />
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([Math.min(parseInt(e.target.value), priceRange[0]), parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-green"
                  />
                </div>
              </div>

              <div className="flex items-end">
                <button
                  onClick={applyFilters}
                  className="w-full bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium shadow-md"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Messages */}
        {(searchError || cartError || wishlistError) && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start justify-between">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
              <div className="text-red-700 text-sm">
                {searchError && <p>Search Error: {searchError}</p>}
                {cartError && <p>Cart Error: {cartError}</p>}
                {wishlistError && <p>Wishlist Error: {wishlistError}</p>}
              </div>
            </div>
            <button
              onClick={clearAllErrors}
              className="text-red-500 hover:text-red-700 p-1 rounded-full transition-colors"
              aria-label="Clear all errors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600 text-sm sm:text-base">
            {searchLoading ? "Searching..." : (
              <>
                Showing <span className="font-semibold">{searchResults.length}</span> products
                {searchQuery && ` for "${searchQuery}"`}
                {searchMeta.total > 0 && ` of ${searchMeta.total.toLocaleString()} total`}
              </>
            )}
          </p>

          {searchMeta.totalPages > 1 && (
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-600">
                Page {searchMeta.page} of {searchMeta.totalPages}
              </span>
            </div>
          )}
        </div>

        {/* Products Grid/List */}
        {searchLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm">
            <Loader2 className="h-10 w-10 animate-spin text-green-600 mb-4" />
            <span className="text-lg text-gray-600 font-medium">Loading products...</span>
          </div>
        ) : searchResults.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
              : 'grid-cols-1'
          }`}>
            {searchResults.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onWishlist={handleWishlistToggle}
                onProductClick={handleProductClick}
                isWishlisted={isLoggedIn && isInWishlist(product.id)}
                isAddingToCart={loadingStates.cart[product.id] || false}
                isTogglingWishlist={loadingStates.wishlist[product.id] || false}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <div className="text-gray-500 mb-6">
              <Search className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <p className="text-xl font-semibold mb-2">No products found</p>
              <p className="text-base">Try adjusting your search or filters.</p>
            </div>
            {(searchQuery || selectedCategory || selectedBrand || (priceRange[0] !== 0 || priceRange[1] !== 200000) || sortBy !== 'newest') && (
              <button
                onClick={clearAllActiveFilters}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium shadow-md"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {searchMeta.totalPages > 1 && (
          <div className="flex items-center justify-center space-x-3 mt-10">
            <button
              onClick={() => performSearch(searchInput, { ...searchFilters, page: Math.max(1, searchMeta.page - 1) })}
              disabled={searchMeta.page <= 1 || searchLoading}
              className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed transition-colors font-medium text-gray-700"
            >
              Previous
            </button>

            <span className="px-4 py-2 text-base text-gray-600">
              {searchMeta.page} of {searchMeta.totalPages}
            </span>

            <button
              onClick={() => performSearch(searchInput, { ...searchFilters, page: Math.min(searchMeta.totalPages, searchMeta.page + 1) })}
              disabled={searchMeta.page >= searchMeta.totalPages || searchLoading}
              className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed transition-colors font-medium text-gray-700"
            >
              Next
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;