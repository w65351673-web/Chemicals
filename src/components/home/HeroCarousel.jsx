'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import gsap from 'gsap';
import dynamic from 'next/dynamic';

const MoleculeModel3D = dynamic(() => import('@/components/animations/MoleculeModel3D'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center" style={{ height: '300px' }}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  )
});
import MoleculeAnimation from '@/components/animations/MoleculeAnimation';
import TypedText from '@/components/animations/TypedText';
import GlowingButton from '@/components/animations/GlowingButton';

export default function HeroCarousel() {
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
      title: "Fast & Discreet Shipping",
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
      {/* 3D Molecule Model Animation */}
      <div className="absolute inset-0 z-0 opacity-70">
        <MoleculeModel3D />
      </div>
      
      {/* Classic Molecule Animation as fallback/additional layer */}
      <div className="absolute inset-0 z-0 opacity-30">
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
          interval={8000}
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
