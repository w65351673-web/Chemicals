'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

export default function ProductCard({ product }) {
  // Get the lowest price from price variants or use the product's main price
  const lowestPrice = product.priceVariants && product.priceVariants.length > 0
    ? product.priceVariants.reduce((min, variant) => 
        variant.price < min ? variant.price : min, 
        product.priceVariants[0].price
      )
    : (product.price || 0);

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-all"
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative h-48 w-full">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500">No image</span>
            </div>
          )}
          <div className="absolute top-2 left-2">
            <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
              {product.category}
            </span>
          </div>
          {product.countInStock <= 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-lg font-semibold text-white hover:text-purple-400 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center mt-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(product.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-gray-400 text-sm ml-1">
            ({product.numReviews})
          </span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="text-white">
            <span className="font-bold text-lg">${lowestPrice.toFixed(2)}</span>
            {product.priceVariants && product.priceVariants.length > 1 && (
              <span className="text-gray-400 text-sm ml-1">and up</span>
            )}
          </div>
          
          <Link 
            href={`/products/${product.slug}`}
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-full text-sm transition-colors"
          >
            View
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
