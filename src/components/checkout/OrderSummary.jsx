'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

export default function OrderSummary({ cartItems, orderDetails }) {
  return (
    <div className="bg-bone-light border border-ink/10 rounded-editorial shadow-editorial overflow-hidden">
      <div className="p-6 border-b border-ink/10">
        <h2 className="text-xl font-serif font-medium text-ink mb-4">Order Summary</h2>

        <div className="max-h-64 overflow-y-auto mb-4">
          {cartItems.map((item) => (
            <div key={item.id || `${item.name}-${item.variant ? item.variant._id : 'default'}`} className="flex items-center py-3 border-b border-ink/5 last:border-0">
              <div className="relative h-16 w-16 rounded-editorial overflow-hidden flex-shrink-0 bg-bone-deep border border-ink/10">
                <Image
                  src={item.image || '/images/placeholder.png'}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-ink-soft font-medium text-sm">{item.name}</h3>
                <div className="flex justify-between mt-1 text-sm">
                  <p className="text-ink-muted">Qty: {item.quantity}</p>
                  <p className="text-ink-soft font-medium">€{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/cart"
          className="text-amber-dark hover:text-ink link-underline flex items-center text-sm transition-colors"
        >
          <FaShoppingCart className="mr-2" />
          Edit Cart
        </Link>
      </div>

      <div className="p-6">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-ink-muted">
            <span>Subtotal</span>
            <span className="text-ink-soft font-medium">€{orderDetails.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-ink-muted">
            <span>Shipping</span>
            <span className="text-ink-soft font-medium">
              {orderDetails.shipping > 0
                ? `€${orderDetails.shipping.toFixed(2)}`
                : 'Free'}
            </span>
          </div>
          <div className="flex justify-between text-ink-muted">
            <span>Tax</span>
            <span className="text-ink-soft font-medium">€{orderDetails.tax.toFixed(2)}</span>
          </div>

          <div className="border-t border-ink/10 my-3 pt-3">
            <div className="flex justify-between font-serif font-medium text-ink">
              <span>Total</span>
              <span className="text-xl">€{orderDetails.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
