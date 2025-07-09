import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft, 
  Heart, 
  Shield, 
  Truck, 
  RotateCcw, 
  Tag, 
  Gift,
  CreditCard,
  MapPin,
  ChevronRight
} from 'lucide-react';
import Header from '@/components/common/Header';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import { useAppContext } from '@/context/AppContext';

const CartPage = () => {
  // Use AppContext for cart management
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    addToWishlist,
    cartCount,
    cartTotal,
    cartLoading,
    cartError
  } = useAppContext();

  const [selectedAddress, setSelectedAddress] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const mockAddresses = [
    {
      id: 1,
      name: "John Doe",
      address: "123 MG Road, Indore, Madhya Pradesh 452001",
      phone: "+91 98765 43210",
      isDefault: true
    },
    {
      id: 2,
      name: "John Doe (Office)",
      address: "456 Vijay Nagar, Indore, Madhya Pradesh 452010",
      phone: "+91 98765 43210",
      isDefault: false
    }
  ];

  const moveToWishlist = async (product) => {
    try {
      await addToWishlist(product);
      await removeFromCart(product.id);
      console.log('Moved to wishlist:', product);
    } catch (error) {
      console.error('Error moving to wishlist:', error);
    }
  };

  // Helper function to parse price strings
  const parsePrice = (priceString) => {
    if (typeof priceString === 'number') return priceString;
    return parseFloat(priceString.replace(/[₹,$,]/g, ''));
  };

  const getTotalOriginalPrice = () => {
    return cartItems.reduce((total, item) => {
      const originalPrice = parsePrice(item.product.originalPrice);
      return total + (originalPrice * item.quantity);
    }, 0);
  };

  const getTotalCurrentPrice = () => {
    return cartItems.reduce((total, item) => {
      const currentPrice = parsePrice(item.product.price);
      return total + (currentPrice * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalSavings = () => {
    return getTotalOriginalPrice() - getTotalCurrentPrice();
  };

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'save10') {
      setAppliedCoupon({
        code: 'SAVE10',
        discount: getTotalCurrentPrice() * 0.1,
        description: '10% off on total order'
      });
      setCouponCode('');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const getFinalTotal = () => {
    const subtotal = getTotalCurrentPrice();
    const couponDiscount = appliedCoupon ? appliedCoupon.discount : 0;
    const deliveryFee = subtotal > 500 ? 0 : 40;
    return subtotal - couponDiscount + deliveryFee;
  };

  // Loading state
  if (cartLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-lg shadow-sm p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your cart...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (cartError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-lg shadow-sm p-12">
            <div className="text-red-500 mb-4">
              <ShoppingCart className="h-12 w-12 mx-auto mb-2" />
              <p className="text-lg font-semibold">Error loading cart</p>
              <p className="text-sm text-gray-600">{cartError}</p>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Navigation />
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">My Cart</h1>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-lg shadow-sm p-12">
            <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add items to it now</p>
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
              Shop Now
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="flex-1">
            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-5 w-5 text-green-600" />
                <h2 className="text-lg font-semibold text-gray-900">Delivery Address</h2>
              </div>
              <div className="space-y-3">
                {mockAddresses.map((address, index) => (
                  <label key={address.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddress === index}
                      onChange={() => setSelectedAddress(index)}
                      className="mt-1 text-green-600 focus:ring-green-500"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{address.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{address.address}</div>
                      <div className="text-sm text-gray-600">{address.phone}</div>
                      {address.isDefault && (
                        <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          Default
                        </span>
                      )}
                    </div>
                  </label>
                ))}
                <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-green-600 hover:border-green-300 hover:bg-green-50 transition-colors">
                  + Add New Address
                </button>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                        {item.product.name}
                      </h3>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-gray-900">
                            ₹{parsePrice(item.product.price).toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ₹{parsePrice(item.product.originalPrice).toLocaleString()}
                          </span>
                          <span className="text-green-600 text-sm font-semibold">
                            {item.product.discount}
                          </span>
                        </div>
                      </div>
                      
                      {/* Delivery Info */}
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Truck className="h-4 w-4 text-green-600" />
                          <span>Free delivery by tomorrow</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <RotateCcw className="h-4 w-4 text-green-600" />
                          <span>7 days return</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={item.quantity <= 1 || cartLoading}
                            >
                              <Minus className="h-4 w-4 text-gray-600" />
                            </button>
                            <span className="px-4 py-2 font-medium text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={cartLoading}
                            >
                              <Plus className="h-4 w-4 text-gray-600" />
                            </button>
                          </div>

                          {/* Action Buttons */}
                          <button
                            onClick={() => moveToWishlist(item.product)}
                            className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={cartLoading}
                          >
                            <Heart className="h-4 w-4" />
                            <span className="text-sm font-medium">Save for later</span>
                          </button>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={cartLoading}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="text-sm font-medium">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Offers & Coupons */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <div className="flex items-center gap-3 mb-4">
                <Tag className="h-5 w-5 text-green-600" />
                <h2 className="text-lg font-semibold text-gray-900">Apply Coupon</h2>
              </div>
              
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div>
                    <div className="font-medium text-green-800">{appliedCoupon.code}</div>
                    <div className="text-sm text-green-600">{appliedCoupon.description}</div>
                    <div className="text-sm font-medium text-green-800">
                      You saved ₹{appliedCoupon.discount.toLocaleString()}
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Apply
                  </button>
                </div>
              )}
              
              <div className="text-sm text-gray-600 mt-3">
                Try: <span className="font-medium text-green-600">SAVE10</span> for 10% off
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Price Details</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price ({getTotalItems()} items)</span>
                  <span className="text-gray-900">₹{getTotalOriginalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{getTotalSavings().toLocaleString()}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount</span>
                    <span>-₹{appliedCoupon.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Charges</span>
                  <span className="text-gray-900">
                    {getTotalCurrentPrice() > 500 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      '₹40'
                    )}
                  </span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span>₹{getFinalTotal().toLocaleString()}</span>
                </div>
                <div className="text-green-600 font-medium">
                  You will save ₹{(getTotalSavings() + (appliedCoupon ? appliedCoupon.discount : 0)).toLocaleString()} on this order
                </div>
              </div>

              <button 
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold mt-6 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={cartLoading}
              >
                <CreditCard className="h-5 w-5" />
                {cartLoading ? 'Processing...' : 'Place Order'}
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* Trust Indicators */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>Safe and Secure Payments</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="h-4 w-4 text-green-600" />
                  <span>Free delivery on orders above ₹500</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Gift className="h-4 w-4 text-green-600" />
                  <span>Special offers and discounts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;