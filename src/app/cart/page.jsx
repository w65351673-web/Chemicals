'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaTrash, FaArrowLeft, FaLock } from 'react-icons/fa';
import { useCart } from '@/components/cart/CartProvider';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const [mounted, setMounted] = useState(false);

  // Fix hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-bone pt-24 pb-16">
        <div className="container-editorial py-8">
          <div className="max-w-2xl mx-auto text-center">
            <p className="eyebrow mb-2">Your Cart</p>
            <h1 className="text-3xl font-serif font-medium text-ink mb-6">Your Cart is Empty</h1>
            <p className="text-ink-muted mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link
              href="/products"
              className="btn-primary"
            >
              <FaArrowLeft className="mr-2" /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bone pt-24 pb-16">
      <div className="container-editorial py-8">
        <header className="mb-10">
          <p className="eyebrow mb-2">Your Cart</p>
          <h1 className="text-3xl font-serif font-medium text-ink">Shopping Cart</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-bone-light border border-ink/10 rounded-editorial overflow-hidden">
              <div className="p-4 border-b border-ink/10 bg-bone/50">
                <div className="grid grid-cols-12 gap-4 text-sm">
                  <div className="col-span-6 text-ink-soft font-medium">Product</div>
                  <div className="col-span-2 text-ink-soft font-medium text-center">Price</div>
                  <div className="col-span-2 text-ink-soft font-medium text-center">Quantity</div>
                  <div className="col-span-2 text-ink-soft font-medium text-right">Total</div>
                </div>
              </div>

              {cart.map((item, index) => (
                <div key={`${item._id || item.id || index}`} className="p-4 border-b border-ink/5 last:border-0">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Product */}
                    <div className="col-span-6">
                      <div className="flex items-center">
                        <div className="relative h-16 w-16 rounded-editorial overflow-hidden mr-4 bg-bone-deep border border-ink/10">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-ink-faint text-xs">No image</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <Link href={`/products/${item.slug || item.id}`} className="text-ink-soft hover:text-amber-dark font-medium transition-colors">
                            {item.name}
                          </Link>
                          {item.variant && (
                            <div className="text-ink-muted text-sm">
                              {item.variant.label
                                ? item.variant.label
                                : item.variant.grams
                                  ? `${item.variant.grams}g`
                                  : (item.variant.quantity ? `${item.variant.quantity}` : '')}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 text-ink-soft text-center">
                      €{item.price.toFixed(2)}
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant?._id)}
                          className="bg-bone border border-ink/10 text-ink-soft w-8 h-8 flex items-center justify-center rounded-l-[2px] hover:bg-bone-deep transition-colors disabled:opacity-40"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1, item.variant?._id)}
                          className="bg-bone text-ink text-center w-10 h-8 border-y border-ink/10 focus:outline-none focus:border-ink"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant?._id)}
                          className="bg-bone border border-ink/10 text-ink-soft w-8 h-8 flex items-center justify-center rounded-r-[2px] hover:bg-bone-deep transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="col-span-2 text-ink-soft text-right flex items-center justify-end">
                      <span className="mr-4 font-medium">€{(item.price * item.quantity).toFixed(2)}</span>
                      <button
                        onClick={() => removeFromCart(item.id, item.variant?._id, item.variant?.grams)}
                        className="text-ink-muted hover:text-red-700 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-4 flex justify-between bg-bone/50">
                <button
                  onClick={clearCart}
                  className="text-ink-muted hover:text-ink text-sm transition-colors"
                >
                  Clear Cart
                </button>
                <Link
                  href="/products"
                  className="text-amber-dark hover:text-ink flex items-center text-sm transition-colors"
                >
                  <FaArrowLeft className="mr-2" /> Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-bone-light border border-ink/10 rounded-editorial p-6 shadow-editorial">
              <h2 className="text-xl font-serif font-medium text-ink mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between text-ink-muted">
                  <span>Subtotal</span>
                  <span className="text-ink-soft font-medium">€{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-ink-muted">
                  <span>Shipping</span>
                  <span className="text-ink-soft font-medium">Calculated at checkout</span>
                </div>
                <div className="border-t border-ink/10 pt-3 flex justify-between">
                  <span className="text-lg font-serif font-medium text-ink">Total</span>
                  <span className="text-lg font-serif font-medium text-ink">€{cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full btn-primary inline-flex items-center justify-center"
              >
                <FaLock className="mr-2" /> Proceed to Checkout
              </Link>

              <div className="mt-4 text-center text-ink-muted text-xs uppercase tracking-editorial">
                <p>Secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
