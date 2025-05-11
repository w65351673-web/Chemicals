'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaArrowRight, FaFlask, FaCannabis, FaPills, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Client-side Components
function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    '/images/GettyImages-563374209.png',
    '/images/Laboratory-Science.jpg',
    '/images/MA_0449a.webp'
  ];
  
  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Image Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentSlide]}
              alt="DarkChemSite Banner"
              fill
              priority
              className="object-cover"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black/90 to-black/30"></div>
          </motion.div>
        </AnimatePresence>
        
        {/* Carousel Controls */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors"
          aria-label="Previous slide"
        >
          <FaChevronLeft />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors"
          aria-label="Next slide"
        >
          <FaChevronRight />
        </button>
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-purple-500' : 'bg-white/50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          Premium Quality <span className="text-purple-500">Research Chemicals</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Explore our extensive collection of high-purity compounds for your research needs.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link 
            href="/products" 
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Shop Now
          </Link>
          <Link 
            href="/about" 
            className="bg-transparent border border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors"
          >
            Learn More
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section className="py-16 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Browse by Category
        </h2>
        
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
            {/* Cannabinoids */}
            <Link 
              href="/products?category=Cannabinoids"
              className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 transition-all transform hover:scale-105 hover:shadow-purple-500/20 hover:shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-600/20 p-4 rounded-full mb-4">
                  <FaCannabis className="text-purple-500 text-4xl" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Cannabinoids</h3>
                <p className="text-gray-400 mb-4">Synthetic and natural cannabinoid compounds.</p>
                <span className="text-purple-400 inline-flex items-center">
                  Explore <FaArrowRight className="ml-2" />
                </span>
              </div>
            </Link>
            
            {/* Research Chemicals */}
            <Link 
              href="/products?category=Research%20Chemicals"
              className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 transition-all transform hover:scale-105 hover:shadow-purple-500/20 hover:shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-600/20 p-4 rounded-full mb-4">
                  <FaFlask className="text-purple-500 text-4xl" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Research Chemicals</h3>
                <p className="text-gray-400 mb-4">Novel compounds for scientific research.</p>
                <span className="text-purple-400 inline-flex items-center">
                  Explore <FaArrowRight className="ml-2" />
                </span>
              </div>
            </Link>
            
            {/* Benzos */}
            <Link 
              href="/products?category=Benzos"
              className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 transition-all transform hover:scale-105 hover:shadow-purple-500/20 hover:shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-600/20 p-4 rounded-full mb-4">
                  <FaPills className="text-purple-500 text-4xl" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Benzos</h3>
                <p className="text-gray-400 mb-4">High-quality benzodiazepine analogs.</p>
                <span className="text-purple-400 inline-flex items-center">
                  Explore <FaArrowRight className="ml-2" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Client Component Wrapper
export default function HomePage({ products }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <HeroCarousel />
      <CategoriesSection />
      <FeaturedProducts products={products} />
    </main>
  );
}

function FeaturedProducts({ products }) {
  if (!products || products.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-white">Featured Products</h2>
            <Link 
              href="/products" 
              className="text-purple-400 hover:text-purple-300 inline-flex items-center"
            >
              View All <FaArrowRight className="ml-2" />
            </Link>
          </div>
          
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No featured products available at this time.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-white">Featured Products</h2>
          <Link 
            href="/products" 
            className="text-purple-400 hover:text-purple-300 inline-flex items-center"
          >
            View All <FaArrowRight className="ml-2" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link 
              key={product._id} 
              href={`/products/${product.slug}`}
              className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-purple-500/20 transition-all transform hover:scale-[1.02]"
            >
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
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white hover:text-purple-400 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                      >★</span>
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm ml-1">({product.numReviews})</span>
                </div>
                <div className="mt-3 text-purple-400 font-bold">
                  {product.priceVariants && product.priceVariants.length > 0 ? (
                    <>
                      ${product.priceVariants[0].price.toFixed(2)}
                      {product.priceVariants.length > 1 && <span className="text-gray-400 text-sm ml-1">and up</span>}
                    </>
                  ) : (
                    'Price not available'
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
