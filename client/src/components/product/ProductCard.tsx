import React from 'react';
import { Star, Heart, Leaf, ShoppingCart } from 'lucide-react';

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
  ecoRating: number; // 1-5 scale for eco-friendliness
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onWishlist?: (product: Product) => void;
  onProductClick?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onWishlist,
  onProductClick
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

  return (
    <div className="bg-white w-80 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 group border border-gray-100 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700 cursor-pointer"
          onClick={() => onProductClick?.(product)}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
            {product.badge}
          </span>
        </div>
        
        {/* Wishlist button */}
        <div className="absolute top-4 right-4">
          <button 
            onClick={() => onWishlist?.(product)}
            className="bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 group/heart"
          >
            <Heart className="h-4 w-4 text-gray-600 group-hover/heart:text-red-500 transition-colors" />
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
          onClick={() => onProductClick?.(product)}
        >
          {product.name}
        </h3>
        
        {/* Ratings section */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {renderStars(product.rating)}
              <span className="text-sm text-gray-600 ml-2 font-medium">({product.reviews})</span>
            </div>
            <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-gray-900">{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
            )}
          </div>
        </div>
        
        {/* Add to cart button */}
        <button 
          onClick={() => onAddToCart?.(product)}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 group/button"
        >
          <ShoppingCart className="h-4 w-4 group-hover/button:scale-110 transition-transform" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard