'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { useCart } from '@/components/cart/CartProvider';
import OrderSummary from '@/components/checkout/OrderSummary';
import { FaLock } from 'react-icons/fa';

export default function CheckoutPage() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const { cart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0
  });

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!authLoading && !isAuthenticated) {
      router.push('/login?redirect=/checkout');
      return;
    }
    
    // Process cart items
    const processCart = async () => {
      try {
        if (cart.length === 0) {
          // Redirect to cart if empty
          router.push('/cart');
          return;
        }
        
        // Calculate order details
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 100 ? 0 : 15; // Free shipping over $100
        const tax = subtotal * 0.07; // 7% tax
        const total = subtotal + shipping + tax;
        
        setOrderDetails({
          subtotal,
          shipping,
          tax,
          total
        });
      } catch (error) {
        console.error('Error processing checkout:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (!authLoading && isAuthenticated) {
      processCart();
    }
  }, [authLoading, isAuthenticated, router, cart]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Checkout</h1>
          <div className="flex items-center text-green-400">
            <FaLock className="mr-2" />
            <span>Secure Checkout</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Instructions */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Payment Instructions</h2>
              
              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6 mb-6">
                <h3 className="text-yellow-400 font-semibold text-lg mb-3">⚠️ Manual Payment Required</h3>
                <p className="text-gray-300 mb-4">
                  To complete your order, please contact us for payment instructions. We accept various payment methods including bank transfer, cryptocurrency, and other secure options.
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center">
                    <span className="bg-purple-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
                    Contact Us
                  </h3>
                  <p className="text-gray-300 mb-3">Send an email to:</p>
                  <a href="mailto:info@darkchemsite.com" className="text-purple-400 hover:text-purple-300 font-semibold text-lg">
                    info@darkchemsite.com
                  </a>
                  <p className="text-gray-400 text-sm mt-3">Include your order details and preferred payment method</p>
                </div>

                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center">
                    <span className="bg-purple-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
                    Receive Payment Instructions
                  </h3>
                  <p className="text-gray-300">
                    We'll respond within 24 hours with detailed payment instructions tailored to your preferred method.
                  </p>
                </div>

                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center">
                    <span className="bg-purple-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">3</span>
                    Complete Payment
                  </h3>
                  <p className="text-gray-300">
                    Follow the provided instructions to complete your payment securely.
                  </p>
                </div>

                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center">
                    <span className="bg-purple-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">4</span>
                    Order Confirmation
                  </h3>
                  <p className="text-gray-300">
                    Once payment is confirmed, we'll process and ship your order within 24-48 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary 
              cartItems={cart} 
              orderDetails={orderDetails}
            />
            
            <div className="mt-6 bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Need Help?</h3>
              <p className="text-gray-300 mb-4">
                If you have any questions about your order or our products, please don't hesitate to contact our customer service team.
              </p>
              <Link 
                href="/contact" 
                className="text-purple-400 hover:text-purple-300 flex items-center"
              >
                Contact Support →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
