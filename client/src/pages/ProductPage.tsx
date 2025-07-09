import React, { useState, useEffect } from 'react';
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
  Check,
  ArrowLeft,
  Share2,
  MapPin,
  Zap,
  Loader2,
  Leaf,
  Globe,
  Package,
  Recycle,
  Scale,
  TreePine,
  Droplets,
  Wind,
  Sun,
  Factory,
  Truck as TruckIcon
} from 'lucide-react';
import Header from '@/components/common/Header';

// Mock useAppContext hook - replace with your actual import
const useAppContext = () => {
  // This would normally come from your context
  const staticProducts = [
    {
      id: 1,
      name: 'Wireless Noise-Cancelling Headphones',
      price: '199.99',
      originalPrice: '249.99',
      discount: '20%',
      rating: 4.5,
      reviews: 125,
      image: 'https://shopatsc.com/cdn/shop/files/ULT-900N---2500-x-2500---1.jpg?v=1715240812',
      badge: 'Eco Choice',
      description: 'Immerse yourself in pure sound with our latest noise-cancelling headphones. Crafted with sustainable materials and designed for longevity, these headphones deliver crystal-clear audio while minimizing environmental impact.',
      specifications: { 
        "Battery Life": "30h", 
        "Connectivity": "Bluetooth 5.2", 
        "Weight": "250g",
        "Driver Size": "40mm",
        "Frequency Response": "20Hz - 20kHz"
      },
      ecoRating: 4.2,
      ecoParameters: {
        material: "Recycled Plastic & Bamboo",
        countryOfOrigin: "Denmark",
        packagingType: "100% Recyclable Cardboard",
        isRecyclable: true,
        transportMode: "Sea Freight",
        weight: "250g",
        carbonFootprint: "2.1 kg CO2",
        waterUsage: "15L",
        renewableEnergy: "85%"
      },
      category: 'Electronics',
      brand: 'AudioPro',
      stock: 50
    },
    {
      id: 2,
      name: 'RGB Mechanical Gaming Keyboard',
      price: '129.99',
      originalPrice: '149.99',
      discount: '13%',
      rating: 4.8,
      reviews: 80,
      image: 'https://www.portronics.com/cdn/shop/files/Hydra-10_1200x1200_Brown_1.jpg?v=1733831965',
      badge: 'Green Tech',
      description: 'Unleash your gaming potential with this durable mechanical keyboard featuring customizable RGB lighting and responsive tactile switches. Built with eco-conscious materials for sustainable gaming.',
      specifications: { 
        "Switch Type": "Blue (Tactile)", 
        "Backlight": "RGB", 
        "Durability": "50M Keystrokes",
        "Connection": "USB-C",
        "Layout": "Full Size"
      },
      ecoRating: 3.8,
      ecoParameters: {
        material: "Recycled Aluminum & Bio-plastic",
        countryOfOrigin: "Taiwan",
        packagingType: "Minimal Eco-packaging",
        isRecyclable: true,
        transportMode: "Air Freight",
        weight: "1.2kg",
        carbonFootprint: "5.4 kg CO2",
        waterUsage: "28L",
        renewableEnergy: "72%"
      },
      category: 'Gaming',
      brand: 'GamerGear',
      stock: 30
    }
  ];

  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  return {
    // Product search/retrieval
    performSearch: async (query) => {
      setSearchLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      const results = staticProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.id.toString() === query
      );
      setSearchLoading(false);
      return results;
    },
    searchLoading,

    // Cart functions
    cartItems,
    cartLoading,
    cartError: null,
    addToCart: async (product, quantity) => {
      setCartLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      const existingItem = cartItems.find(item => item.product.id === product.id);
      if (existingItem) {
        setCartItems(cartItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ));
      } else {
        setCartItems([...cartItems, { product, quantity, price: parseFloat(product.price) }]);
      }
      setCartLoading(false);
    },

    // Wishlist functions
    wishlistItems,
    wishlistLoading,
    wishlistError: null,
    isInWishlist: (productId) => wishlistItems.some(item => item.id === productId),
    toggleWishlist: async (product) => {
      setWishlistLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      const isInWishlist = wishlistItems.some(item => item.id === product.id);
      if (isInWishlist) {
        setWishlistItems(wishlistItems.filter(item => item.id !== product.id));
      } else {
        setWishlistItems([...wishlistItems, product]);
      }
      setWishlistLoading(false);
    },

    // Auth
    isLoggedIn: true,
    user: { id: 1, name: 'John Doe', email: 'john@example.com' }
  };
};

// Mock reviews data
const generateMockReviews = (productId) => [
  {
    id: 1,
    user: "Rajesh Kumar",
    rating: 5,
    date: "2025-06-15",
    title: "Excellent eco-friendly product!",
    review: "This product exceeded my expectations. Great build quality and I love that it's made from sustainable materials. The packaging was minimal and recyclable too!",
    helpful: 24,
    verified: true
  },
  {
    id: 2,
    user: "Priya Sharma",
    rating: 4,
    date: "2025-06-10",
    title: "Good value for money and planet",
    review: "Good product overall. Works as described and the eco-friendly approach is commendable. Happy to support sustainable brands.",
    helpful: 18,
    verified: true
  },
  {
    id: 3,
    user: "Amit Patel",
    rating: 5,
    date: "2025-06-08",
    title: "Best sustainable purchase!",
    review: "Absolutely love this product. It's exactly what I was looking for and the eco-rating helped me make an informed choice. Fast delivery too!",
    helpful: 31,
    verified: true
  }
];

const EcoFriendlyAlternatives = ({ currentProduct }) => {
  const alternatives = [
    {
      id: 'alt1',
      name: 'Bamboo Wireless Headphones',
      price: '179.99',
      ecoRating: 4.8,
      image: 'data:image/jpeg;base64,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',
      highlights: ['100% Bamboo', 'Solar Charging', 'Zero Plastic']
    },
    {
      id: 'alt2',
      name: 'Recycled Ocean Plastic Headphones',
      price: '159.99',
      ecoRating: 4.6,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDQGuzrSRsAwKGeQQ2czyqUdYLFn4oOn2yYQ&s',
      highlights: ['Ocean Plastic', 'Carbon Neutral', 'Biodegradable']
    },
    {
      id: 'alt3',
      name: 'Hemp Fiber Audio Set',
      price: '199.99',
      ecoRating: 4.7,
      image: 'data:image/jpeg;base64,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',
      highlights: ['Hemp Fiber', 'Local Made', 'Compostable']
    }
  ];

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-100 rounded-full">
          <Leaf className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Eco-Friendly Alternatives</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {alternatives.map((alt) => (
          <div key={alt.id} className="bg-white rounded-xl p-4 border border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <img 
              src={alt.image} 
              alt={alt.name}
              className="w-full h-80 object-cover rounded-lg mb-3"
            />
            <h4 className="font-semibold text-gray-900 mb-2 text-sm">{alt.name}</h4>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                <Leaf className="h-3 w-3" />
                <span>{alt.ecoRating}</span>
              </div>
              <span className="text-sm font-bold text-gray-900">₹{alt.price}</span>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {alt.highlights.map((highlight, idx) => (
                <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {highlight}
                </span>
              ))}
            </div>
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
              View Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const EcoRatingBadge = ({ rating }) => {
  const getEcoColor = (rating) => {
    if (rating >= 4.5) return 'from-green-500 to-emerald-500';
    if (rating >= 4.0) return 'from-green-400 to-green-500';
    if (rating >= 3.5) return 'from-yellow-400 to-green-400';
    if (rating >= 3.0) return 'from-orange-400 to-yellow-400';
    return 'from-red-400 to-orange-400';
  };

  const getEcoLabel = (rating) => {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4.0) return 'Very Good';
    if (rating >= 3.5) return 'Good';
    if (rating >= 3.0) return 'Fair';
    return 'Poor';
  };

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${getEcoColor(rating)} text-white shadow-lg`}>
      <Leaf className="h-4 w-4" />
      <span className="font-semibold text-sm">Eco Rating: {rating}</span>
      <span className="text-xs opacity-90">({getEcoLabel(rating)})</span>
    </div>
  );
};

const ProductDetailsPage = ({ productId = 1 }) => {
  const {
    performSearch,
    searchLoading,
    addToCart,
    toggleWishlist,
    isInWishlist,
    isLoggedIn,
    cartLoading,
    wishlistLoading,
    cartError,
    wishlistError,
  } = useAppContext();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [pincode, setPincode] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [reviews, setReviews] = useState([]);

  // Fetch product details on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const searchResults = await performSearch(productId.toString());
        
        if (searchResults && searchResults.length > 0) {
          const foundProduct = searchResults[0];
          
          const enhancedProduct = {
            ...foundProduct,
            images: [
              foundProduct.image || '/api/placeholder/400/400',
              'https://s.yimg.com/ny/api/res/1.2/eABiKLfOdCTuqcjGV9cVPg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyNDI7aD04Mjc-/https://media.zenfs.com/en/digital_trends_973/202c5c981d723dfd3c9c4ac541988187',
              'https://sm.pcmag.com/pcmag_me/review/s/sony-wh-10/sony-wh-1000xm6_m5eq.jpg',
              'https://www.sony.co.uk/commerceapi/medias/13-English-WH-1000X-M6-Colour-Variant-2000x2000-Infographic-min.png?context=bWFzdGVyfHJvb3R8NTY0MDA2fGltYWdlL3BuZ3xhRFV5TDJoaVpTOHhNREEwTXpRek5qTTJOemt3TWk4eE0xOUZibWRzYVhOb1gxZElMVEV3TURCWUlFMDJYME52Ykc5MWNpQldZWEpwWVc1MFh6SXdNREI0TWpBd01GOUpibVp2WjNKaGNHaHBZeTF0YVc0dWNHNW58NDJjMGMzNjVmNDE3NDVhY2EwYTgwZmJhNzMyN2EzYWNjZmZmZjA0NzgzOTJmYmU5Y2I0YzdiOTY5NTc4YzgyMQ'
            ],
            features: [
              'Sustainable materials and eco-friendly construction',
              'Excellent performance with minimal environmental impact',
              'Recyclable packaging and carbon-neutral shipping',
              'Long-lasting durability reduces replacement needs',
              'Ethically sourced components and fair trade practices',
              'Professional eco-certified customer support'
            ],
            offers: [
              {
                title: 'Eco Bonus',
                description: 'Plant a tree with every purchase',
                savings: 'Free Tree Planting'
              },
              {
                title: 'Green Discount',
                description: '15% off for eco-conscious buyers',
                savings: 'Save ₹3,000'
              },
              {
                title: 'Recycle Reward',
                description: 'Trade in your old device for credit',
                savings: 'Up to ₹5,000'
              }
            ],
            deliveryInfo: {
              deliveryDate: 'Tomorrow',
              deliveryCharge: 'Free',
              codAvailable: true,
              carbonNeutral: true
            },
            seller: {
              name: 'EcoTech Official',
              rating: 4.6,
              reviews: 3240,
              returnPolicy: '14 days return',
              ecoTrust: 'Certified Green Seller'
            }
          };
          
          setProduct(enhancedProduct);
          setReviews(generateMockReviews(productId));
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to load product details');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleImageChange = (index) => {
    setSelectedImage(index);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 0)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      alert('Please login to add items to cart.');
      return;
    }

    if (!product) return;

    try {
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

    alert('Proceeding to eco-friendly checkout...');
  };

  const handleWishlistToggle = async () => {
    if (!isLoggedIn) {
      alert('Please login to manage your wishlist.');
      return;
    }

    if (!product) return;

    try {
      await toggleWishlist(product);
      const wasInWishlist = isInWishlist(product.id);
      alert(wasInWishlist ? `Added ${product.name} to wishlist!` : `Removed ${product.name} from wishlist!`);
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      alert(`Failed to update wishlist: ${wishlistError || 'An unexpected error occurred.'}`);
    }
  };

  const checkDelivery = () => {
    if (pincode.length === 6 && /^\d{6}$/.test(pincode)) {
      setDeliveryInfo({
        available: true,
        date: product?.deliveryInfo?.deliveryDate || 'Tomorrow',
        charge: product?.deliveryInfo?.deliveryCharge || 'Free',
        carbonNeutral: true
      });
    } else {
      alert('Please enter a valid 6-digit pincode.');
    }
  };

  const renderStars = (rating, size = 'small') => {
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

  const renderEcoStars = (rating, size = 'small') => {
    const starSize = size === 'small' ? 'h-4 w-4' : 'h-5 w-5';
    return [...Array(5)].map((_, i) => (
      <Leaf
        key={i}
        className={`${starSize} ${
          i < Math.floor(rating)
            ? 'text-green-500 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const renderRatingDistribution = () => {
    const distribution = [
      { stars: 5, count: 85, percentage: 68 },
      { stars: 4, count: 30, percentage: 24 },
      { stars: 3, count: 7, percentage: 6 },
      { stars: 2, count: 2, percentage: 2 },
      { stars: 1, count: 1, percentage: 1 }
    ];

    return distribution.map(item => (
      <div key={item.stars} className="flex items-center gap-2 mb-2">
        <span className="text-sm w-2 text-gray-600">{item.stars}</span>
        <Star className="h-3 w-3 text-yellow-400 fill-current" />
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${item.percentage}%` }}
          ></div>
        </div>
        <span className="text-sm text-gray-600 w-8 text-right">{item.count}</span>
      </div>
    ));
  };

  // Loading state
  if (loading || searchLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
            <Leaf className="h-8 w-8 text-green-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-gray-600 text-lg">Loading sustainable product details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-red-500 mb-4">
            <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The product you are looking for does not exist.'}</p>
          <button
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const isProductInWishlist = isInWishlist(product.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Modern Header */}
      <Header/>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <a href="#" className="hover:text-green-600 transition-colors">Home</a>
          <span>/</span>
          <a href="#" className="hover:text-green-600 transition-colors">{product.category}</a>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-green-100">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-[450px] object-cover"
              />
              {product.badge && (
                <div className="absolute top-6 left-6">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {product.badge}
                  </span>
                </div>
              )}
              <div className="absolute top-6 right-6">
                <EcoRatingBadge rating={product.ecoRating} />
              </div>
              <button
                onClick={handleWishlistToggle}
                disabled={wishlistLoading}
                className={`absolute bottom-6 right-6 p-4 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-110 ${
                  isProductInWishlist ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-600 hover:bg-white'
                } ${wishlistLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {wishlistLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <Heart className={`h-6 w-6 ${isProductInWishlist ? 'fill-current' : ''}`} />
                )}
              </button>
            </div>

            {/* Image Thumbnails */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleImageChange(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-3 transition-all duration-300 hover:scale-105 ${
                    selectedImage === index ? 'border-green-500 shadow-lg' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
              <p className="text-gray-600 font-medium text-lg">{product.brand}</p>

              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2 bg-yellow-50 text-yellow-800 px-3 py-2 rounded-xl border border-yellow-200">
                  <span className="text-lg font-bold">{product.rating}</span>
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm">({product.reviews})</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 text-green-800 px-3 py-2 rounded-xl border border-green-200">
                  <span className="text-lg font-bold">{product.ecoRating}</span>
                  <Leaf className="h-4 w-4 fill-current" />
                  <span className="text-sm">Eco Rating</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-bold text-gray-900">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                )}
                {product.discount && (
                  <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.discount} off
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2 text-green-600 font-medium">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span>In Stock</span>
                </div>
                <span className="text-gray-600">({product.stock} available)</span>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-semibold text-gray-900">Quantity:</span>
                <div className="flex items-center border-2 border-green-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <span className="px-6 py-3 font-bold text-lg min-w-16 text-center bg-green-50">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="p-3 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={cartLoading}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 font-semibold text-lg"
                >
                  {cartLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5" />
                      Add to Cart
                    </>
                  )}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-3 font-semibold text-lg"
                >
                  <Zap className="h-5 w-5" />
                  Buy Now
                </button>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Truck className="h-5 w-5 text-green-600" />
                Delivery Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-green-50 text-green-800 px-3 py-2 rounded-xl">
                    <Leaf className="h-4 w-4" />
                    <span className="text-sm font-medium">Carbon Neutral Delivery</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-2 rounded-xl">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm font-medium">Free Delivery</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Enter pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-green-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors"
                    maxLength={6}
                  />
                  <button
                    onClick={checkDelivery}
                    className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors font-medium"
                  >
                    Check
                  </button>
                </div>

                {deliveryInfo && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-green-800 mb-2">
                      <Check className="h-5 w-5" />
                      <span className="font-semibold">Delivery Available</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Expected delivery: <span className="font-semibold">{deliveryInfo.date}</span>
                    </p>
                    <p className="text-sm text-gray-700">
                      Delivery charge: <span className="font-semibold">{deliveryInfo.charge}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Offers */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Gift className="h-5 w-5 text-green-600" />
                Special Offers
              </h3>
              <div className="space-y-3">
                {product.offers.map((offer, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{offer.title}</p>
                      <p className="text-sm text-gray-600">{offer.description}</p>
                    </div>
                    <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      {offer.savings}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
          <div className="border-b border-green-100">
            <nav className="flex">
              {[
                { id: 'description', label: 'Description', icon: MessageCircle },
                { id: 'specifications', label: 'Specifications', icon: Award },
                { id: 'reviews', label: 'Reviews', icon: Star },
                { id: 'eco-impact', label: 'Eco Impact', icon: Leaf }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-green-600 border-b-3 border-green-500 bg-green-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'description' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Product Description</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                      <span className="font-medium text-gray-900">{key}</span>
                      <span className="text-gray-700 font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/3">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                      <div className="text-center mb-4">
                        <div className="text-4xl font-bold text-gray-900 mb-2">{product.rating}</div>
                        <div className="flex items-center justify-center gap-1 mb-2">
                          {renderStars(product.rating)}
                        </div>
                        <p className="text-gray-600">{product.reviews} reviews</p>
                      </div>
                      <div className="space-y-2">
                        {renderRatingDistribution()}
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-2/3">
                    <div className="space-y-4">
                      {reviews.slice(0, showAllReviews ? reviews.length : 3).map((review) => (
                        <div key={review.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                                {review.user.charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{review.user}</p>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1">
                                    {renderStars(review.rating)}
                                  </div>
                                  {review.verified && (
                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                      Verified
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
                          <p className="text-gray-700 mb-3">{review.review}</p>
                          <div className="flex items-center gap-2">
                            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600">
                              <ThumbsUp className="h-4 w-4" />
                              Helpful ({review.helpful})
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      {reviews.length > 3 && (
                        <button
                          onClick={() => setShowAllReviews(!showAllReviews)}
                          className="w-full bg-green-100 text-green-800 py-3 rounded-xl hover:bg-green-200 transition-colors font-medium"
                        >
                          {showAllReviews ? 'Show Less' : `Show All ${reviews.length} Reviews`}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'eco-impact' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Environmental Impact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.entries(product.ecoParameters).map(([key, value]) => {
                      const icons = {
                        material: Package,
                        countryOfOrigin: Globe,
                        packagingType: Recycle,
                        isRecyclable: Recycle,
                        transportMode: TruckIcon,
                        weight: Scale,
                        carbonFootprint: Factory,
                        waterUsage: Droplets,
                        renewableEnergy: Sun
                      };
                      
                      const Icon = icons[key] || Leaf;
                      
                      return (
                        <div key={key} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                          <div className="flex items-center gap-3 mb-2">
                            <Icon className="h-5 w-5 text-green-600" />
                            <span className="font-medium text-gray-900 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                          </div>
                          <p className="text-gray-700 font-semibold">{value.toString()}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 border border-green-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <TreePine className="h-5 w-5 text-green-600" />
                    Sustainability Summary
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4">
                      <div className="flex items-center gap-2 text-green-600 mb-2">
                        <Leaf className="h-4 w-4" />
                        <span className="font-semibold">Carbon Footprint</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{product.ecoParameters.carbonFootprint}</p>
                      <p className="text-sm text-gray-600">50% lower than average</p>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                      <div className="flex items-center gap-2 text-blue-600 mb-2">
                        <Droplets className="h-4 w-4" />
                        <span className="font-semibold">Water Usage</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{product.ecoParameters.waterUsage}</p>
                      <p className="text-sm text-gray-600">30% less than industry standard</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Eco-Friendly Alternatives */}
        <div className="mt-12">
          <EcoFriendlyAlternatives currentProduct={product} />
        </div>

        {/* Seller Information */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg border border-green-100 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Seller Information</h3>
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
              {product.seller.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-900">{product.seller.name}</h4>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{product.seller.rating}</span>
                  <span className="text-gray-600">({product.seller.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm font-medium">{product.seller.ecoTrust}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">{product.seller.returnPolicy}</p>
              <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                View Store
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;