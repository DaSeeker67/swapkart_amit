import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, ShoppingCart, User, Heart, LogOut } from 'lucide-react';
import { useCart, useWishlist, useAuth, useSearch } from '../../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  onCartClick?: () => void;
  onWishlistClick?: () => void;
  onLoginClick?: () => void;
  onProfileClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onLoginClick,
  onProfileClick
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null); // New state for highlighted item
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Use context hooks
  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user, isLoggedIn, logout } = useAuth();
  // Destructure search context correctly based on user's provided code
  const { search, loading, results, clear } = useSearch();

  // Handle search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        search(searchQuery);
      } else {
        clear(); // Clear search results if query is empty
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim().length > 0) {
      setShowSearchResults(true);
      setHighlightedIndex(0); // Highlight the first item when results appear
    } else {
      setShowSearchResults(false);
      setHighlightedIndex(null); // Clear highlight if search query is empty
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (highlightedIndex !== null && showSearchResults && results[highlightedIndex]) {
      // If an item is highlighted, navigate to that product
      handleSearchResultClick(results[highlightedIndex].name, results[highlightedIndex].id);
    } else if (searchQuery.trim()) {
      // Otherwise, perform a general search
      search(searchQuery);
      setShowSearchResults(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleUserMenuClick = () => {
    if (isLoggedIn) {
      setShowUserMenu(!showUserMenu);
    } else {
      onLoginClick?.();
    }
  };

  // Handle clicks outside the search dropdown and user menu
  const handleClickOutside = useCallback((event: MouseEvent) => {
    // Hide search dropdown if click is outside search input and dropdown
    if (
      searchDropdownRef.current &&
      !searchDropdownRef.current.contains(event.target as Node) &&
      searchInputRef.current &&
      !searchInputRef.current.contains(event.target as Node)
    ) {
      setShowSearchResults(false);
      setHighlightedIndex(null); // Clear highlight
    }

    // Hide user menu if click is outside user menu button and dropdown
    const userMenuButton = document.querySelector('.relative > button');
    if (
      showUserMenu &&
      userMenuButton &&
      !userMenuButton.contains(event.target as Node) &&
      (!event.target || !(event.target as Element).closest('.absolute.right-0.mt-2.w-48.bg-white')) // Check if click is outside the dropdown itself
    ) {
      setShowUserMenu(false);
    }
  }, [showUserMenu]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  // Handle keyboard navigation for search results
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSearchResults || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault(); // Prevent cursor movement in input
      setHighlightedIndex((prevIndex) =>
        prevIndex === null || prevIndex === results.length - 1 ? 0 : prevIndex + 1
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault(); // Prevent cursor movement in input
      setHighlightedIndex((prevIndex) =>
        prevIndex === null || prevIndex === 0 ? results.length - 1 : prevIndex - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      if (highlightedIndex !== null && results[highlightedIndex]) {
        handleSearchResultClick(results[highlightedIndex].name, results[highlightedIndex].id);
      }
    } else if (e.key === 'Escape') {
      setShowSearchResults(false);
      setHighlightedIndex(null);
      searchInputRef.current?.blur(); // Remove focus from input
    }
  };

  const handleSearchResultClick = (productName: string, productId: string | number) => {
    setSearchQuery(productName);
    setShowSearchResults(false);
    setHighlightedIndex(null); // Clear highlight
    navigate(`/product/${productId}`);
  };


  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-green-600">FlipKart</Link>
            <div className="ml-2 text-xs text-gray-500 italic">Explore Plus</div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 relative">
            <form onSubmit={handleSearchSubmit}>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search for products, brands and more"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => {
                  if (results.length > 0) setShowSearchResults(true);
                  if (results.length > 0 && highlightedIndex === null) setHighlightedIndex(0); // Highlight first item on focus if results exist
                }}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                disabled={loading}
              />
              <Search className={`absolute left-3 top-2.5 h-5 w-5 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
              {loading && (
                <div className="absolute right-3 top-2.5">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-500"></div>
                </div>
              )}
            </form>

            {/* Search Results Dropdown */}
            {showSearchResults && results.length > 0 && (
              <div
                ref={searchDropdownRef}
                className="absolute w-full mt-2 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 max-h-80 overflow-y-auto"
              >
                {results.map((product, index) => (
                  <div
                    key={product.id}
                    className={`flex items-center p-2 cursor-pointer ${
                      index === highlightedIndex ? 'bg-blue-100' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleSearchResultClick(product.name, product.id)}
                  >
                    <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-md mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.category} - {product.brand}</p>
                      <p className="text-sm text-green-600 font-semibold">₹{product.price}</p>
                    </div>
                  </div>
                ))}
                {/* Optional: See all results link */}
                {/* {searchMeta.total > searchResults.length && (
                  <div
                    className="p-2 text-center text-blue-600 cursor-pointer hover:underline"
                    onClick={() => {
                      setShowSearchResults(false);
                      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
                    }}
                  >
                    View all {searchMeta.total} results
                  </div>
                )} */}
              </div>
            )}
          </div>

          {/* Header Actions */}
          <div className="flex items-center space-x-6">
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={handleUserMenuClick}
                className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="hidden md:block">
                  {isLoggedIn ? user?.name || 'Profile' : 'Login'}
                </span>
              </button>

              {/* User Dropdown Menu */}
              {isLoggedIn && showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-gray-500">{user?.email}</div>
                  </div>
                  <button
                    onClick={() => {
                      onProfileClick?.();
                      setShowUserMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link
              to={'/wishlist'}
              className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors relative"
            >
              <Heart className="h-5 w-5" />
              <span className="hidden md:block">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to={'/cart'}
              className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors relative"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden md:block">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Click outside handler for user menu and search dropdown */}
      {(showUserMenu || showSearchResults) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false);
            setShowSearchResults(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;
