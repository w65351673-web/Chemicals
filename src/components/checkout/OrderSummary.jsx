'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

export default function OrderSummary({ cartItems, orderDetails }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>
        
        <div className="max-h-64 overflow-y-auto mb-4">
          {cartItems.map((item) => (
            <div key={item.id || `${item.name}-${item.variant ? item.variant._id : 'default'}`} className="flex items-center py-3 border-b border-gray-700 last:border-0">
              <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
                <Image 
                  src={item.image || '/images/placeholder.png'} 
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-white font-medium">{item.name}</h3>
                <div className="flex justify-between mt-1">
                  <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                  <p className="text-white">€{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Link 
          href="/cart" 
          className="text-purple-400 hover:text-purple-300 flex items-center text-sm"
        >
          <FaShoppingCart className="mr-2" />
          Edit Cart
        </Link>
      </div>
      
      <div className="p-6">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-300">Subtotal</span>
            <span className="text-white">€{orderDetails.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Shipping</span>
            <span className="text-white">
              {orderDetails.shipping > 0 
                ? `€${orderDetails.shipping.toFixed(2)}` 
                : 'Free'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Tax</span>
            <span className="text-white">€{orderDetails.tax.toFixed(2)}</span>
          </div>
          
          <div className="border-t border-gray-700 my-3 pt-3">
            <div className="flex justify-between font-semibold">
              <span className="text-white">Total</span>
              <span className="text-purple-400 text-xl">€{orderDetails.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
