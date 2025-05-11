'use client';

import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // In a real app, you would send this to your API
      console.log('Subscribing email:', email);
      setSubscribed(true);
      setEmail('');
      // Reset the subscribed message after 3 seconds
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold">
              DarkChem<span className="text-purple-500">Site</span>
            </Link>
            <p className="mt-4 text-gray-400">
              Premium quality research chemicals and compounds for your scientific needs.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=Cannabinoids" className="text-gray-400 hover:text-white transition-colors">
                  Cannabinoids
                </Link>
              </li>
              <li>
                <Link href="/products?category=Research%20Chemicals" className="text-gray-400 hover:text-white transition-colors">
                  Research Chemicals
                </Link>
              </li>
              <li>
                <Link href="/products?category=Stimulants" className="text-gray-400 hover:text-white transition-colors">
                  Stimulants
                </Link>
              </li>
              <li>
                <Link href="/products?category=Benzos" className="text-gray-400 hover:text-white transition-colors">
                  Benzos
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-white transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to receive updates on new products and special promotions.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 text-white rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-1"
                >
                  <FaEnvelope size={20} />
                </button>
              </div>
              {subscribed && (
                <p className="text-green-500 text-sm">Thanks for subscribing!</p>
              )}
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} DarkChemSite. All rights reserved.</p>
          <p className="mt-2 text-sm">
            For research purposes only. Not for human consumption.
          </p>
        </div>
      </div>
    </footer>
  );
}
