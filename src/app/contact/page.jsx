'use client';

import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
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
    
    // Simulate form submission
    try {
      // In a real application, you would send this data to your API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">Contact Us</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col items-center text-center">
              <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <FaEnvelope className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
              <p className="text-gray-300">support@darkchemsite.com</p>
              <p className="text-gray-300">info@darkchemsite.com</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col items-center text-center">
              <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <FaPhone className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Phone</h3>
              <p className="text-gray-300">+1 (555) 123-4567</p>
              <p className="text-gray-300">Mon-Fri: 9am - 5pm EST</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col items-center text-center">
              <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <FaMapMarkerAlt className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Location</h3>
              <p className="text-gray-300">123 Chemical Lane</p>
              <p className="text-gray-300">Research City, RC 12345</p>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-6">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white mb-2">
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-700 text-white rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-white mb-2">
                    Your Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-700 text-white rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-white mb-2">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-gray-700 text-white rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="bg-gray-700 text-white rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                ></textarea>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center ${
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
            
            <div className="mt-8 text-gray-400 text-sm">
              <p>
                * We typically respond to inquiries within 24-48 business hours. For urgent matters, please contact us by phone.
              </p>
            </div>
          </div>
          
          <div className="mt-12 bg-gray-800 rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">What are your shipping times?</h3>
                <p className="text-gray-300">
                  We process orders within 1-2 business days. Standard shipping typically takes 3-5 business days, while express shipping options are available for faster delivery.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Do you ship internationally?</h3>
                <p className="text-gray-300">
                  Yes, we ship to most countries worldwide. International shipping times vary depending on the destination and may take 7-14 business days.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-300">
                  We accept major credit cards, cryptocurrency payments (Bitcoin, Ethereum), and bank transfers for larger orders.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">What is your return policy?</h3>
                <p className="text-gray-300">
                  Due to the nature of our products, we have a strict no-return policy. However, if you receive a damaged or incorrect product, please contact us within 48 hours of delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
