import React from 'react';
import Header from '@/components/common/Header';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
// --- ICONS ---
const Star = ({ filled, className = 'w-4 h-4' }) => (
  <svg
    className={`${className} ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const Leaf = ({ filled, className = 'w-5 h-5' }) => (
  <svg
    className={className}
    fill={filled ? "#22c55e" : "#d1d5db"} // Tailwind green-500 or gray-300
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2.166 10.5c2.5-6.5 11.334-10 15.667-8.5C19.5 13.5 7.5 20 2.166 10.5z"/>
    <path d="M7 13c2-2 5-5 8-7" stroke="#166534" strokeWidth="1" fill="none"/>
  </svg>
);
//==products hardcoded==
const product: Product[] = [
  {
    id: 1,
    name: 'Eco-Friendly Bamboo Toothbrush Set (4-Pack)',
    imageUrl: 'https://thecoconutpeople.in/cdn/shop/products/IMG_5719_1080x1080.jpg?v=1642080641',
    price: 12.99,
    originalPrice: 19.99,
    discount: 35,
    rating: 4.8,
    ratingCount: 1250,
    ecoRating: 5,
  },
  {
    id: 2,
    name: 'Organic Cotton Reusable Shopping Bags',
    imageUrl: 'https://cms.cloudinary.vpsvc.com/image/upload/c_scale,dpr_auto,f_auto,q_auto:best,t_productPageHeroGalleryTransformation_v2,w_auto/India%20LOB/Clothing%20and%20Bags/Canvas%20Cotton%20Tote%20Bags/IN_Canvas-Cotton-Tote-Bags_Hero-image_01',
    price: 24.99,
    originalPrice: 32.99,
    discount: 24,
    rating: 4.9,
    ratingCount: 3402,
    ecoRating: 5,
  },
  {
    id: 3,
    name: 'Solar-Powered Portable Phone Charger',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQSeVZ3cc0zPG8RchooaC7oJ6BGbmVBpGuE2H_u5cFP0Efvs8fQkYcZuQxaUkFT4e_XNB_qTvA_umjsrCCqAfJm0KVy2lDxyrUoEvGdumDr',
    price: 45.50,
    originalPrice: 60.00,
    discount: 24,
    rating: 4.5,
    ratingCount: 890,
    ecoRating: 4,
  },
  {
    id: 4,
    name: 'Recycled Glass Water Bottle with Sleeve',
    imageUrl: 'https://m.media-amazon.com/images/I/71-XKboo4cL.jpg',
    price: 18.00,
    originalPrice: 25.00,
    discount: 28,
    rating: 4.7,
    ratingCount: 1543,
    ecoRating: 4,
  },
  {
    id: 5,
    name: 'Natural Cork Yoga Mat',
    imageUrl: 'https://m.media-amazon.com/images/I/415PG-HQmpL._AC_UF894,1000_QL80_.jpg',
    price: 39.99,
    originalPrice: 55.00,
    discount: 27,
    rating: 4.6,
    ratingCount: 765,
    ecoRating: 3,
  },
  
];


// --- TYPES ---
interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  ratingCount: number;
  ecoRating: number;
}

// --- RATING COMPONENTS ---
const EcoRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center">
    <p className="text-sm font-semibold text-green-700 mr-2">Eco Rating:</p>
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Leaf key={i} filled={i < rating} />
      ))}
    </div>
  </div>
);

const StarRating = ({ rating, count }: { rating: number; count: number }) => (
  <div className="flex items-center">
    <div className="flex items-center bg-green-600 text-white px-2 py-0.5 rounded-full text-sm font-bold">
      <span>{rating.toFixed(1)}</span>
      <Star filled={true} className="w-3 h-3 ml-1" />
    </div>
    <span className="text-gray-500 text-sm ml-2">({count.toLocaleString()})</span>
  </div>
);

// --- CARD COMPONENT ---
const ProductCard = ({ product }: { product: Product }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group border border-gray-100">
    <div className="relative">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
        onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x400/cccccc/ffffff?text=Image+Error')}
      />
      <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
        {product.discount}% OFF
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <EcoRating rating={product.ecoRating} />
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-gray-800 text-base truncate" title={product.name}>
        {product.name}
      </h3>
      <div className="flex items-center justify-between my-2">
        <div className="flex items-baseline">
          <span className="text-xl font-bold text-gray-900">${product.price}</span>
          <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice}</span>
        </div>
        <StarRating rating={product.rating} count={product.ratingCount} />
      </div>
      <button className="w-full mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-300">
        View Product
      </button>
    </div>
  </div>
);

// --- SELLER PROFILE ---
const SellerProfile = () => (
  <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-t-8 border-green-500">
    <div className="flex flex-col md:flex-row items-center">
      <div className="relative">
        <img
          src="https://placehold.co/120x120/16a34a/ffffff?text=ES"
          alt="Seller Logo"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md"
        />
        <span className="absolute bottom-1 right-1 bg-green-500 p-1.5 rounded-full border-2 border-white">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      </div>
      <div className="md:ml-8 text-center md:text-left mt-4 md:mt-0">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Eco Sellers Inc.</h1>
        <p className="text-gray-500 mt-1">Your one-stop shop for sustainable living.</p>
        <div className="flex justify-center md:justify-start items-center mt-4 space-x-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">4.8/5</p>
            <p className="text-sm text-gray-500">Seller Rating</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">12.4k</p>
            <p className="text-sm text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">150+</p>
            <p className="text-sm text-gray-500">Products</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN REUSABLE COMPONENT ---
// Use the hardcoded product array directly
const SellerPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Header */}
      <Header/>
      <Navigation/>
      <SellerProfile />
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">All Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {product.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default SellerPage;
