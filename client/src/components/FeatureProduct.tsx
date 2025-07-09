import React from 'react'; // useEffect is no longer strictly needed for data fetching if static
import ProductCard from '../components/product/ProductCard';
import { useCart, useWishlist } from '../context/AppContext'; // Still need these hooks
import { useNavigate } from 'react-router-dom';
import type { Product } from '@/types/index';

// --- Define your static featured products array directly here ---
// You can also import this from a separate file like `import { staticProducts } from '../data/products';`
const localStaticFeaturedProducts: Product[] = [
   {
    id: 1,
    name: 'Wireless Noise-Cancelling Headphones',
    price: '199.99',
    originalPrice: '249.99',
    discount: '20%',
    rating: 4.5,
    ecoRating: 3.9,
    reviews: 125,
    image: 'https://shopatsc.com/cdn/shop/files/ULT-900N---2500-x-2500---1.jpg?v=1715240812',
    badge: 'New Arrival',
    description: 'Immerse yourself in pure sound with our latest noise-cancelling headphones. Comfortable design, long battery life, and crystal-clear audio.',
    specifications: { "Battery Life": "30h", "Connectivity": "Bluetooth 5.2", "Weight": "250g" },
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
    ecoRating:4.2,
    rating: 4.8,
    reviews: 80,
    image: 'https://www.portronics.com/cdn/shop/files/Hydra-10_1200x1200_Brown_1.jpg?v=1733831965',
    badge: 'Best Seller',
    description: 'Unleash your gaming potential with this durable mechanical keyboard featuring customizable RGB lighting and responsive tactile switches.',
    specifications: { "Switch Type": "Blue (Tactile)", "Backlight": "RGB", "Durability": "50M Keystrokes" },
    category: 'Gaming',
    brand: 'GamerGear',
    stock: 30
  },
  {
    id: 7,
    name: 'Advanced Smartwatch Pro',
    price: '249.99',
    originalPrice: '299.99',
    discount: '17%',
    rating: 4.4,
    ecoRating: 4.1,
    reviews: 95,
    image: 'data:image/jpeg;base64,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',
    badge: 'New Release',
    description: 'Track your fitness, health, and notifications with this sleek and powerful smartwatch. Water-resistant with GPS.',
    specifications: { "Display": "AMOLED", "Sensors": "Heart Rate, SpO2, GPS", "Water Resistance": "5ATM" },
    category: 'Wearables',
    brand: 'HealthTech',
    stock: 25
  },
  {
    id: 8,
    name: 'Ergonomic Office Chair',
    price: '399.99',
    originalPrice: '499.99',
    discount: '20%',
    rating: 4.7,
    ecoRating: 4.1,
    reviews: 55,
    image: 'data:image/jpeg;base64,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',
    badge: 'Premium',
    description: 'Experience ultimate comfort and support during long work sessions with this fully adjustable ergonomic office chair.',
    specifications: { "Material": "Mesh/Fabric", "Adjustments": "Height, Tilt, Lumbar", "Weight Capacity": "300lbs" },
    category: 'Furniture',
    brand: 'ComfortZone',
    stock: 10
  },
];
// --- End of local static products ---


interface FeaturedProductsProps {
  title?: string;
  subtitle?: string;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  title = "Featured Products",
  subtitle = "Discover our handpicked selection of the most popular and trending products",
}) => {
  // We no longer need useSearch, searchLoading, or searchError if using local static data.
  // const { results: featuredProducts, loading: searchLoading, error: searchError, search } = useSearch();

  const { addItem: addToCart } = useCart();
  const { toggle: toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  // If you're using truly static data and it's always available,
  // there's no need for a useEffect to "fetch" it or for loading/error states.
  // The 'featuredProducts' array can simply be `localStaticFeaturedProducts`.
  const featuredProducts = localStaticFeaturedProducts;

  // No loading state if products are always immediately available
  // No error state if products are static and hardcoded

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <section className="py-16 space-x-2 bg-gray-50 font-inter">
      <div className="max-w-5/6 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-24">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => addToCart(product)}
                onWishlist={() => toggleWishlist(product)}
                onProductClick={() => handleProductClick(product)}
              />
            ))
          ) : (
            // This message would only show if localStaticFeaturedProducts is empty
            <p className="col-span-full text-center text-gray-600">No featured products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;