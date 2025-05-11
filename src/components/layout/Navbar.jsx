'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { useCart } from '@/components/cart/CartProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch } from 'react-icons/fa';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { cart } = useCart();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const cartItemsCount = cart ? cart.reduce((count, item) => count + item.quantity, 0) : 0;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 shadow-lg' : 'bg-black/70'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/logo.png" 
              alt="DarkChemSite Logo" 
              width={198} 
              height={41} 
              className="h-10 w-auto" 
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-white hover:text-purple-400 transition-colors ${
                pathname === '/' ? 'text-purple-400' : ''
              }`}
            >
              Home
            </Link>
            
            {/* Shop Dropdown */}
            <div className="relative group">
              <button className={`text-white hover:text-purple-400 transition-colors flex items-center ${
                pathname === '/products' || pathname.includes('category') ? 'text-purple-400' : ''
              }`}>
                Shop
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link 
                  href="/products?category=Cannabinoids" 
                  className="block px-4 py-2 text-sm text-white hover:bg-gray-800"
                >
                  Cannabinoids
                </Link>
                <Link 
                  href="/products?category=Research%20Chemicals" 
                  className="block px-4 py-2 text-sm text-white hover:bg-gray-800"
                >
                  Research Chemicals
                </Link>
                <Link 
                  href="/products?category=Benzos" 
                  className="block px-4 py-2 text-sm text-white hover:bg-gray-800"
                >
                  Benzos
                </Link>
              </div>
            </div>
            
            <Link 
              href="/about" 
              className={`text-white hover:text-purple-400 transition-colors ${
                pathname === '/about' ? 'text-purple-400' : ''
              }`}
            >
              About
            </Link>
            
            <Link 
              href="/contact" 
              className={`text-white hover:text-purple-400 transition-colors ${
                pathname === '/contact' ? 'text-purple-400' : ''
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Search, Cart, and User */}
          <div className="hidden md:flex items-center space-x-6">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500 w-48"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </form>

            <Link href="/cart" className="relative text-white hover:text-purple-400">
              <FaShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className="text-white hover:text-purple-400 flex items-center space-x-1">
                  <FaUser size={20} />
                  <span className="ml-1">{user.name.split(' ')[0]}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-white hover:bg-gray-800">
                    Profile
                  </Link>
                  {user.isAdmin && (
                    <Link href="/admin" className="block px-4 py-2 text-sm text-white hover:bg-gray-800">
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/auth/login" className="text-white hover:text-purple-400">
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900"
          >
            <div className="px-4 py-3 space-y-1">
              <Link 
                href="/" 
                className={`block py-2 text-white hover:text-purple-400 ${
                  pathname === '/' ? 'text-purple-400' : ''
                }`}
              >
                Home
              </Link>
              
              {/* Shop section with subcategories */}
              <div className="py-2">
                <div className="flex items-center justify-between text-white hover:text-purple-400 cursor-pointer">
                  <span>Shop</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="pl-4 mt-1 space-y-1">
                  <Link 
                    href="/products?category=Cannabinoids" 
                    className={`block py-2 text-sm text-white hover:text-purple-400 ${
                      pathname.includes('Cannabinoids') ? 'text-purple-400' : ''
                    }`}
                  >
                    Cannabinoids
                  </Link>
                  <Link 
                    href="/products?category=Research%20Chemicals" 
                    className={`block py-2 text-sm text-white hover:text-purple-400 ${
                      pathname.includes('Research') ? 'text-purple-400' : ''
                    }`}
                  >
                    Research Chemicals
                  </Link>
                  <Link 
                    href="/products?category=Benzos" 
                    className={`block py-2 text-sm text-white hover:text-purple-400 ${
                      pathname.includes('Benzos') ? 'text-purple-400' : ''
                    }`}
                  >
                    Benzos
                  </Link>
                </div>
              </div>
              
              <Link 
                href="/about" 
                className={`block py-2 text-white hover:text-purple-400 ${
                  pathname === '/about' ? 'text-purple-400' : ''
                }`}
              >
                About
              </Link>
              
              <Link 
                href="/contact" 
                className={`block py-2 text-white hover:text-purple-400 ${
                  pathname === '/contact' ? 'text-purple-400' : ''
                }`}
              >
                Contact Us
              </Link>
              
              <form onSubmit={handleSearch} className="relative mt-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </form>
              
              <div className="border-t border-gray-800 my-4"></div>
              
              <Link href="/cart" className="flex items-center py-2 text-white hover:text-purple-400">
                <FaShoppingCart size={20} className="mr-2" />
                <span>Cart ({cartItemsCount})</span>
              </Link>
              
              {user ? (
                <>
                  <Link href="/profile" className="flex items-center py-2 text-white hover:text-purple-400">
                    <FaUser size={20} className="mr-2" />
                    <span>Profile</span>
                  </Link>
                  {user.isAdmin && (
                    <Link href="/admin" className="block py-2 text-white hover:text-purple-400">
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="flex items-center py-2 text-white hover:text-purple-400 w-full text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/auth/login" className="block py-2 text-white hover:text-purple-400">
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
