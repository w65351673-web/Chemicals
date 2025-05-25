'use client';

import { useState, useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaFilter, FaTimes, FaSortAmountDown, FaSortAmountUp, FaSearch } from 'react-icons/fa';
import gsap from 'gsap';

export default function ProductList({ initialProducts, selectedCategory }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const productListRef = useRef(null);
  // Make sure products are visible by default
  const isInView = useInView(productListRef, { once: true, amount: 0.1, initialInView: true });
  
  // Initialize products from props
  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      setProducts(initialProducts);
      setFilteredProducts(initialProducts);
    }
  }, [initialProducts]);
  
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
  
  // Update filters when selectedCategory changes
  useEffect(() => {
    if (selectedCategory !== filters.category) {
      setFilters(prev => ({
        ...prev,
        category: selectedCategory || ''
      }));
    }
  }, [selectedCategory]);
  
  // Add background particle effect - with error handling
  useEffect(() => {
    try {
      if (!productListRef.current) return;
      
      const container = productListRef.current;
      const particles = [];
      const particleCount = 15; // Reduced count for better performance
      
      // Create particles
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full bg-purple-500/5 pointer-events-none';
        
        // Random size
        const size = Math.random() * 100 + 50;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        container.appendChild(particle);
        particles.push(particle);
        
        // Animate each particle
        gsap.to(particle, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          opacity: Math.random() * 0.3 + 0.1,
          duration: Math.random() * 20 + 10,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 5
        });
      }
      
      return () => {
        particles.forEach(particle => {
          gsap.killTweensOf(particle);
          particle.remove();
        });
      };
    } catch (error) {
      console.error('Error in particle effect:', error);
      // Continue without particles if there's an error
    }
  }, []);

  // Apply filters whenever they change
  useEffect(() => {
    if (!products || products.length === 0) return;
    
    let result = [...products];
    console.log('Starting filtering with', result.length, 'products');
    console.log('Current filters:', filters);
    
    // Filter by category (case-insensitive)
    if (filters.category && filters.category !== '') {
      console.log('Filtering by category:', filters.category);
      result = result.filter(product => {
        if (!product.category) {
          console.log(`Product ${product.name} has no category, excluding`);
          return false;
        }
        
        const productCategory = product.category.toLowerCase();
        const filterCategory = filters.category.toLowerCase();
        
        // Special handling for research chemicals
        if (filterCategory === 'research chemicals') {
          const matches = productCategory === 'research chemicals';
          console.log(`Research chemicals filter: ${product.name} (${productCategory}) matches? ${matches}`);
          return matches;
        }
        
        // Direct match for all other categories
        const matches = productCategory === filterCategory;
        console.log(`Category filter: ${product.name} (${productCategory}) matches ${filterCategory}? ${matches}`);
        return matches;
      });
    } else {
      console.log('No category filter applied, showing all products');
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(product => 
        (product.name && product.name.toLowerCase().includes(query)) ||
        (product.description && product.description.toLowerCase().includes(query)) ||
        (product.category && product.category.toLowerCase().includes(query))
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
  }, [filters, products, searchQuery]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Log the filter change for debugging
    console.log(`Filter changed: ${name} = ${value}`);
    
    // Special handling for category changes
    if (name === 'category') {
      // When selecting All Categories, reset to empty string
      const categoryValue = value === '' ? '' : value;
      
      // Update URL with the new category if possible
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        if (categoryValue) {
          url.searchParams.set('category', categoryValue);
        } else {
          url.searchParams.delete('category');
        }
        
        // Reload the page to get fresh products from the server
        // This ensures we get all products when All Categories is selected
        window.location.href = url.toString();
        return; // Stop here since we're reloading the page
      }
      
      setFilters({
        ...filters,
        category: categoryValue
      });
    } else {
      // Handle other filter changes normally
      setFilters({
        ...filters,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const clearFilters = () => {
    // Reset filters to default values
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      inStock: false,
      sortBy: 'newest',
    });
    
    // Reset URL parameters and reload page to get all products
    if (typeof window !== 'undefined') {
      // Create a new URL without any search parameters
      const url = new URL(window.location.pathname, window.location.origin);
      window.location.href = url.toString();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: (i) => ({
      y: 50,
      opacity: 0,
      scale: 0.9,
      rotateX: -10
    }),
    visible: (i) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay: i * 0.05
      }
    })
  };

  return (
    <div ref={productListRef} className="container mx-auto px-4 py-8 relative overflow-hidden">
      {/* Search bar */}
      <motion.div 
        className="mb-6 relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`relative transition-all duration-300 ${isSearchFocused ? 'ring-2 ring-purple-500' : ''}`}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              onClick={() => setSearchQuery('')}
            >
              <FaTimes />
            </motion.button>
          )}
        </div>
      </motion.div>
      
      {/* Filter toggle button (mobile) */}
      <motion.div 
        className="md:hidden mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <motion.button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center justify-center w-full py-2 bg-gray-800 text-white rounded-lg"
          whileHover={{ scale: 1.02, backgroundColor: '#4B5563' }}
          whileTap={{ scale: 0.98 }}
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
        </motion.button>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters sidebar */}
        <AnimatePresence>
          {(isFilterOpen || !isTouchDevice) && (
            <motion.aside
              initial={{ width: 0, opacity: 0, x: -50 }}
              animate={{ width: 'auto', opacity: 1, x: 0 }}
              exit={{ width: 0, opacity: 0, x: -50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="md:w-64 bg-gray-800 rounded-lg p-4 overflow-hidden shadow-lg border border-gray-700"
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
          <motion.div 
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.h2 
              className="text-2xl font-bold text-white mb-2 sm:mb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="relative">
                {searchQuery ? `Search: "${searchQuery}"` : (filters.category || 'All Products')}
                <motion.div 
                  className="absolute -bottom-1 left-0 h-0.5 bg-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
              </span>
              <motion.span 
                className="text-gray-400 text-lg ml-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                ({filteredProducts.length} items)
              </motion.span>
            </motion.h2>
            
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="text-gray-400 mr-2 hidden sm:inline">Sort:</span>
              <motion.select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                className="bg-gray-800 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              >
                <option value="newest">Newest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </motion.select>
            </motion.div>
          </motion.div>

          {filteredProducts.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible" // Always show products
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product, index) => (
                <motion.div 
                  key={product._id || index} 
                  variants={itemVariants}
                  custom={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 24,
                    delay: index * 0.05 // Staggered animation
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="bg-gray-800 rounded-lg p-8 text-center border border-gray-700 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h3 
                className="text-xl text-white mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                No products found
              </motion.h3>
              <motion.p 
                className="text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Try adjusting your filters or check back later for new products.
              </motion.p>
              <motion.button
                onClick={clearFilters}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05, backgroundColor: '#9333ea' }}
                whileTap={{ scale: 0.95 }}
              >
                Clear Filters
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
