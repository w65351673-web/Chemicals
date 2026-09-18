'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/components/cart/CartProvider';
import { FaCheckCircle, FaBox, FaHome, FaClipboardList } from 'react-icons/fa';

function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const orderId = searchParams.get('order');

  const [cartCleared, setCartCleared] = useState(false);

  useEffect(() => {
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
      orderNumber: orderId,
      totalPrice: 0,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setOrder(mockOrder);
    setLoading(false);
  }, [orderId, router, cartCleared]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bone pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-amber border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-serif text-lg text-ink-muted">Processing your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bone pt-24 pb-16">
      <div className="container-editorial">
        <div className="max-w-3xl mx-auto bg-bone-light border border-ink/10 rounded-editorial shadow-editorial overflow-hidden">
          <div className="bg-ink p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-amber/20 flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="text-amber text-3xl" />
            </div>
            <h1 className="text-3xl font-serif font-medium text-bone-light">Order Request Sent</h1>
            <p className="text-bone-deep mt-2">
              Thank you. We have received your order request and will reply by email.
            </p>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-xl font-serif font-medium text-ink mb-4">Request Details</h2>
              <div className="bg-bone border border-ink/10 rounded-editorial p-5">
                <div className="grid grid-cols-2 gap-5 text-sm">
                  <div>
                    <p className="text-ink-muted text-xs uppercase tracking-editorial mb-1">Reference</p>
                    <p className="text-ink-soft font-medium">{order.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-ink-muted text-xs uppercase tracking-editorial mb-1">Date</p>
                    <p className="text-ink-soft font-medium">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-ink-muted text-xs uppercase tracking-editorial mb-1">Payment</p>
                    <p className="text-ink-soft font-medium">Pending instructions</p>
                  </div>
                  <div>
                    <p className="text-ink-muted text-xs uppercase tracking-editorial mb-1">Status</p>
                    <p className="text-amber-dark font-medium capitalize">{order.status}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-serif font-medium text-ink mb-4">What's Next?</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-amber/10 p-2 rounded-editorial mr-3 flex-shrink-0">
                    <FaBox className="text-amber-dark" />
                  </div>
                  <div>
                    <h3 className="text-ink-soft font-medium">Check your email</h3>
                    <p className="text-ink-muted text-sm">
                      We've emailed the order details to our team. You should receive a copy shortly.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-amber/10 p-2 rounded-editorial mr-3 flex-shrink-0">
                    <FaClipboardList className="text-amber-dark" />
                  </div>
                  <div>
                    <h3 className="text-ink-soft font-medium">Await our reply</h3>
                    <p className="text-ink-muted text-sm">
                      We'll respond within 24 hours with payment and shipping instructions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="btn-secondary"
              >
                <FaHome className="mr-2" />
                Continue Shopping
              </Link>
              <Link
                href="/account/orders"
                className="btn-primary"
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

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bone pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-amber border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-serif text-lg text-ink-muted">Loading...</p>
        </div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
