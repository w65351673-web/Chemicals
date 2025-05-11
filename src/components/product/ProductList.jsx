'use client';

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilter, FaTimes, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

export default function ProductList({ initialProducts, selectedCategory }) {
  const [products, setProducts] = useState(initialProducts || []);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  // Check for touch device on client-side only
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window);
  }, []);
  const [filters, setFilters] = useState({
    category: selectedCategory || '',
    minPrice: '',
    maxPrice: '',
    inStock: false,
    sortBy: 'newest',
  });

  // Apply filters whenever they change
  useEffect(() => {
    let result = [...products];

    // Filter by category (case-insensitive)
    if (filters.category) {
      result = result.filter(product => 
        product.category && 
        product.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Filter by price range
    if (filters.minPrice !== '') {
      result = result.filter(product => {
        // Use product.price if priceVariants doesn't exist
        if (!product.priceVariants) {
          return product.price >= Number(filters.minPrice);
        }
        
        const lowestPrice = product.priceVariants.reduce(
          (min, variant) => (variant.price < min ? variant.price : min),
          product.priceVariants[0]?.price || 0
        );
        return lowestPrice >= Number(filters.minPrice);
      });
    }

    if (filters.maxPrice !== '') {
      result = result.filter(product => {
        // Use product.price if priceVariants doesn't exist
        if (!product.priceVariants) {
          return product.price <= Number(filters.maxPrice);
        }
        
        const lowestPrice = product.priceVariants.reduce(
          (min, variant) => (variant.price < min ? variant.price : min),
          product.priceVariants[0]?.price || 0
        );
        return lowestPrice <= Number(filters.maxPrice);
      });
    }

    // Filter by stock
    if (filters.inStock) {
      result = result.filter(product => product.countInStock > 0);
    }

    // Sort products
    switch (filters.sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'price-low-high':
        result.sort((a, b) => {
          // Use product.price if priceVariants doesn't exist
          const aPrice = a.priceVariants ? a.priceVariants.reduce(
            (min, variant) => (variant.price < min ? variant.price : min),
            a.priceVariants[0]?.price || 0
          ) : (a.price || 0);
          
          const bPrice = b.priceVariants ? b.priceVariants.reduce(
            (min, variant) => (variant.price < min ? variant.price : min),
            b.priceVariants[0]?.price || 0
          ) : (b.price || 0);
          
          return aPrice - bPrice;
        });
        break;
      case 'price-high-low':
        result.sort((a, b) => {
          // Use product.price if priceVariants doesn't exist
          const aPrice = a.priceVariants ? a.priceVariants.reduce(
            (min, variant) => (variant.price < min ? variant.price : min),
            a.priceVariants[0]?.price || 0
          ) : (a.price || 0);
          
          const bPrice = b.priceVariants ? b.priceVariants.reduce(
            (min, variant) => (variant.price < min ? variant.price : min),
            b.priceVariants[0]?.price || 0
          ) : (b.price || 0);
          
          return bPrice - aPrice;
        });
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [filters, products]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const clearFilters = () => {
    setFilters({
      category: selectedCategory || '',
      minPrice: '',
      maxPrice: '',
      inStock: false,
      sortBy: 'newest',
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filter toggle button (mobile) */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center justify-center w-full py-2 bg-gray-800 text-white rounded-lg"
        >
          {isFilterOpen ? (
            <>
              <FaTimes className="mr-2" /> Close Filters
            </>
          ) : (
            <>
              <FaFilter className="mr-2" /> Show Filters
            </>
          )}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters sidebar */}
        <AnimatePresence>
          {(isFilterOpen || !isTouchDevice) && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="md:w-64 bg-gray-800 rounded-lg p-4 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Clear All
                </button>
              </div>

              {/* Category filter */}
              <div className="mb-4">
                <label className="block text-white mb-2">Category</label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">All Categories</option>
                  <option value="cannabinoids">Cannabinoids</option>
                  <option value="research chemicals">Research Chemicals</option>
                  {/* Stimulants category removed as requested by owners */}
                  <option value="benzos">Benzos</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Price range */}
              <div className="mb-4">
                <label className="block text-white mb-2">Price Range</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    name="minPrice"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    className="w-1/2 bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    className="w-1/2 bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* In stock filter */}
              <div className="mb-4">
                <label className="flex items-center text-white">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={filters.inStock}
                    onChange={handleFilterChange}
                    className="mr-2 rounded text-purple-600 focus:ring-purple-500"
                  />
                  In Stock Only
                </label>
              </div>

              {/* Sort by */}
              <div className="mb-4">
                <label className="block text-white mb-2">Sort By</label>
                <select
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleFilterChange}
                  className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Product grid */}
        <div className="flex-1">
          {/* Results info */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2 sm:mb-0">
              {filters.category || 'All Products'}
              <span className="text-gray-400 text-lg ml-2">
                ({filteredProducts.length} items)
              </span>
            </h2>
            
            <div className="flex items-center">
              <span className="text-gray-400 mr-2 hidden sm:inline">Sort:</span>
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                className="bg-gray-800 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="newest">Newest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product) => (
                <motion.div key={product._id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <h3 className="text-xl text-white mb-2">No products found</h3>
              <p className="text-gray-400">
                Try adjusting your filters or check back later for new products.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
