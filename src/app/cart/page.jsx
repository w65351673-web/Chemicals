'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaTrash, FaArrowLeft, FaLock } from 'react-icons/fa';
import { useCart } from '@/components/cart/CartProvider';
import { useAuth } from '@/components/auth/AuthProvider';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Fix hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      router.push('/auth/login?redirect=checkout');
    } else {
      router.push('/checkout');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-white mb-6">Your Cart is Empty</h1>
            <p className="text-gray-400 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link 
              href="/products" 
              className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              <FaArrowLeft className="mr-2" /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-700">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6 text-white font-semibold">Product</div>
                  <div className="col-span-2 text-white font-semibold text-center">Price</div>
                  <div className="col-span-2 text-white font-semibold text-center">Quantity</div>
                  <div className="col-span-2 text-white font-semibold text-right">Total</div>
                </div>
              </div>

              {cart.map((item, index) => (
                <div key={`${item._id || item.id || index}`} className="p-4 border-b border-gray-700">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Product */}
                    <div className="col-span-6">
                      <div className="flex items-center">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden mr-4">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
                              <span className="text-gray-500 text-xs">No image</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <Link href={`/products/${item.slug || item.id}`} className="text-white hover:text-purple-400 font-medium">
                            {item.name}
                          </Link>
                          {item.variant && (
                            <div className="text-gray-400 text-sm">
                              {item.variant.quantity}g
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 text-white text-center">
                      ${item.price.toFixed(2)}
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant?._id)}
                          className="bg-gray-700 text-white w-8 h-8 flex items-center justify-center rounded-l-md"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1, item.variant?._id)}
                          className="bg-gray-700 text-white text-center w-10 h-8 border-0"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant?._id)}
                          className="bg-gray-700 text-white w-8 h-8 flex items-center justify-center rounded-r-md"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="col-span-2 text-white text-right flex items-center justify-end">
                      <span className="mr-4">${(item.price * item.quantity).toFixed(2)}</span>
                      <button
                        onClick={() => removeFromCart(item.id, item.variant?._id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-4 flex justify-between">
                <button
                  onClick={clearCart}
                  className="text-gray-400 hover:text-white"
                >
                  Clear Cart
                </button>
                <Link 
                  href="/products" 
                  className="text-purple-400 hover:text-purple-300 flex items-center"
                >
                  <FaArrowLeft className="mr-2" /> Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-white">Calculated at checkout</span>
                </div>
                <div className="border-t border-gray-700 pt-3 flex justify-between">
                  <span className="text-lg font-semibold text-white">Total</span>
                  <span className="text-lg font-semibold text-white">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center"
              >
                <FaLock className="mr-2" /> Proceed to Checkout
              </motion.button>

              <div className="mt-4 text-center text-gray-400 text-sm">
                <p>Secure checkout powered by Stripe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
