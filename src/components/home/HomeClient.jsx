'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaArrowRight, FaFlask, FaCannabis, FaPills, FaWhatsapp } from 'react-icons/fa';
import { FaTelegram } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useCart } from '@/components/cart/CartProvider';

export default function HomeClient({ featuredProducts = [] }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black relative">
      {/* WhatsApp Icon (Left) */}
      <div className="fixed left-4 bottom-24 z-50">
        <a 
          href="https://wa.me/1234567890" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#128C7E] text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
          aria-label="Contact us on WhatsApp"
        >
          <FaWhatsapp size={28} />
        </a>
      </div>
      
      {/* Telegram Icon (Right) */}
      <div className="fixed right-4 bottom-24 z-50">
        <a 
          href="https://t.me/yourusername" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#0088cc] hover:bg-[#0099dd] text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
          aria-label="Contact us on Telegram"
        >
          <FaTelegram size={28} />
        </a>
      </div>
      
      <HeroCarousel />
      <CategoriesSection />
      <FeaturedProductsSection products={featuredProducts} />
      <TestimonialsSection />
      <CallToAction />
    </main>
  );
}

// Hero Section with React Responsive Carousel
function HeroCarousel() {
  const carouselContent = [
    {
      image: '/images/GettyImages-563374209.png',
      title: 'Premium Research Chemicals',
      subtitle: 'Explore our extensive collection of high-purity compounds',
      cta: 'Shop Now',
      link: '/products'
    },
    {
      image: '/images/Laboratory-Science.jpg',
      title: 'Quality & Purity Guaranteed',
      subtitle: 'Every product undergoes rigorous testing and verification',
      cta: 'Our Standards',
      link: '/about'
    },
    {
      image: '/images/MA_0449a.webp',
      title: 'Fast & Discreet Shipping',
      subtitle: 'Secure packaging and reliable delivery worldwide',
      cta: 'Learn More',
      link: '/about'
    }
  ];

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Carousel 
          showArrows={true}
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={6000}
          transitionTime={1000}
          swipeable={true}
          emulateTouch={true}
          dynamicHeight={false}
          className="h-full"
          renderArrowPrev={(clickHandler, hasPrev) => (
            <button
              onClick={clickHandler}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-purple-600/70 text-white p-3 rounded-full transition-colors"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          renderArrowNext={(clickHandler, hasNext) => (
            <button
              onClick={clickHandler}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-purple-600/70 text-white p-3 rounded-full transition-colors"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
          renderIndicator={(clickHandler, isSelected, index) => (
            <button
              className={`w-4 h-4 mx-2 rounded-full transition-all duration-300 ${isSelected ? 'bg-purple-500 scale-110' : 'bg-white/30'}`}
              onClick={clickHandler}
              key={index}
              aria-label={`Go to slide ${index + 1}`}
            />
          )}
        >
          {carouselContent.map((slide, index) => (
            <div key={index} className="relative h-screen">
              <div className="absolute inset-0">
                <div className="relative h-full w-full">
                  <Image
                    src={slide.image}
                    alt={`DarkChemSite - ${slide.title}`}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
                {/* Enhanced overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-purple-900/30">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(128,90,213,0.2)_0%,_transparent_60%)]">
                  </div>
                </div>
              </div>
              
              {/* Slide content */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="container mx-auto px-4 text-center">
                  <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
                  >
                    {slide.title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow-md"
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <Link 
                      href={slide.link}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 transform hover:scale-105"
                    >
                      {slide.cta}
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

// Categories Section
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
              href="/products?category=cannabinoids"
              className="group bg-gradient-to-br from-purple-900/40 to-purple-600/20 p-6 rounded-xl backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-600/30 p-4 rounded-full mb-4 group-hover:bg-purple-600/50 transition-colors">
                  <FaCannabis className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Cannabinoids</h3>
                <p className="text-gray-300 mb-4">Synthetic and natural cannabinoid compounds for research</p>
                <span className="text-purple-400 flex items-center">
                  Explore <FaArrowRight className="ml-2" />
                </span>
              </div>
            </Link>
            
            {/* Benzos */}
            <Link 
              href="/products?category=benzos"
              className="group bg-gradient-to-br from-purple-900/40 to-purple-600/20 p-6 rounded-xl backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-600/30 p-4 rounded-full mb-4 group-hover:bg-purple-600/50 transition-colors">
                  <FaPills className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Benzos</h3>
                <p className="text-gray-300 mb-4">High-quality benzodiazepine compounds for laboratory use</p>
                <span className="text-purple-400 flex items-center">
                  Explore <FaArrowRight className="ml-2" />
                </span>
              </div>
            </Link>
            
            {/* Other Chemicals */}
            <Link 
              href="/products?category=other"
              className="group bg-gradient-to-br from-purple-900/40 to-purple-600/20 p-6 rounded-xl backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-600/30 p-4 rounded-full mb-4 group-hover:bg-purple-600/50 transition-colors">
                  <FaFlask className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Other Chemicals</h3>
                <p className="text-gray-300 mb-4">Specialized research compounds for scientific applications</p>
                <span className="text-purple-400 flex items-center">
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

// Featured Products Section
function FeaturedProductsSection({ products = [] }) {
  // Use the cart context
  const { addToCart } = useCart();
  
  // Function to handle adding to cart
  const handleAddToCart = (e, product) => {
    e.preventDefault(); // Prevent navigation to product page
    e.stopPropagation(); // Prevent event bubbling
    
    // Use the addToCart function from the CartProvider
    addToCart(product, 1);
  };
  
  // Function to render star ratings
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`star-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <svg key="half-star" className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#4B5563" />
            </linearGradient>
          </defs>
          <path fill="url(#half-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    // Add empty stars to make total of 5
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    return stars;
  };
  
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-4">Featured Products</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Discover our most popular research chemicals, selected for their exceptional quality and purity</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <div 
                key={product._id} 
                className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex flex-col h-full"
              >
                {/* Product Badge - Removed Featured badge */}
                
                {/* Stock indicator */}
                {product.countInStock <= 0 && (
                  <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 m-2 rounded-full z-10">
                    Out of Stock
                  </div>
                )}
                
                {/* Product Image - Clickable to product page */}
                <Link href={`/products/${product.slug}`} className="block relative h-48 w-full overflow-hidden">
                  {product.images && product.images[0] ? (
                    <Image 
                      src={product.images[0]}
                      alt={product.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                </Link>
                
                {/* Product Info */}
                <div className="p-4 flex-grow flex flex-col">
                  {/* Category */}
                  <div className="text-purple-400 text-xs font-medium uppercase mb-1">
                    {product.category}
                  </div>
                  
                  {/* Product Name */}
                  <Link href={`/products/${product.slug}`} className="block">
                    <h3 className="text-white font-semibold text-lg mb-1 hover:text-purple-400 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex mr-1">
                      {renderRating(product.rating || 0)}
                    </div>
                    <span className="text-gray-400 text-xs">
                      ({product.numReviews || 0} {product.numReviews === 1 ? 'review' : 'reviews'})
                    </span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  {/* Price and Add to Cart */}
                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-white font-bold text-xl">
                        ${typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}
                      </span>
                      
                      {product.countInStock > 0 ? (
                        <span className="text-green-400 text-xs">
                          In Stock ({product.countInStock})
                        </span>
                      ) : (
                        <span className="text-red-400 text-xs">
                          Out of Stock
                        </span>
                      )}
                    </div>
                    
                    {/* Add to Cart Button */}
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      disabled={product.countInStock <= 0}
                      className={`w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center transition-colors ${product.countInStock > 0 ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                      {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <p className="text-gray-400">No featured products available at the moment.</p>
            </div>
          )}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/products"
            className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            View All Products <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      text: "The quality of DarkChemSite's products is unmatched. Their cannabinoids have been instrumental in our research.",
      author: "Dr. J. Smith",
      role: "Research Scientist"
    },
    {
      id: 2,
      text: "Fast shipping and excellent customer service. The purity of their compounds consistently exceeds our expectations.",
      author: "L. Johnson",
      role: "Laboratory Director"
    },
    {
      id: 3,
      text: "We've been using DarkChemSite for all our research chemical needs. Their attention to detail and quality control is impressive.",
      author: "M. Williams",
      role: "Chemical Analyst"
    }
  ];
  
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-12">What Our Clients Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg"
            >
              <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
              <div>
                <p className="text-white font-semibold">{testimonial.author}</p>
                <p className="text-purple-400">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Call to Action Section
function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Ready to Elevate Your Research?</h2>
        <p className="text-gray-200 mb-8 max-w-2xl mx-auto">Join the growing community of scientists and researchers who trust DarkChemSite for premium quality chemicals.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/products"
            className="bg-white text-purple-900 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Browse Products
          </Link>
          <Link 
            href="/contact"
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
