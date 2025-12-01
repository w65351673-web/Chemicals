'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/components/cart/CartProvider';
import { FaCheckCircle, FaBox, FaHome, FaClipboardList } from 'react-icons/fa';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const orderId = searchParams.get('order_id');
  
  // Use a ref to track if we've already cleared the cart
  const [cartCleared, setCartCleared] = useState(false);
  
  useEffect(() => {
    // Only clear the cart once
    if (!cartCleared) {
      clearCart();
      setCartCleared(true);
    }
    
    if (!orderId) {
      router.push('/');
      return;
    }
    
    const mockOrder = {
      _id: orderId,
      orderNumber: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      totalPrice: 79.99,
      status: 'processing',
      createdAt: new Date().toISOString()
    };
    
    setOrder(mockOrder);
    setLoading(false);
  }, [orderId, router, cartCleared]); // Remove clearCart from dependencies
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Processing your order...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-purple-600 p-6 text-center">
            <FaCheckCircle className="text-white text-5xl mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white">Order Confirmed!</h1>
            <p className="text-purple-100 mt-2">
              Thank you for your purchase. Your order has been received.
            </p>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Order Details</h2>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Order Number</p>
                    <p className="text-white font-medium">{order.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Date</p>
                    <p className="text-white font-medium">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total</p>
                    <p className="text-white font-medium">${order.totalPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Status</p>
                    <p className="text-green-400 font-medium capitalize">{order.status}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">What's Next?</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-purple-600 p-2 rounded-full mr-3 flex-shrink-0">
                    <FaBox className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Order Processing</h3>
                    <p className="text-gray-400 text-sm">
                      Your order is being processed and will be shipped soon.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-600 p-2 rounded-full mr-3 flex-shrink-0">
                    <FaClipboardList className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Order Updates</h3>
                    <p className="text-gray-400 text-sm">
                      You will receive email updates about your order status.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Link 
                href="/"
                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
              >
                <FaHome className="mr-2" />
                Continue Shopping
              </Link>
              <Link 
                href="/account/orders"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
              >
                <FaClipboardList className="mr-2" />
                View My Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
