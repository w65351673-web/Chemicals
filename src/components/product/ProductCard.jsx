'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaShoppingCart, FaEye } from 'react-icons/fa';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Ensure product is defined to prevent errors
  if (!product) {
    console.error('ProductCard received undefined product');
    return null;
  }
  
  // Get the lowest price from price variants or use the product's main price
  const lowestPrice = product.priceVariants && product.priceVariants.length > 0
    ? product.priceVariants.reduce((min, variant) => 
        variant.price < min ? variant.price : min, 
        product.priceVariants[0]?.price || 0
      )
    : (product.price || 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -8,
        boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.4)'
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
    >
      <div className="relative h-48 w-full overflow-hidden cursor-pointer" onClick={() => window.location.href = `/products/${product.slug || product._id}`}>
          {product.images && product.images.length > 0 ? (
            <motion.div
              animate={{
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ duration: 0.4 }}
              className="h-full w-full"
            >
              <Image
                src={product.images[0]}
                alt={product.name || 'Product image'}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = '/images/placeholder.jpg';
                }}
              />
            </motion.div>
          ) : (
            <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500">No image</span>
            </div>
          )}
          
          {/* Category badge with animation */}
          <motion.div 
            className="absolute top-2 left-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.span 
              className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full inline-block"
              whileHover={{ scale: 1.05, backgroundColor: '#9333ea' }}
            >
              {product.category}
            </motion.span>
          </motion.div>
          
          {/* Out of stock overlay */}
          {product.countInStock <= 0 && (
            <motion.div 
              className="absolute inset-0 bg-black/70 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.span 
                className="text-white font-bold text-lg"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 10 
                }}
              >
                Out of Stock
              </motion.span>
            </motion.div>
          )}
          
          {/* Hover overlay with quick actions */}
          <motion.div 
            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="flex space-x-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: isHovered ? 0 : 20, 
                opacity: isHovered ? 1 : 0 
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Link 
                href={`/products/${product.slug || product._id}`}
                className="bg-white text-purple-600 p-2 rounded-full hover:bg-purple-600 hover:text-white transition-colors duration-300"
              >
                <FaEye size={18} />
              </Link>
              
              {(product.countInStock > 0 || product.countInStock === undefined) && (
                <Link 
                  href={`/products/${product.slug || product._id}`}
                  className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors duration-300"
                >
                  <FaShoppingCart size={18} />
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>

      <div className="p-4">
        <Link href={`/products/${product.slug || product._id}`}>
          <motion.h3 
            className="text-lg font-semibold text-white hover:text-purple-400 transition-colors line-clamp-1"
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {product.name || 'Unnamed Product'}
          </motion.h3>
        </Link>

        {/* Star rating with animation */}
        <motion.div 
          className="flex items-center mt-1 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
              >
                <FaStar
                  className={`w-4 h-4 ${
                    i < Math.round(product.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-600'
                  }`}
                />
              </motion.div>
            ))}
          </div>
          <span className="text-gray-400 text-sm ml-1">
            ({product.numReviews})
          </span>
        </motion.div>

        {/* Price and action button */}
        <motion.div 
          className="flex items-center justify-between mt-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div 
            className="text-white"
            whileHover={{ scale: 1.05 }}
          >
            <span className="font-bold text-lg">${lowestPrice.toFixed(2)}</span>
            {product.priceVariants && product.priceVariants.length > 1 && (
              <span className="text-gray-400 text-sm ml-1">and up</span>
            )}
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href={`/products/${product.slug || product._id}`}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-full text-sm transition-colors flex items-center"
            >
              <span>View</span>
              <motion.span 
                className="ml-1"
                animate={{ x: isHovered ? 3 : 0 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/0 via-purple-600/0 to-purple-600/0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-lg blur-xl"></div>
      </div>
    </motion.div>
  );
}
