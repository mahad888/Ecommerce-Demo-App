import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import axios from "axios";
import {  ProductCategories } from "../assets/constants/ProductCategories";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 9;

  const fetchProducts = async (pageNum = 1, currentCategory = category) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/products`, {
        params: {
          page: pageNum,
          limit,
          category: currentCategory !== "All" ? currentCategory : undefined,
        },
      });
      
      if (pageNum === 1) {
        setProducts(res.data.products);
        console.log(res.data.products

        )
      } else {
        setProducts(prev => [...prev, ...res.data.products]);
      }
      setHasMore(res.data.hasMore);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchProducts(1, category);
  }, [category]);

  useEffect(() => {
    if (page > 1) {
      fetchProducts(page, category);
    }
  }, [page]);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      return existing
        ? prev.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prev, { ...product, quantity: 1 }];
    });
  };

  // Get unique categories from all available products (not just loaded ones)
  const categories = ["All", ...new Set(ProductCategories.map((category) => category))];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        {/* Category Filter */}
        <div className="mb-6 flex flex-wrap gap-4">
          {categories?.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                category === cat
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800 border border-gray-300 hover:bg-blue-100"
              }`}
              disabled={isLoading}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid + Cart */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={`${product.id}-${product.category}`}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
          <div className="hidden md:block md:col-span-1 sticky top-6">
            <Cart cartItems={cart} />
          </div>
        </div>

        {hasMore && (
          <div className="text-center mt-6">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;