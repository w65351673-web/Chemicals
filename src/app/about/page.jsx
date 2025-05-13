'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaFlask, FaLeaf, FaShieldAlt, FaTruck, FaHeadset, FaMoneyBillWave, FaClock } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AboutPage() {
  const containerRef = useRef(null);
  const missionRef = useRef(null);
  const whoWeAreRef = useRef(null);
  
  // Register ScrollTrigger plugin
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Create background particles
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const particles = [];
    const particleCount = 20;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full bg-purple-500/10 pointer-events-none';
      
      // Random size
      const size = Math.random() * 150 + 50;
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
        opacity: Math.random() * 0.3 + 0.1,
        duration: Math.random() * 20 + 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 5
      });
    }
    
    // Animate mission and who we are sections
    if (missionRef.current && whoWeAreRef.current) {
      gsap.from(missionRef.current, {
        scrollTrigger: {
          trigger: missionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      });
      
      gsap.from(whoWeAreRef.current, {
        scrollTrigger: {
          trigger: whoWeAreRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3
      });
    }
    
    return () => {
      particles.forEach(particle => {
        gsap.killTweensOf(particle);
        particle.remove();
      });
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24 relative overflow-hidden">
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl font-bold text-white mb-8 text-center relative inline-block w-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="relative inline-block">
              About DarkChemSite
              <motion.div 
                className="absolute -bottom-2 left-0 h-1 bg-purple-500 w-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </span>
          </motion.h1>
          
          <motion.div 
            ref={missionRef}
            className="bg-gray-800 rounded-lg p-8 mb-12 shadow-lg border border-gray-700 relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)' }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none" />
            <motion.h2 
              className="text-2xl font-semibold text-white mb-6 relative inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="relative">
                Our Mission
                <motion.div 
                  className="absolute -bottom-1 left-0 h-0.5 bg-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                />
              </span>
            </motion.h2>
            <motion.p 
              className="text-gray-300 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              DarkChemSite strives to have everyone leave our website satisfied and happy. We are growing every day with new products and varying quantities. However, We offer convenient, clean, affordable, efficient, friendly, safe, discreet, dependable, and simply Ideal to all our cherished customers.
            </motion.p>
          </motion.div>
          
          <motion.div 
            ref={whoWeAreRef}
            className="bg-gray-800 rounded-lg p-8 mb-12 shadow-lg border border-gray-700 relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)' }}
          >
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full -ml-20 -mb-20 blur-2xl pointer-events-none" />
            <motion.h2 
              className="text-2xl font-semibold text-white mb-6 relative inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <span className="relative">
                Who We Are?
                <motion.div 
                  className="absolute -bottom-1 left-0 h-0.5 bg-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                />
              </span>
            </motion.h2>
            <motion.p 
              className="text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              We are passionate believers in the healing powers of the earth's bounty. The idea that natural methods of relieving pain, stress, relaxation and enjoyment are the least invasive, and, ultimately, the most sustainable. So that others might experience the benefits of safe, effective non-pharmaceutical remedies.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {[
              {
                icon: <FaTruck className="text-purple-500 text-3xl mr-4" />,
                title: "Timely Delivery",
                description: "All packages are delivered just in time depending on the shipping option taken (Express or Standard)."
              },
              {
                icon: <FaMoneyBillWave className="text-purple-500 text-3xl mr-4" />,
                title: "100% Money Back Guarantee",
                description: "If not satisfied with our services, your money will be return directly to you in 7 days by our financial sector."
              },
              {
                icon: <FaHeadset className="text-purple-500 text-3xl mr-4" />,
                title: "24x7 Online Support",
                description: "You'll receive friendly and knowledgeable chat from our Online services to ensure the product you purchase meets your specific needs and other issues."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 + (index * 0.2) }}
                whileHover={{ y: -10, boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.4)' }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full -mr-12 -mt-12 blur-xl pointer-events-none" />
                <motion.div 
                  className="flex items-center mb-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 + (index * 0.2) }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 15, 
                      delay: 1 + (index * 0.2) 
                    }}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                </motion.div>
                <motion.p 
                  className="text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.1 + (index * 0.2) }}
                >
                  {item.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            {[
              {
                icon: <FaFlask className="text-purple-500 text-3xl mr-4" />,
                title: "Quality Products",
                description: "Every product in our catalog undergoes rigorous testing for purity and potency. We work with certified laboratories to verify the quality of our compounds, ensuring you receive exactly what you expect."
              },
              {
                icon: <FaLeaf className="text-purple-500 text-3xl mr-4" />,
                title: "Natural Solutions",
                description: "We believe in the power of natural remedies. Our products are carefully selected to provide effective alternatives for pain relief, stress reduction, and overall wellbeing."
              },
              {
                icon: <FaShieldAlt className="text-purple-500 text-3xl mr-4" />,
                title: "Safe & Discreet",
                description: "Your privacy and security are our top priorities. We employ state-of-the-art encryption and security measures to protect your personal information and ensure a safe, discreet shopping experience."
              },
              {
                icon: <FaClock className="text-purple-500 text-3xl mr-4" />,
                title: "Growing Selection",
                description: "We are constantly expanding our product catalog with new items and varying quantities to meet the diverse needs of our customers. Check back regularly to see what's new."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.2 + (index * 0.15) }}
                whileHover={{ y: -10, boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.4)' }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full -mr-12 -mt-12 blur-xl pointer-events-none" />
                <motion.div 
                  className="flex items-center mb-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 + (index * 0.15) }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 15, 
                      delay: 1.5 + (index * 0.15) 
                    }}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                </motion.div>
                <motion.p 
                  className="text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.6 + (index * 0.15) }}
                >
                  {item.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 rounded-xl blur-3xl -z-10 opacity-50" />
            <motion.h2 
              className="text-2xl font-semibold text-white mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 2 }}
            >
              Ready to Experience the DarkChemSite Difference?
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href="/products" 
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors relative overflow-hidden group"
              >
                <span className="relative z-10">Shop Now</span>
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-600 to-purple-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
                <div className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}