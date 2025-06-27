
import type { LucideIcon } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice: string;
  discount: string;
  rating: number;
  reviews: number;
  image: string;
  badge: string;
  description?: string;
  specifications?: Record<string, string>;
  category?: string;
  brand?: string;
  stock?: number;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  items: string[];
  slug: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  price: number
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface Address {
  id: number;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: Date;
  deliveryDate?: Date;
  address: Address;
}

export interface Review {
  id: number;
  userId: number;
  productId: number;
  rating: number;
  comment: string;
  date: Date;
  userName: string;
  userAvatar?: string;
}

export interface BannerOffer {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  gradient: string;
  icon?: string;
  link: string;
}

export interface Feature {
  icon: LucideIcon; // LucideIcon type
  title: string;
  description: string;
}

export interface SearchFilters {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  brand?: string;
  sortBy?: 'price-low' | 'price-high' | 'rating' | 'newest';
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}