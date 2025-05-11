import React from 'react';
import { FaFlask, FaLeaf, FaShieldAlt, FaTruck, FaHeadset, FaMoneyBillWave, FaClock } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">About DarkChemSite</h1>
          
          <div className="bg-gray-800 rounded-lg p-8 mb-12 shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-6">Our Mission</h2>
            <p className="text-gray-300 mb-6">
              DarkChemSite strives to have everyone leave our website satisfied and happy. We are growing every day with new products and varying quantities. However, We offer convenient, clean, affordable, efficient, friendly, safe, discreet, dependable, and simply Ideal to all our cherished customers.
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-8 mb-12 shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-6">Who We Are?</h2>
            <p className="text-gray-300">
              We are passionate believers in the healing powers of the earth's bounty. The idea that natural methods of relieving pain, stress, relaxation and enjoyment are the least invasive, and, ultimately, the most sustainable. So that others might experience the benefits of safe, effective non-pharmaceutical remedies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <FaTruck className="text-purple-500 text-3xl mr-4" />
                <h3 className="text-xl font-semibold text-white">Timely Delivery</h3>
              </div>
              <p className="text-gray-300">
                All packages are delivered just in time depending on the shipping option taken (Express or Standard).
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <FaMoneyBillWave className="text-purple-500 text-3xl mr-4" />
                <h3 className="text-xl font-semibold text-white">100% Money Back Guarantee</h3>
              </div>
              <p className="text-gray-300">
                If not satisfied with our services, your money will be return directly to you in 7 days by our financial sector.
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <FaHeadset className="text-purple-500 text-3xl mr-4" />
                <h3 className="text-xl font-semibold text-white">24x7 Online Support</h3>
              </div>
              <p className="text-gray-300">
                You'll receive friendly and knowledgeable chat from our Online services to ensure the product you purchase meets your specific needs and other issues.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <FaFlask className="text-purple-500 text-3xl mr-4" />
                <h3 className="text-xl font-semibold text-white">Quality Products</h3>
              </div>
              <p className="text-gray-300">
                Every product in our catalog undergoes rigorous testing for purity and potency. We work with certified laboratories to verify the quality of our compounds, ensuring you receive exactly what you expect.
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <FaLeaf className="text-purple-500 text-3xl mr-4" />
                <h3 className="text-xl font-semibold text-white">Natural Solutions</h3>
              </div>
              <p className="text-gray-300">
                We believe in the power of natural remedies. Our products are carefully selected to provide effective alternatives for pain relief, stress reduction, and overall wellbeing.
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <FaShieldAlt className="text-purple-500 text-3xl mr-4" />
                <h3 className="text-xl font-semibold text-white">Safe & Discreet</h3>
              </div>
              <p className="text-gray-300">
                Your privacy and security are our top priorities. We employ state-of-the-art encryption and security measures to protect your personal information and ensure a safe, discreet shopping experience.
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <FaClock className="text-purple-500 text-3xl mr-4" />
                <h3 className="text-xl font-semibold text-white">Growing Selection</h3>
              </div>
              <p className="text-gray-300">
                We are constantly expanding our product catalog with new items and varying quantities to meet the diverse needs of our customers. Check back regularly to see what's new.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-6">Ready to Experience the DarkChemSite Difference?</h2>
            <a 
              href="/products" 
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}