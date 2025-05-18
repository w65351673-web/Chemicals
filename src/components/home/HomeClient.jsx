'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { FaArrowRight, FaFlask, FaCannabis, FaPills, FaWhatsapp } from 'react-icons/fa';
import { FaTelegram } from 'react-icons/fa6';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useCart } from '@/components/cart/CartProvider';
import gsap from 'gsap';

// Import our custom animation components
import ParticleBackground from '@/components/animations/ParticleBackground';
import FloatingElement from '@/components/animations/FloatingElement';
import TypedText from '@/components/animations/TypedText';
import ScrollReveal from '@/components/animations/ScrollReveal';
import MoleculeAnimation from '@/components/animations/MoleculeAnimation';
import ChemicalReaction from '@/components/animations/ChemicalReaction';
import GlowingButton from '@/components/animations/GlowingButton';

export default function HomeClient({ featuredProducts = [] }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black relative">
      {/* Background Animations */}
      <ParticleBackground />
      <ChemicalReaction />
      
      {/* WhatsApp Icon (Left) */}
      <div className="fixed left-4 bottom-24 z-50">
        <FloatingElement delay={0.2} yOffset={10} glowColor="rgba(37, 211, 102, 0.6)">
          <a 
            href="https://wa.me/1234567890" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#128C7E] text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
            aria-label="Contact us on WhatsApp"
          >
            <FaWhatsapp size={28} />
          </a>
        </FloatingElement>
      </div>
      
      {/* Telegram Icon (Right) */}
      <div className="fixed right-4 bottom-24 z-50">
        <FloatingElement delay={0.3} yOffset={10} glowColor="rgba(0, 136, 204, 0.6)">
          <a 
            href="https://t.me/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#0088cc] hover:bg-[#0099dd] text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
            aria-label="Contact us on Telegram"
          >
            <FaTelegram size={28} />
          </a>
        </FloatingElement>
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const carouselRef = useRef(null);
  
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

  // Reset typing state when slide changes
  useEffect(() => {
    setIsTypingComplete(false);
  }, [currentSlide]);
  
  // Add floating molecules in the background
  useEffect(() => {
    const container = document.querySelector('.hero-container');
    if (!container) return;
    
    // Create floating molecules
    const createMolecule = () => {
      const molecule = document.createElement('div');
      molecule.className = 'absolute rounded-full bg-purple-500/20 z-10 pointer-events-none';
      
      // Random size
      const size = Math.random() * 100 + 50;
      molecule.style.width = `${size}px`;
      molecule.style.height = `${size}px`;
      
      // Random position
      molecule.style.left = `${Math.random() * 100}%`;
      molecule.style.top = `${Math.random() * 100}%`;
      
      container.appendChild(molecule);
      
      // Animate
      gsap.fromTo(molecule, 
        { 
          opacity: 0,
          scale: 0.5
        },
        { 
          opacity: 0.6,
          scale: 1,
          duration: 2,
          ease: "power2.out",
          onComplete: () => {
            // Float upward
            gsap.to(molecule, {
              y: -500 - Math.random() * 200,
              x: (Math.random() - 0.5) * 200,
              opacity: 0,
              duration: 15 + Math.random() * 10,
              ease: "power1.inOut",
              onComplete: () => {
                molecule.remove();
              }
            });
          }
        }
      );
    };
    
    // Create molecules periodically
    const interval = setInterval(() => {
      createMolecule();
    }, 2000);
    
    // Create a few molecules immediately
    for (let i = 0; i < 5; i++) {
      setTimeout(createMolecule, i * 300);
    }
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden hero-container">
      {/* Molecule Animation in Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <MoleculeAnimation />
      </div>
      
      <div className="absolute inset-0 z-0">
        <Carousel 
          ref={carouselRef}
          showArrows={true}
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={8000} // Increased to give more time for animations
          transitionTime={1000}
          swipeable={true}
          emulateTouch={true}
          dynamicHeight={false}
          className="h-full"
          onChange={(index) => setCurrentSlide(index)}
          renderArrowPrev={(clickHandler, hasPrev) => (
            <motion.button
              onClick={clickHandler}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-purple-600/70 text-white p-3 rounded-full transition-colors"
              aria-label="Previous slide"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(147, 51, 234, 0.7)' }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
          )}
          renderArrowNext={(clickHandler, hasNext) => (
            <motion.button
              onClick={clickHandler}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-purple-600/70 text-white p-3 rounded-full transition-colors"
              aria-label="Next slide"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(147, 51, 234, 0.7)' }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          )}
          renderIndicator={(clickHandler, isSelected, index) => (
            <motion.button
              className={`w-4 h-4 mx-2 rounded-full transition-all duration-300 ${isSelected ? 'bg-purple-500 scale-110' : 'bg-white/30'}`}
              onClick={clickHandler}
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          )}
        >
          {carouselContent.map((slide, index) => (
            <div key={index} className="relative h-screen">
              <div className="absolute inset-0">
                <motion.div 
                  className="relative h-full w-full"
                  initial={{ scale: 1.1, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 6 }}
                >
                  <Image
                    src={slide.image}
                    alt={`DarkChemSite - ${slide.title}`}
                    fill
                    priority
                    className="object-cover"
                  />
                </motion.div>
                {/* Enhanced overlay with gradient and animated particles */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-purple-900/30">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(128,90,213,0.2)_0%,_transparent_60%)]">
                  </div>
                </div>
              </div>
              
              {/* Slide content */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="container mx-auto px-4 text-center">
                  <AnimatePresence mode="wait">
                    {currentSlide === index && (
                      <motion.div
                        key={`slide-${index}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
                        >
                          <TypedText 
                            text={slide.title}
                            speed={30}
                            delay={300}
                            onComplete={() => setIsTypingComplete(true)}
                            className="inline-block"
                          />
                        </motion.div>
                        
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                          className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow-md"
                        >
                          {slide.subtitle}
                        </motion.p>
                        
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ 
                            opacity: isTypingComplete ? 1 : 0, 
                            scale: isTypingComplete ? 1 : 0.9,
                            y: isTypingComplete ? 0 : 10
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <GlowingButton 
                            href={slide.link}
                            className="transform hover:scale-105"
                          >
                            {slide.cta}
                          </GlowingButton>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
    <section className="py-16 bg-gray-900/50 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black/40 z-0">
        <div className="absolute inset-0 opacity-30">
          {/* This div will be animated with GSAP in useEffect */}
          <div className="categories-gradient-animation" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Browse by Category
          </h2>
        </ScrollReveal>
        
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
            {/* Cannabinoids */}
            <ScrollReveal delay={0.1} direction="left">
              <FloatingElement 
                delay={0.1} 
                yOffset={10} 
                glowColor="rgba(139, 92, 246, 0.4)"
                className="h-full"
              >
                <Link 
                  href="/products?category=cannabinoids"
                  className="group bg-gradient-to-br from-purple-900/40 to-purple-600/20 p-6 rounded-xl backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 block h-full"
                >
                  <div className="flex flex-col items-center text-center h-full">
                    <motion.div 
                      className="bg-purple-600/30 p-4 rounded-full mb-4 group-hover:bg-purple-600/50 transition-colors"
                      whileHover={{ 
                        rotate: [0, 5, -5, 0],
                        transition: { duration: 0.5, repeat: Infinity }
                      }}
                    >
                      <FaCannabis className="text-3xl text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-white mb-2">Cannabinoids</h3>
                    <p className="text-gray-300 mb-4">Synthetic and natural cannabinoid compounds for research</p>
                    <motion.span 
                      className="text-purple-400 flex items-center mt-auto"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      Explore <FaArrowRight className="ml-2" />
                    </motion.span>
                  </div>
                </Link>
              </FloatingElement>
            </ScrollReveal>
            
            {/* Benzos */}
            <ScrollReveal delay={0.2} direction="up">
              <FloatingElement 
                delay={0.2} 
                yOffset={10} 
                glowColor="rgba(139, 92, 246, 0.4)"
                className="h-full"
              >
                <Link 
                  href="/products?category=benzos"
                  className="group bg-gradient-to-br from-purple-900/40 to-purple-600/20 p-6 rounded-xl backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 block h-full"
                >
                  <div className="flex flex-col items-center text-center h-full">
                    <motion.div 
                      className="bg-purple-600/30 p-4 rounded-full mb-4 group-hover:bg-purple-600/50 transition-colors"
                      whileHover={{ 
                        rotate: [0, 5, -5, 0],
                        transition: { duration: 0.5, repeat: Infinity }
                      }}
                    >
                      <FaPills className="text-3xl text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-white mb-2">Benzos</h3>
                    <p className="text-gray-300 mb-4">High-quality benzodiazepine compounds for laboratory use</p>
                    <motion.span 
                      className="text-purple-400 flex items-center mt-auto"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      Explore <FaArrowRight className="ml-2" />
                    </motion.span>
                  </div>
                </Link>
              </FloatingElement>
            </ScrollReveal>
            
            {/* Other Chemicals */}
            <ScrollReveal delay={0.3} direction="right">
              <FloatingElement 
                delay={0.3} 
                yOffset={10} 
                glowColor="rgba(139, 92, 246, 0.4)"
                className="h-full"
              >
                <Link 
                  href="/products?category=other"
                  className="group bg-gradient-to-br from-purple-900/40 to-purple-600/20 p-6 rounded-xl backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 block h-full"
                >
                  <div className="flex flex-col items-center text-center h-full">
                    <motion.div 
                      className="bg-purple-600/30 p-4 rounded-full mb-4 group-hover:bg-purple-600/50 transition-colors"
                      whileHover={{ 
                        rotate: [0, 5, -5, 0],
                        transition: { duration: 0.5, repeat: Infinity }
                      }}
                    >
                      <FaFlask className="text-3xl text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-white mb-2">Other Chemicals</h3>
                    <p className="text-gray-300 mb-4">Specialized research compounds for scientific applications</p>
                    <motion.span 
                      className="text-purple-400 flex items-center mt-auto"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      Explore <FaArrowRight className="ml-2" />
                    </motion.span>
                  </div>
                </Link>
              </FloatingElement>
            </ScrollReveal>
          </div>
        </div>
      </div>
      
      {/* Add GSAP animation for the background gradient */}
      <style jsx global>{`
        @keyframes gradientAnimation {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        
        .categories-gradient-animation {
          position: absolute;
          inset: -50%;
          background: linear-gradient(45deg, rgba(91, 33, 182, 0.3), rgba(124, 58, 237, 0.1), rgba(139, 92, 246, 0.2), rgba(91, 33, 182, 0.3));
          background-size: 400% 400%;
          animation: gradientAnimation 15s ease infinite;
          transform: rotate(15deg);
        }
      `}</style>
    </section>
  );
}

// Featured Products Section
function FeaturedProductsSection({ products = [] }) {
  // Use the cart context
  const { addToCart } = useCart();
  const [activeProduct, setActiveProduct] = useState(null);
  const sectionRef = useRef(null);
  
  // Function to handle adding to cart with animation
  const handleAddToCart = (e, product) => {
    e.preventDefault(); // Prevent navigation to product page
    e.stopPropagation(); // Prevent event bubbling
    
    // Use the addToCart function from the CartProvider
    addToCart(product, 1);
    
    // Create a cart animation
    const button = e.currentTarget;
    const buttonRect = button.getBoundingClientRect();
    const cartIcon = document.querySelector('.cart-icon');
    
    if (cartIcon) {
      const cartRect = cartIcon.getBoundingClientRect();
      
      // Create a flying element
      const flyingElement = document.createElement('div');
      flyingElement.className = 'fixed z-50 bg-purple-600 rounded-full flex items-center justify-center text-white';
      flyingElement.style.width = '20px';
      flyingElement.style.height = '20px';
      flyingElement.style.top = `${buttonRect.top + buttonRect.height/2}px`;
      flyingElement.style.left = `${buttonRect.left + buttonRect.width/2}px`;
      flyingElement.innerHTML = '<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>';
      document.body.appendChild(flyingElement);
      
      // Animate the flying element
      gsap.to(flyingElement, {
        x: cartRect.left - buttonRect.left,
        y: cartRect.top - buttonRect.top,
        scale: 0.5,
        opacity: 0.8,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          // Remove the flying element
          flyingElement.remove();
          
          // Animate the cart icon
          gsap.fromTo(cartIcon, 
            { scale: 1 },
            { scale: 1.3, duration: 0.3, yoyo: true, repeat: 1 }
          );
        }
      });
    }
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
    <section ref={sectionRef} className="py-16 bg-black relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="products-background-animation" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-white text-center mb-4">Featured Products</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Discover our most popular research chemicals, selected for their exceptional quality and purity</p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((product, index) => (
              <ScrollReveal 
                key={product._id} 
                delay={0.1 * index} 
                direction={index % 3 === 0 ? 'left' : (index % 3 === 1 ? 'up' : 'right')}
                distance={20}
              >
                <motion.div 
                  className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex flex-col h-full"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  onHoverStart={() => setActiveProduct(product._id)}
                  onHoverEnd={() => setActiveProduct(null)}
                >
                  {/* Product Badge - Removed Featured badge */}
                  
                  {/* Stock indicator */}
                  {product.countInStock <= 0 && (
                    <motion.div 
                      className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 m-2 rounded-full z-10"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                      Out of Stock
                    </motion.div>
                  )}
                  
                  {/* Product Image - Clickable to product page */}
                  <Link href={`/products/${product.slug}`} className="block relative h-48 w-full overflow-hidden">
                    {product.images && product.images[0] ? (
                      <motion.div
                        className="w-full h-full"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Image 
                          src={product.images[0]}
                          alt={product.name}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800">
                        <span className="text-gray-400">No image available</span>
                      </div>
                    )}
                    
                    {/* Hover overlay with quick view */}
                    <motion.div 
                      className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 transition-opacity"
                      animate={{ opacity: activeProduct === product._id ? 0.6 : 0 }}
                    >
                      <span className="text-white font-medium">View Details</span>
                    </motion.div>
                  </Link>
                  
                  {/* Product Info */}
                  <div className="p-4 flex-grow flex flex-col">
                    {/* Category */}
                    <motion.div 
                      className="text-purple-400 text-xs font-medium uppercase mb-1"
                      whileHover={{ x: 3 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      {product.category}
                    </motion.div>
                    
                    {/* Product Name */}
                    <Link href={`/products/${product.slug}`} className="block">
                      <h3 className="text-white font-semibold text-lg mb-1 hover:text-purple-400 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    
                    {/* Rating */}
                    <motion.div 
                      className="flex items-center mb-2"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <div className="flex mr-1">
                        {renderRating(product.rating || 0)}
                      </div>
                      <span className="text-gray-400 text-xs">
                        ({product.numReviews || 0} {product.numReviews === 1 ? 'review' : 'reviews'})
                      </span>
                    </motion.div>
                    
                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    {/* Price and Add to Cart */}
                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-3">
                        <motion.span 
                          className="text-white font-bold text-xl"
                          whileHover={{ scale: 1.1, color: '#a855f7' }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          €{typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}
                        </motion.span>
                        
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
                      {product.countInStock > 0 ? (
                        <motion.button 
                          onClick={(e) => handleAddToCart(e, product)}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                          </svg>
                          Add to Cart
                        </motion.button>
                      ) : (
                        <button 
                          disabled
                          className="w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center bg-gray-700 text-gray-400 cursor-not-allowed"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                          </svg>
                          Out of Stock
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <p className="text-gray-400">No featured products available at the moment.</p>
            </div>
          )}
        </div>
        
        <div className="text-center mt-12">
          <GlowingButton 
            href="/products"
            className="inline-flex items-center"
          >
            View All Products <FaArrowRight className="ml-2" />
          </GlowingButton>
        </div>
      </div>
      
      {/* Background animation styles */}
      <style jsx global>{`
        .products-background-animation {
          position: absolute;
          inset: -50%;
          background: radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
          filter: blur(40px);
          opacity: 0.6;
          animation: pulse 8s ease-in-out infinite alternate;
        }
        
        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.3; }
          100% { transform: scale(1.2); opacity: 0.6; }
        }
      `}</style>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonialRef = useRef(null);
  
  const testimonials = [
    {
      id: 1,
      text: "The quality of DarkChemSite's products is unmatched. Their cannabinoids have been instrumental in our research.",
      author: "Dr. J. Smith",
      role: "Research Scientist",
      avatar: "/images/avatar-1.jpg"
    },
    {
      id: 2,
      text: "Fast shipping and excellent customer service. The purity of their compounds consistently exceeds our expectations.",
      author: "L. Johnson",
      role: "Laboratory Director",
      avatar: "/images/avatar-2.jpg"
    },
    {
      id: 3,
      text: "We've been using DarkChemSite for all our research chemical needs. Their attention to detail and quality control is impressive.",
      author: "M. Williams",
      role: "Chemical Analyst",
      avatar: "/images/avatar-3.jpg"
    },
    {
      id: 4,
      text: "The research chemicals from DarkChemSite have significantly accelerated our development process. Highly recommended.",
      author: "Dr. A. Rodriguez",
      role: "Pharmaceutical Researcher",
      avatar: "/images/avatar-4.jpg"
    },
    {
      id: 5,
      text: "Exceptional product quality and consistent results. DarkChemSite has become our trusted supplier for all laboratory needs.",
      author: "K. Chen",
      role: "Lab Manager",
      avatar: "/images/avatar-5.jpg"
    }
  ];
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  // Floating bubbles animation
  useEffect(() => {
    if (!testimonialRef.current) return;
    
    const container = testimonialRef.current;
    const createBubble = () => {
      const bubble = document.createElement('div');
      bubble.className = 'absolute rounded-full bg-purple-500/10';
      
      // Random size
      const size = Math.random() * 60 + 20;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      
      // Random position at the bottom
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.bottom = '-20px';
      
      container.appendChild(bubble);
      
      // Animate upward
      gsap.to(bubble, {
        y: -container.offsetHeight - size,
        x: (Math.random() - 0.5) * 100,
        opacity: 0,
        duration: 10 + Math.random() * 15,
        ease: 'power1.inOut',
        onComplete: () => {
          bubble.remove();
        }
      });
    };
    
    // Create bubbles periodically
    const interval = setInterval(createBubble, 1000);
    
    // Create a few bubbles immediately
    for (let i = 0; i < 10; i++) {
      setTimeout(createBubble, i * 300);
    }
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section ref={testimonialRef} className="py-16 bg-gray-900 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-white text-center mb-12">What Our Clients Say</h2>
        </ScrollReveal>
        
        {/* Desktop view - Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal 
              key={testimonial.id} 
              delay={0.1 * index}
              direction={index % 3 === 0 ? 'left' : (index % 3 === 1 ? 'up' : 'right')}
            >
              <motion.div 
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg relative overflow-hidden"
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.3)'
                }}
                transition={{ duration: 0.2 }}
              >
                {/* Quote icon */}
                <div className="absolute top-4 right-4 text-purple-500/20 text-6xl font-serif">"</div>
                
                {/* Stars */}
                <motion.div 
                  className="mb-4 flex"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 * index }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.span 
                      key={i} 
                      className="text-yellow-400 text-lg"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 * index + i * 0.1 }}
                    >
                      ★
                    </motion.span>
                  ))}
                </motion.div>
                
                {/* Testimonial text */}
                <motion.p 
                  className="text-gray-300 mb-6 italic relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 * index }}
                >
                  "{testimonial.text}"
                </motion.p>
                
                {/* Author info */}
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 * index }}
                >
                  <div className="mr-3 bg-purple-600/30 w-10 h-10 rounded-full flex items-center justify-center">
                    {testimonial.avatar ? (
                      <Image 
                        src={testimonial.avatar} 
                        alt={testimonial.author} 
                        width={40} 
                        height={40} 
                        className="rounded-full"
                      />
                    ) : (
                      <span className="text-white font-bold">{testimonial.author.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{testimonial.author}</p>
                    <p className="text-purple-400">{testimonial.role}</p>
                  </div>
                </motion.div>
                
                {/* Animated glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000 animate-glow"></div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
        
        {/* Mobile view - Carousel */}
        <div className="md:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 text-purple-500/20 text-6xl font-serif">"</div>
              
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              
              <p className="text-gray-300 mb-6 italic">"{testimonials[activeIndex].text}"</p>
              
              <div className="flex items-center">
                <div className="mr-3 bg-purple-600/30 w-10 h-10 rounded-full flex items-center justify-center">
                  {testimonials[activeIndex].avatar ? (
                    <Image 
                      src={testimonials[activeIndex].avatar} 
                      alt={testimonials[activeIndex].author} 
                      width={40} 
                      height={40} 
                      className="rounded-full"
                    />
                  ) : (
                    <span className="text-white font-bold">{testimonials[activeIndex].author.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <p className="text-white font-semibold">{testimonials[activeIndex].author}</p>
                  <p className="text-purple-400">{testimonials[activeIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Carousel dots */}
          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 mx-1 rounded-full transition-all ${index === activeIndex ? 'bg-purple-500 scale-110' : 'bg-gray-600'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Animation styles */}
      <style jsx global>{`
        @keyframes glow {
          0% { opacity: 0.5; }
          50% { opacity: 0.8; }
          100% { opacity: 0.5; }
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

// Call to Action Section
function CallToAction() {
  const ctaRef = useRef(null);
  
  // Particle animation effect
  useEffect(() => {
    if (!ctaRef.current) return;
    
    const container = ctaRef.current;
    const particles = [];
    const particleCount = 20;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full bg-white/20';
      
      // Random size
      const size = Math.random() * 8 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      container.appendChild(particle);
      particles.push(particle);
      
      // Animate each particle
      gsap.to(particle, {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        opacity: Math.random() * 0.5 + 0.3,
        duration: Math.random() * 10 + 10,
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
  }, []);
  
  return (
    <section ref={ctaRef} className="py-20 bg-gradient-to-r from-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(138,43,226,0.3)_0%,_transparent_70%)]">
          <div className="cta-pulse-animation"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <ScrollReveal>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Ready to Elevate Your Research?
          </motion.h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <motion.p 
            className="text-gray-200 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Join the growing community of scientists and researchers who trust DarkChemSite for premium quality chemicals.
          </motion.p>
        </ScrollReveal>
        
        <ScrollReveal delay={0.4}>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <GlowingButton 
                href="/products"
                className="bg-white text-purple-900 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors"
                glowColor="rgba(255, 255, 255, 0.6)"
              >
                Browse Products
              </GlowingButton>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <GlowingButton 
                href="/contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition-colors"
                glowColor="rgba(255, 255, 255, 0.4)"
              >
                Contact Us
              </GlowingButton>
            </motion.div>
          </motion.div>
        </ScrollReveal>
      </div>
      
      {/* Animation styles */}
      <style jsx global>{`
        .cta-pulse-animation {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(168, 85, 247, 0.4) 0%, transparent 70%);
          opacity: 0.6;
          animation: ctaPulse 6s ease-in-out infinite alternate;
        }
        
        @keyframes ctaPulse {
          0% { transform: scale(0.8); opacity: 0.4; }
          100% { transform: scale(1.2); opacity: 0.7; }
        }
      `}</style>
    </section>
  );
}
