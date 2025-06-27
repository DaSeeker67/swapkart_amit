// context/AppContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Product, User, CartItem } from '@/types';
import API from "../utils/axiosConfig";

interface AppContextType {
  // Loading states
  isLoading: boolean;
  cartLoading: boolean;
  wishlistLoading: boolean;
  searchLoading: boolean;
  userLoading: boolean;

  // Error states
  error: string | null;
  cartError: string | null;
  wishlistError: string | null;
  searchError: string | null;
  userError: string | null;

  // Cart
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  syncCart: () => Promise<void>;

  // Wishlist
  wishlistItems: Product[];
  wishlistCount: number;
  addToWishlist: (product: Product) => Promise<void>;
  removeFromWishlist: (productId: number) => Promise<void>;
  toggleWishlist: (product: Product) => Promise<void>;
  isInWishlist: (productId: number) => boolean;
  syncWishlist: () => Promise<void>;

  // Search
  searchQuery: string;
  searchResults: Product[];
  searchFilters: SearchFilters;
  searchMeta: SearchMeta;
  performSearch: (query: string, filters?: Partial<SearchFilters>) => Promise<void>;
  clearSearch: () => void;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;

  // User Management
  user: User | null;
  isLoggedIn: boolean;
  isAuthenticating: boolean;
  login: (credentials: LoginCredentials) => Promise<User>;
  register: (userData: RegisterData) => Promise<User>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<User>;
  refreshUser: () => Promise<void>;

  // Utility functions
  clearAllErrors: () => void;
  refreshAll: () => Promise<void>;
}

interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  rating?: number;
  inStock?: boolean;
  sortBy?: 'price_asc' | 'price_desc' | 'name' | 'rating' | 'newest';
  page?: number;
  limit?: number;
}

interface SearchMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

// API service functions using your axios instance
const apiService = {
  // Cart API calls
  async getCart(): Promise<CartItem[]> {
    const response = await API.get('/cart');
    return response.data;
  },

  async addToCart(productId: number, quantity: number): Promise<CartItem[]> {
    const response = await API.post('/cart', { productId, quantity });
    return response.data;
  },

  async updateCartItem(productId: number, quantity: number): Promise<CartItem[]> {
    const response = await API.put(`/cart/${productId}`, { quantity });
    return response.data;
  },

  async removeFromCart(productId: number): Promise<CartItem[]> {
    const response = await API.delete(`/cart/${productId}`);
    return response.data;
  },

  async clearCart(): Promise<void> {
    await API.delete('/cart');
  },

  // Wishlist API calls
  async getWishlist(): Promise<Product[]> {
    const response = await API.get('/wishlist');
    return response.data;
  },

  async addToWishlist(productId: number): Promise<Product[]> {
    const response = await API.post('/wishlist', { productId });
    return response.data;
  },

  async removeFromWishlist(productId: number): Promise<Product[]> {
    const response = await API.delete(`/wishlist/${productId}`);
    return response.data;
  },

  // Search API calls
  async searchProducts(query: string, filters: SearchFilters): Promise<{ products: Product[], meta: SearchMeta }> {
    const params = {
      q: query,
      ...Object.fromEntries(
        Object.entries(filters).map(([k, v]) => [k, String(v)])
      )
    };
    
    const response = await API.get('/products/search', { params });
    return response.data;
  },

  // User API calls
  async login(credentials: LoginCredentials): Promise<{ user: User, token: string }> {
    const response = await API.post('/auth/login', credentials);
    return response.data;
  },

  async register(userData: RegisterData): Promise<{ user: User, token: string }> {
    const response = await API.post('/auth/register', userData);
    return response.data;
  },

  async getProfile(): Promise<User> {
    const response = await API.get('/auth/profile');
    return response.data;
  },

  async updateProfile(updates: Partial<User>): Promise<User> {
    const response = await API.put('/auth/profile', updates);
    return response.data;
  },

  async logout(): Promise<void> {
    await API.post('/auth/logout');
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Error states
  const [error, setError] = useState<string | null>(null);
  const [cartError, setCartError] = useState<string | null>(null);
  const [wishlistError, setWishlistError] = useState<string | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [userError, setUserError] = useState<string | null>(null);

  // Data states
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  
  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchFilters, setSearchFiltersState] = useState<SearchFilters>({
    page: 1,
    limit: 20,
    sortBy: 'newest'
  });
  const [searchMeta, setSearchMeta] = useState<SearchMeta>({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0
  });

  // Computed values
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const wishlistCount = wishlistItems.length;
  const isLoggedIn = user !== null;

  // Initialize app on mount
  useEffect(() => {
    const initializeApp = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          setUserLoading(true);
          const userProfile = await apiService.getProfile();
          setUser(userProfile);
          
          // Load user-specific data
          await Promise.all([
            syncCart(),
            syncWishlist()
          ]);
        } catch (err) {
          console.error('Failed to initialize app:', err);
          localStorage.removeItem('token');
        } finally {
          setUserLoading(false);
        }
      }
    };

    initializeApp();
  }, []);

  // Error handling helper
  const handleError = (err: unknown, setErrorFn: (error: string | null) => void) => {
    let message = 'An unexpected error occurred';
    
    if (err && typeof err === 'object' && 'response' in err) {
      const axiosError = err as any;
      message = axiosError.response?.data?.message || axiosError.message || message;
    } else if (err instanceof Error) {
      message = err.message;
    }
    
    setErrorFn(message);
    console.error(err);
  };

  // Cart functions
  const syncCart = useCallback(async () => {
    if (!isLoggedIn) return;
    try {
      setCartLoading(true);
      setCartError(null);
      const items = await apiService.getCart();
      setCartItems(items);
    } catch (err) {
      handleError(err, setCartError);
    } finally {
      setCartLoading(false);
    }
  }, [isLoggedIn]);

  const addToCart = async (product: Product, quantity: number = 1) => {
    try {
      setCartLoading(true);
      setCartError(null);
      const updatedCart = await apiService.addToCart(product.id, quantity);
      setCartItems(updatedCart);
    } catch (err) {
      handleError(err, setCartError);
    } finally {
      setCartLoading(false);
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      setCartLoading(true);
      setCartError(null);
      const updatedCart = await apiService.removeFromCart(productId);
      setCartItems(updatedCart);
    } catch (err) {
      handleError(err, setCartError);
    } finally {
      setCartLoading(false);
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }
    
    try {
      setCartLoading(true);
      setCartError(null);
      const updatedCart = await apiService.updateCartItem(productId, quantity);
      setCartItems(updatedCart);
    } catch (err) {
      handleError(err, setCartError);
    } finally {
      setCartLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setCartLoading(true);
      setCartError(null);
      await apiService.clearCart();
      setCartItems([]);
    } catch (err) {
      handleError(err, setCartError);
    } finally {
      setCartLoading(false);
    }
  };

  // Wishlist functions
  const syncWishlist = useCallback(async () => {
    if (!isLoggedIn) return;
    try {
      setWishlistLoading(true);
      setWishlistError(null);
      const items = await apiService.getWishlist();
      setWishlistItems(items);
    } catch (err) {
      handleError(err, setWishlistError);
    } finally {
      setWishlistLoading(false);
    }
  }, [isLoggedIn]);

  const addToWishlist = async (product: Product) => {
    try {
      setWishlistLoading(true);
      setWishlistError(null);
      const updatedWishlist = await apiService.addToWishlist(product.id);
      setWishlistItems(updatedWishlist);
    } catch (err) {
      handleError(err, setWishlistError);
    } finally {
      setWishlistLoading(false);
    }
  };

  const removeFromWishlist = async (productId: number) => {
    try {
      setWishlistLoading(true);
      setWishlistError(null);
      const updatedWishlist = await apiService.removeFromWishlist(productId);
      setWishlistItems(updatedWishlist);
    } catch (err) {
      handleError(err, setWishlistError);
    } finally {
      setWishlistLoading(false);
    }
  };

  const toggleWishlist = async (product: Product) => {
    if (isInWishlist(product.id)) {
      await removeFromWishlist(product.id);
    } else {
      await addToWishlist(product);
    }
  };

  const isInWishlist = (productId: number) => {
    return wishlistItems.some(item => item.id === productId);
  };

  // Search functions
  const performSearch = async (query: string, filters: Partial<SearchFilters> = {}) => {
    try {
      setSearchLoading(true);
      setSearchError(null);
      setSearchQuery(query);
      
      const mergedFilters = { ...searchFilters, ...filters };
      setSearchFiltersState(mergedFilters);
      
      const { products, meta } = await apiService.searchProducts(query, mergedFilters);
      setSearchResults(products);
      setSearchMeta(meta);
    } catch (err) {
      handleError(err, setSearchError);
    } finally {
      setSearchLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSearchError(null);
    setSearchMeta({
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0
    });
  };

  const setSearchFilters = (filters: Partial<SearchFilters>) => {
    setSearchFiltersState(prev => ({ ...prev, ...filters }));
  };

  // User functions
  const login = async (credentials: LoginCredentials): Promise<User> => {
    try {
      setIsAuthenticating(true);
      setUserError(null);
      const { user: userData, token } = await apiService.login(credentials);
      
      localStorage.setItem('token', token);
      setUser(userData);
      
      // Load user-specific data after login
      await Promise.all([
        syncCart(),
        syncWishlist()
      ]);
      
      return userData;
    } catch (err) {
      handleError(err, setUserError);
      throw err;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const register = async (userData: RegisterData): Promise<User> => {
    try {
      setIsAuthenticating(true);
      setUserError(null);
      const { user: newUser, token } = await apiService.register(userData);
      
      localStorage.setItem('token', token);
      setUser(newUser);
      
      return newUser;
    } catch (err) {
      handleError(err, setUserError);
      throw err;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = async () => {
    try {
      setUserLoading(true);
      await apiService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      setCartItems([]);
      setWishlistItems([]);
      clearSearch();
      setUserLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<User> => {
    try {
      setUserLoading(true);
      setUserError(null);
      const updatedUser = await apiService.updateProfile(updates);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      handleError(err, setUserError);
      throw err;
    } finally {
      setUserLoading(false);
    }
  };

  const refreshUser = async () => {
    if (!isLoggedIn) return;
    try {
      setUserLoading(true);
      const userData = await apiService.getProfile();
      setUser(userData);
    } catch (err) {
      handleError(err, setUserError);
    } finally {
      setUserLoading(false);
    }
  };

  // Utility functions
  const clearAllErrors = () => {
    setError(null);
    setCartError(null);
    setWishlistError(null);
    setSearchError(null);
    setUserError(null);
  };

  const refreshAll = async () => {
    setIsLoading(true);
    try {
      if (isLoggedIn) {
        await Promise.all([
          refreshUser(),
          syncCart(),
          syncWishlist()
        ]);
      }
    } catch (err) {
      handleError(err, setError);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AppContextType = {
    // Loading states
    isLoading,
    cartLoading,
    wishlistLoading,
    searchLoading,
    userLoading,

    // Error states
    error,
    cartError,
    wishlistError,
    searchError,
    userError,

    // Cart
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    syncCart,

    // Wishlist
    wishlistItems,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    syncWishlist,

    // Search
    searchQuery,
    searchResults,
    searchFilters,
    searchMeta,
    performSearch,
    clearSearch,
    setSearchFilters,

    // User
    user,
    isLoggedIn,
    isAuthenticating,
    login,
    register,
    logout,
    updateProfile,
    refreshUser,

    // Utilities
    clearAllErrors,
    refreshAll
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Additional hook for cart-specific operations
export const useCart = () => {
  const context = useAppContext();
  return {
    items: context.cartItems,
    count: context.cartCount,
    total: context.cartTotal,
    loading: context.cartLoading,
    error: context.cartError,
    addItem: context.addToCart,
    removeItem: context.removeFromCart,
    updateQuantity: context.updateQuantity,
    clear: context.clearCart,
    sync: context.syncCart
  };
};

// Additional hook for wishlist-specific operations
export const useWishlist = () => {
  const context = useAppContext();
  return {
    items: context.wishlistItems,
    count: context.wishlistCount,
    loading: context.wishlistLoading,
    error: context.wishlistError,
    addItem: context.addToWishlist,
    removeItem: context.removeFromWishlist,
    toggle: context.toggleWishlist,
    isInList: context.isInWishlist,
    sync: context.syncWishlist
  };
};

// Additional hook for search-specific operations
export const useSearch = () => {
  const context = useAppContext();
  return {
    query: context.searchQuery,
    results: context.searchResults,
    filters: context.searchFilters,
    meta: context.searchMeta,
    loading: context.searchLoading,
    error: context.searchError,
    search: context.performSearch,
    clear: context.clearSearch,
    setFilters: context.setSearchFilters
  };
};

// Additional hook for user-specific operations
export const useAuth = () => {
  const context = useAppContext();
  return {
    user: context.user,
    isLoggedIn: context.isLoggedIn,
    isAuthenticating: context.isAuthenticating,
    loading: context.userLoading,
    error: context.userError,
    login: context.login,
    register: context.register,
    logout: context.logout,
    updateProfile: context.updateProfile,
    refresh: context.refreshUser
  };
};