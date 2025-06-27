import { useState, useEffect } from 'react';
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Gift,
  Plus,
  Minus,
  MessageCircle,
  ThumbsUp,
  Clock,
  Award,
  Check
} from 'lucide-react';
import Header from '@/components/common/Header';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';

// Import your actual context
import { useAppContext } from '@/context/AppContext';
import type { Product } from '@/types';
 // Assuming you have a Product type defined in your types file

// Mock product data - replace with your actual product import or fetch
// In a real application, you'd fetch this product data based on an ID from the URL (e.g., via a router)
const product: Product = {
  id: 1,
  name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
  brand: "Sony",
  category: "Electronics",
  rating: 4.6,
  reviews: 2100,
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=500&fit=crop"
  ],
  badge: "Best Seller",
  inStock: true,
  stockCount: 15,
  discount: "25% off",
  description: "Industry-leading noise canceling with Dual Noise Sensor technology. Next-level music with Edge-AI, co-developed with Sony Music Studios Tokyo. Up to 30-hour battery life with quick charge.",
  features: [
    "Industry-leading noise canceling technology",
    "30-hour battery life with quick charge",
    "Lightweight and comfortable design",
    "Multipoint connection for seamless switching",
    "Speak-to-chat technology"
  ],
  specifications: {
    "Driver Unit": "30mm",
    "Frequency Response": "4 Hz-40,000 Hz",
    "Battery Life": "30 hours (NC ON), 40 hours (NC OFF)",
    "Charging Time": "3 hours",
    "Weight": "250g",
    "Connectivity": "Bluetooth 5.2, NFC",
    "Noise Canceling": "Yes (Dual Noise Sensor)",
    "Voice Assistant": "Google Assistant, Alexa"
  },
  variants: [
    {
      storage: "Standard",
      price: "₹29,990",
      originalPrice: "₹39,990",
      selected: true
    }
  ],
  colors: [
    { name: "Black", color: "#000000", selected: true },
    { name: "Silver", color: "#C0C0C0", selected: false },
    { name: "Blue", color: "#0066CC", selected: false }
  ],
  offers: [
    {
      title: "Bank Offer",
      description: "10% instant discount on HDFC Bank Credit Cards",
      savings: "Save ₹2,999"
    },
    {
      title: "Exchange Offer",
      description: "Up to ₹15,000 off on exchange",
      savings: "Save ₹15,000"
    }
  ],
  deliveryInfo: {
    deliveryDate: "Tomorrow, June 24",
    deliveryCharge: "Free",
    codAvailable: true
  },
  seller: {
    name: "Sony Official Store",
    rating: 4.8,
    reviews: 15420,
    returnPolicy: "7 days return policy"
  }
};

// Mock reviews data - In a real app, these might be fetched from an API
const reviewsData = [
  {
    id: 1,
    user: "Rajesh Kumar",
    rating: 5,
    date: "2025-06-15",
    title: "Excellent sound quality and noise cancellation",
    review: "The Sony WH-1000XM5 headphones are absolutely fantastic. The noise cancellation is industry-leading and the sound quality is crystal clear. Battery life easily lasts the full day.",
    helpful: 24,
    verified: true
  },
  {
    id: 2,
    user: "Priya Sharma",
    rating: 4,
    date: "2025-06-10",
    title: "Great headphones but pricey",
    review: "Amazing sound quality and the touch controls work perfectly. The noise cancellation is impressive for flights. Only downside is the price, but quality justifies it.",
    helpful: 18,
    verified: true
  },
  {
    id: 3,
    user: "Amit Patel",
    rating: 5,
    date: "2025-06-08",
    title: "Best headphones I've ever owned!",
    review: "Upgraded from WH-1000XM4 and the improvement is noticeable. Lighter weight, better noise cancellation, and the quick charge feature is a lifesaver.",
    helpful: 31,
    verified: true
  }
];

const ProductDetailsPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants.find(v => v.selected) || product.variants[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors.find(c => c.selected) || product.colors[0]);
  const [activeTab, setActiveTab] = useState('description');
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [pincode, setPincode] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState<{ available: boolean; date: string; charge: string } | null>(null);

  // Use your actual context
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    isLoggedIn,
    cartLoading,
    wishlistLoading,
    cartError,
    wishlistError,
  } = useAppContext();

  // Determine wishlist status based on context
  const isProductWishlisted = isInWishlist(product.id);

  const handleImageChange = (index: number) => {
    setSelectedImage(index);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      alert('Please login to add items to cart.');
      return;
    }

    try {
      // Pass the product and quantity directly to the context's addToCart
      await addToCart(product, quantity);
      alert(`Added ${quantity} x ${product.name} to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(`Failed to add to cart: ${cartError || 'An unexpected error occurred.'}`);
    }
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      alert('Please login to proceed with purchase.');
      return;
    }

    console.log('Buy now:', {
      product: product,
      variant: selectedVariant,
      color: selectedColor,
      quantity
    });
    alert('Proceeding to checkout...');
    // In a real application, you would navigate to a checkout page here,
    // potentially passing product details via state or context.
  };

  const handleWishlistToggle = async () => {
    if (!isLoggedIn) {
      alert('Please login to manage your wishlist.');
      return;
    }

    try {
      await toggleWishlist(product);
      alert(isProductWishlisted ? `Removed ${product.name} from wishlist!` : `Added ${product.name} to wishlist!`);
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      alert(`Failed to update wishlist: ${wishlistError || 'An unexpected error occurred.'}`);
    }
  };

  const checkDelivery = () => {
    if (pincode.length === 6 && /^\d{6}$/.test(pincode)) {
      // In a real application, you would make an API call to validate the pincode
      // and fetch actual delivery details. For this demo, we use mock data.
      setDeliveryInfo({
        available: true,
        date: product.deliveryInfo.deliveryDate,
        charge: product.deliveryInfo.deliveryCharge
      });
    } else {
      alert('Please enter a valid 6-digit pincode.');
    }
  };

  const renderStars = (rating: number, size: 'small' | 'large' = 'small') => {
    const starSize = size === 'small' ? 'h-4 w-4' : 'h-5 w-5';
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`${starSize} ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const renderRatingDistribution = () => {
    // This data would ideally come from the product data or a dedicated reviews API
    const distribution = [
      { stars: 5, count: 1420, percentage: 68 },
      { stars: 4, count: 630, percentage: 30 },
      { stars: 3, count: 42, percentage: 2 },
      { stars: 2, count: 8, percentage: 0 },
      { stars: 1, count: 0, percentage: 0 }
    ];

    return distribution.map(item => (
      <div key={item.stars} className="flex items-center gap-2 mb-1">
        <span className="text-sm w-2">{item.stars}</span>
        <Star className="h-3 w-3 text-yellow-400 fill-current" />
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${item.percentage}%` }}
          ></div>
        </div>
        <span className="text-sm text-gray-600 w-12">{item.count}</span>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <a href="#" className="hover:text-green-600">Home</a>
          <span>/</span>
          <a href="#" className="hover:text-green-600">{product.category}</a>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.badge}
                </span>
              </div>
              <button
                onClick={handleWishlistToggle}
                disabled={wishlistLoading}
                className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-all ${
                  isProductWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                } ${wishlistLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Heart className={`h-5 w-5 ${isProductWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Image Thumbnails */}
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleImageChange(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-green-500' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600">{product.brand}</p>

              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                  <span className="text-sm font-medium text-gray-900 ml-1">{product.rating}</span>
                </div>
                <span className="text-sm text-gray-600">({product.reviews.toLocaleString()} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900">{selectedVariant.price}</span>
              <span className="text-lg text-gray-500 line-through">{selectedVariant.originalPrice}</span>
              <span className="text-green-600 font-semibold">{product.discount}</span>
            </div>

            {/* Stock Status */}
            <div className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inStock ? `In Stock (${product.stockCount} available)` : 'Out of Stock'}
            </div>

            {/* Offers */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-3">Available Offers</h3>
              <div className="space-y-2">
                {product.offers.map((offer, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Gift className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-green-800">{offer.title}</span>
                      <p className="text-sm text-green-700">{offer.description}</p>
                      <span className="text-xs text-green-600 font-medium">{offer.savings}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Variants */}
            {product.variants.length > 1 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Variant</h3>
                <div className="flex gap-2">
                  {product.variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                        selectedVariant.storage === variant.storage
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {variant.storage}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Color: {selectedColor.name}</h3>
              <div className="flex gap-2">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 relative ${
                      selectedColor.name === color.name ? 'border-green-500' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.color }}
                  >
                    {selectedColor.name === color.name && (
                      <Check className="h-4 w-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="font-semibold text-gray-900">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stockCount}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-sm text-gray-600">Only {product.stockCount} left in stock</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || cartLoading}
                className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartLoading ? 'Adding...' : 'ADD TO CART'}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                BUY NOW
              </button>
            </div>

            {/* Delivery Info */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Truck className="h-5 w-5 text-green-600" />
                Delivery Options
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Enter pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    onClick={checkDelivery}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Check
                  </button>
                </div>

                {deliveryInfo && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-green-800 font-medium">
                      Delivery available to {pincode}
                    </p>
                    <p className="text-green-700 text-sm">
                      Expected delivery: {deliveryInfo.date} | Charge: {deliveryInfo.charge}
                    </p>
                  </div>
                )}

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span>Delivery by {product.deliveryInfo.deliveryDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="h-4 w-4 text-green-600" />
                    <span>{product.seller.returnPolicy}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>1 year warranty</span>
                  </div>
                  {product.deliveryInfo.codAvailable && (
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-green-600" />
                      <span>Cash on Delivery available</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Seller Information</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{product.seller.name}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      {renderStars(product.seller.rating, 'small')}
                      <span>{product.seller.rating}</span>
                    </div>
                    <span>({product.seller.reviews} ratings)</span>
                  </div>
                </div>
                <span className="text-sm text-green-600">{product.seller.returnPolicy}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12 bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Description</h3>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-900">{key}</span>
                      <span className="text-gray-700">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Rating Overview */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Reviews</h3>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">{product.rating}</div>
                        <div className="flex items-center justify-center gap-1 mb-1">
                          {renderStars(product.rating)}
                        </div>
                        <div className="text-sm text-gray-600">{product.reviews.toLocaleString()} reviews</div>
                      </div>
                    </div>
                  </div>

                  {/* Rating Distribution */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Rating Distribution</h4>
                    {renderRatingDistribution()}
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-4">
                  {reviewsData.slice(0, showAllReviews ? reviewsData.length : 3).map((review) => (
                    <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900">{review.user}</span>
                            {review.verified && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {renderStars(review.rating, 'small')}
                            <span className="text-sm text-gray-600">{review.date}</span>
                          </div>
                        </div>
                      </div>

                      <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                      <p className="text-gray-700 mb-3">{review.review}</p>

                      <div className="flex items-center gap-4 text-sm">
                        <button className="flex items-center gap-1 text-gray-600 hover:text-green-600">
                          <ThumbsUp className="h-4 w-4" />
                          Helpful ({review.helpful})
                        </button>
                        <button className="flex items-center gap-1 text-gray-600 hover:text-green-600">
                          <MessageCircle className="h-4 w-4" />
                          Reply
                        </button>
                      </div>
                    </div>
                  ))}

                  {!showAllReviews && reviewsData.length > 3 && (
                    <button
                      onClick={() => setShowAllReviews(true)}
                      className="w-full py-2 text-green-600 hover:text-green-700 font-medium"
                    >
                      Show More Reviews
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;