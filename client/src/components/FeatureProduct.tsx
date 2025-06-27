import React, { useEffect, useState } from 'react';
// Assuming ProductCard is in a 'product' subdirectory within a 'components' folder,
// and FeaturedProducts might be in another subfolder (e.g., 'features' or 'views').
// Adjusting path to go up two levels from the current file, then into 'components/product'.
import type { Product } from '../components/product/ProductCard'; // Corrected path
import ProductCard from '../components/product/ProductCard'; // Corrected path

// Adjusting path to go up two levels from the current file, then into 'context'.
import { useSearch, useCart, useWishlist } from '../context/AppContext'; // Corrected path
import { useNavigate } from 'react-router-dom';


interface FeaturedProductsProps {
  title?: string;
  subtitle?: string;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  title = "Featured Products",
  subtitle = "Discover our handpicked selection of the most popular and trending products",
}) => {
  const {
    search: performSearch,
    results,
    loading: productsLoading,
    error: productsError
  } = useSearch();

  const { addItem: addToCart } = useCart();
  const { toggle: toggleWishlist } = useWishlist();
  const [featuredProducts,setFeaturedProducts] = useState<Product[]>([]);

  const navigate = useNavigate();
  const fetchProducts = async() => {
    await performSearch('',{limit:4});
    console.log(results)
    setFeaturedProducts(results)
  }
  useEffect(() => {
    if(featuredProducts.length==0){
      fetchProducts()
    }
  }, [productsLoading]);

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  if (productsLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">Loading featured products...</p>
        </div>
      </section>
    );
  }

  if (productsError) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-red-500">
          <p>Error loading products: {productsError}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
            <p className="col-span-full text-center text-gray-600">No featured products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
