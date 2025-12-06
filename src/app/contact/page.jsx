'use client';

import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send form data to our API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
      
      // Display success message
      toast.success(
        <div>
          <p>Message sent successfully! We'll get back to you soon.</p>
        </div>,
        { duration: 5000 }
      );
      
      console.log('Email sent successfully:', data.details);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast.error(error.message || 'Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-white mb-4">Get in Touch</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Have questions or need assistance? We're here to help. Send us a message and we'll get back to you promptly.</p>
          </motion.div>
          
          <div className="flex flex-col md:flex-row gap-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full md:w-1/3 bg-gradient-to-br from-purple-900 to-gray-800 rounded-2xl p-8 shadow-xl flex flex-col justify-center"
            >
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
                <p className="text-gray-300 mb-8">Feel free to reach out with any questions or inquiries.</p>
              </div>
              
              <div className="flex items-center mb-8">
                <div className="bg-purple-600/30 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <FaEnvelope className="text-purple-300 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-purple-300">Email</p>
                  <p className="text-white font-medium">info@darkchemsite.com</p>
                </div>
              </div>
              
              <div className="flex items-center mb-8">
                <div className="bg-green-600/30 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <FaWhatsapp className="text-green-300 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-green-300">WhatsApp</p>
                  <a 
                    href="https://wa.me/19802432914" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white font-medium hover:text-green-300 transition-colors"
                  >
                    +1 980 243 2914
                  </a>
                </div>
              </div>
              
              <div className="mt-auto pt-10 border-t border-purple-800/30">
                <p className="text-purple-200 text-sm">We typically respond within 24-48 business hours.</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full md:w-2/3 bg-gray-800/80 backdrop-blur rounded-2xl p-8 shadow-xl"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder=" "
                    className="block w-full px-4 pt-6 pb-2 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent peer"
                    required
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-purple-400"
                  >
                    Your Name
                  </label>
                </div>
                
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=" "
                    className="block w-full px-4 pt-6 pb-2 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent peer"
                    required
                  />
                  <label 
                    htmlFor="email" 
                    className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-purple-400"
                  >
                    Your Email
                  </label>
                </div>
              </div>
              
              <div className="relative">
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder=" "
                  className="block w-full px-4 pt-6 pb-2 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent peer"
                  required
                />
                <label 
                  htmlFor="subject" 
                  className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-purple-400"
                >
                  Subject
                </label>
              </div>
              
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder=" "
                  className="block w-full px-4 pt-6 pb-2 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent peer resize-none"
                  required
                ></textarea>
                <label 
                  htmlFor="message" 
                  className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-purple-400"
                >
                  Message
                </label>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold py-4 px-8 rounded-xl transition-all shadow-lg flex items-center justify-center ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
            
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-xl"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-800/50 p-6 rounded-xl hover:bg-gray-800/80 transition-colors duration-300">
                <h3 className="text-xl font-semibold text-purple-300 mb-3">What are your shipping times?</h3>
                <p className="text-gray-300">
                  We process orders within 1-2 business days. Standard shipping typically takes 3-5 business days, while express shipping options are available for faster delivery.
                </p>
              </div>
              
              <div className="bg-gray-800/50 p-6 rounded-xl hover:bg-gray-800/80 transition-colors duration-300">
                <h3 className="text-xl font-semibold text-purple-300 mb-3">Do you ship internationally?</h3>
                <p className="text-gray-300">
                  Yes, we ship to most countries worldwide. International shipping times vary depending on the destination and may take 7-14 business days.
                </p>
              </div>
              
              <div className="bg-gray-800/50 p-6 rounded-xl hover:bg-gray-800/80 transition-colors duration-300">
                <h3 className="text-xl font-semibold text-purple-300 mb-3">What payment methods do you accept?</h3>
                <p className="text-gray-300">
                  We accept major credit cards, cryptocurrency payments (Bitcoin, Ethereum), and bank transfers for larger orders.
                </p>
              </div>
              
              <div className="bg-gray-800/50 p-6 rounded-xl hover:bg-gray-800/80 transition-colors duration-300">
                <h3 className="text-xl font-semibold text-purple-300 mb-3">What is your return policy?</h3>
                <p className="text-gray-300">
                  Due to the nature of our products, we have a strict no-return policy. However, if you receive a damaged or incorrect product, please contact us within 48 hours of delivery.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
