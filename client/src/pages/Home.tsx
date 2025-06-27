import BannerOffers from '@/components/Banner';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Navigation from '@/components/common/Navigation';
import FeaturedProducts from '@/components/FeatureProduct';
import FeaturesSection from '@/components/FeatureSection';
import HeroBanner from '@/components/HeroBanner';
import type { Product } from '@/components/product/ProductCard';
import React, { useState } from 'react';


const LandingPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Handler functions
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
    // Implement search logic here
  };

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
    console.log('Added to cart:', product.name);
    // Show success toast/notification
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

  const handleProductClick = (product: Product) => {
    console.log('Navigate to product page:', product.id);
    // Navigate to product page
  };

  const handleCategoryClick = (category: any) => {
    console.log('Navigate to category:', category.name);
    // Navigate to category page
  };

  const handleCartClick = () => {
    console.log('Navigate to cart page');
    // Navigate to cart page
  };

  const handleLoginClick = () => {
    console.log('Open login modal/page');
    // Open login modal or navigate to login page
  };

  const handleWishlistClick = () => {
    console.log('Navigate to wishlist page');
    // Navigate to wishlist page
  };

  const handleHeroPrimaryClick = () => {
    console.log('Start shopping clicked');
    // Navigate to products page or scroll to products
  };

  const handleHeroSecondaryClick = () => {
    console.log('Explore deals clicked');
    // Navigate to deals page
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