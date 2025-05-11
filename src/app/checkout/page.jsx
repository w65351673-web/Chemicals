'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { useCart } from '@/components/cart/CartProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import { FaLock, FaShoppingCart } from 'react-icons/fa';

// Initialize Stripe
// Client-side environment variables in Next.js must be prefixed with NEXT_PUBLIC_
// For client-side code, we need to use the publishable key directly
const stripePublicKey = 'pk_test_51RNMym2XbOseLixpe4LbtlDHZWiUMxijndVUKl71ADiIFhnFLtIe12JHymNVSr8ZFLeZ5q5Jfmd0DzUt8QXthIYy003SyFOp8Q';
console.log('Using Stripe publishable key');
const stripePromise = loadStripe(stripePublicKey);

export default function CheckoutPage() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const { cart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
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
        
        // Create payment intent
        try {
          console.log('Creating payment intent...');
          const token = localStorage.getItem('token');
          console.log('Token exists:', !!token);
            
          // For testing, we've temporarily disabled authentication in the API
          // so we don't need to pass the token, but we'll keep the code structure
          // for when authentication is re-enabled
          const paymentRes = await fetch('/api/checkout/create-payment-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // We'll still send the token if it exists
              ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
            body: JSON.stringify({
              amount: Math.round(total * 100), // Convert to cents for Stripe
              currency: 'usd'
            }),
          });
          
          console.log('Payment intent response status:', paymentRes.status);
          
          const paymentData = await paymentRes.json();
          console.log('Payment data received:', paymentData);
          
          if (paymentData.clientSecret) {
            console.log('Client secret received successfully');
            setClientSecret(paymentData.clientSecret);
          } else {
            console.error('No client secret in response:', paymentData);
          }
        } catch (paymentError) {
          console.error('Error creating payment intent:', paymentError);
        }
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
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Payment Information</h2>
              
              {clientSecret ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm orderDetails={orderDetails} />
                </Elements>
              ) : (
                <div className="text-white">
                  <p className="mb-4">Payment form loading... If this message persists, there might be an issue with the Stripe integration.</p>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-300 mb-2">Debug information:</p>
                    <ul className="list-disc list-inside text-sm text-gray-400">
                      <li>Stripe key exists: {stripePublicKey ? 'Yes' : 'No'}</li>
                      <li>Client secret exists: No</li>
                      <li>Cart items: {cart.length}</li>
                    </ul>
                  </div>
                </div>
              )}
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
