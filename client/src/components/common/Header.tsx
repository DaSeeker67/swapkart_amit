import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, ShoppingCart, User, Heart, LogOut, Leaf } from 'lucide-react';
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
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user, isLoggedIn, logout } = useAuth();
  const { search, loading, results, clear } = useSearch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        search(searchQuery);
      } else {
        clear();
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, search, clear]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim().length > 0) {
      setShowSearchResults(true);
      setHighlightedIndex(0);
    } else {
      setShowSearchResults(false);
      setHighlightedIndex(null);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (highlightedIndex !== null && showSearchResults && results[highlightedIndex]) {
      handleSearchResultClick(results[highlightedIndex].name, results[highlightedIndex].id);
    } else if (searchQuery.trim()) {
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

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      searchDropdownRef.current &&
      !searchDropdownRef.current.contains(event.target as Node) &&
      searchInputRef.current &&
      !searchInputRef.current.contains(event.target as Node)
    ) {
      setShowSearchResults(false);
      setHighlightedIndex(null);
    }

    const userMenuButton = document.querySelector('.relative > button');
    if (
      showUserMenu &&
      userMenuButton &&
      !userMenuButton.contains(event.target as Node) &&
      !(event.target as Element).closest('.absolute.right-0.mt-2.w-48.bg-white')
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSearchResults || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex === null || prevIndex === results.length - 1 ? 0 : prevIndex + 1
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex === null || prevIndex === 0 ? results.length - 1 : prevIndex - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex !== null && results[highlightedIndex]) {
        handleSearchResultClick(results[highlightedIndex].name, results[highlightedIndex].id);
      }
    } else if (e.key === 'Escape') {
      setShowSearchResults(false);
      setHighlightedIndex(null);
      searchInputRef.current?.blur();
    }
  };

  const handleSearchResultClick = (productName: string, productId: string | number) => {
    setSearchQuery(productName);
    setShowSearchResults(false);
    setHighlightedIndex(null);
    navigate(`/product/${productId}`);
  };


  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-3xl font-extrabold text-teal-600 tracking-tight">SwapKart</Link>
            <div className="ml-2 text-xs text-gray-500 italic hidden sm:block">Sustainable Choices</div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 sm:mx-8 relative">
            <form onSubmit={handleSearchSubmit}>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search for eco-friendly products, brands..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => {
                  if (results.length > 0) setShowSearchResults(true);
                  if (results.length > 0 && highlightedIndex === null) setHighlightedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-2 pl-10 pr-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 ease-in-out"
                disabled={loading}
              />
              <Search className={`absolute left-3 top-2.5 h-5 w-5 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
              {loading && (
                <div className="absolute right-3 top-2.5">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-teal-500"></div>
                </div>
              )}
            </form>

            {/* Search Results Dropdown */}
            {showSearchResults && results.length > 0 && (
              <div
                ref={searchDropdownRef}
                className="absolute w-full mt-2 bg-white rounded-lg shadow-xl py-1 z-50 border border-gray-100 max-h-80 overflow-y-auto"
              >
                {results.map((product, index) => (
                  <div
                    key={product.id}
                    className={`flex items-center p-3 cursor-pointer transition-all duration-150 ease-in-out ${
                      index === highlightedIndex ? 'bg-teal-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleSearchResultClick(product.name, product.id)}
                  >
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md mr-3 border border-gray-100" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.category} &bull; {product.brand}</p>
                      <p className="text-sm text-teal-600 font-semibold mt-1">₹{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Header Actions */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={handleUserMenuClick}
                className="flex items-center space-x-1 text-gray-600 hover:text-teal-600 transition-colors py-2 px-3 rounded-full hover:bg-gray-100"
              >
                <User className="h-5 w-5" />
                <span className="hidden md:block text-sm font-medium">
                  {isLoggedIn ? user?.name || 'Profile' : 'Login'}
                </span>
              </button>

              {/* User Dropdown Menu */}
              {isLoggedIn && showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                  <div className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                    <div className="font-semibold">{user?.name}</div>
                    <div className="text-gray-500 text-xs">{user?.email}</div>
                  </div>
                  <button
                    onClick={() => {
                      onProfileClick?.();
                      setShowUserMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors"
                  >
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    My Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-2 text-gray-500" />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Eco Dashboard Link */}
            <Link
              to={'/eco-dashboard'}
              className="flex items-center space-x-1 text-gray-600 hover:text-teal-600 transition-colors py-2 px-3 rounded-full hover:bg-gray-100"
            >
              <Leaf className="h-5 w-5" />
              <span className="hidden md:block text-sm font-medium">Eco</span>
            </Link>

            {/* Wishlist */}
            <Link
              to={'/wishlist'}
              className="flex items-center space-x-1 text-gray-600 hover:text-teal-600 transition-colors relative py-2 px-3 rounded-full hover:bg-gray-100"
            >
              <Heart className="h-5 w-5" />
              <span className="hidden md:block text-sm font-medium">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to={'/cart'}
              className="flex items-center space-x-1 text-gray-600 hover:text-teal-600 transition-colors relative py-2 px-3 rounded-full hover:bg-gray-100"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden md:block text-sm font-medium">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

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