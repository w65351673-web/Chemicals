'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { useCart } from '@/components/cart/CartProvider';
import OrderSummary from '@/components/checkout/OrderSummary';
import { FaLock, FaEnvelope, FaWhatsapp, FaTelegram, FaArrowLeft } from 'react-icons/fa';

function generateOrderRef() {
  return 'ORD-' + Math.random().toString(36).slice(2, 8).toUpperCase();
}

export default function CheckoutPage() {
  const { user } = useAuth();
  const { cart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0
  });
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'bitcoin',
    orderChannel: 'email',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const processCart = async () => {
      try {
        if (cart.length === 0) {
          router.push('/cart');
          return;
        }

        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = 50;
        const tax = 0;
        const total = subtotal + shipping + tax;

        setOrderDetails({ subtotal, shipping, tax, total });
      } catch (error) {
        console.error('Error processing checkout:', error);
      } finally {
        setLoading(false);
      }
    };

    processCart();
  }, [router, cart]);

  useEffect(() => {
    if (user?.email) {
      setForm((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = 'Full name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email';
    if (!form.street.trim()) next.street = 'Street address is required';
    if (!form.city.trim()) next.city = 'City is required';
    if (!form.postalCode.trim()) next.postalCode = 'Postal code is required';
    if (!form.country.trim()) next.country = 'Country is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError('');
    const orderRef = generateOrderRef();

    try {
      const response = await fetch('/api/orders/email-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderRef,
          buyer: {
            fullName: form.fullName,
            email: form.email,
            phone: form.phone,
          },
          shipping: {
            street: form.street,
            city: form.city,
            postalCode: form.postalCode,
            country: form.country,
          },
          paymentMethod: form.paymentMethod,
          orderChannel: form.orderChannel,
          items: cart.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          totals: orderDetails,
          notes: form.notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong while sending the order.');
      }

      if (form.orderChannel === 'whatsapp' || form.orderChannel === 'telegram') {
        openChatOrder(orderRef);
      }

      router.push(`/checkout/success?order=${orderRef}`);
    } catch (error) {
      console.error('Order submission error:', error);
      setSubmitError(error.message || 'Could not send the order. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bone pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-amber border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-serif text-lg text-ink-muted">Loading checkout...</p>
        </div>
      </div>
    );
  }

  const inputClass = (field) =>
    `w-full bg-bone border ${errors[field] ? 'border-red-400' : 'border-ink/10'} rounded-editorial px-4 py-3 text-ink placeholder:text-ink-faint focus:outline-none focus:border-amber transition-colors`;

  const buildOrderMessage = (orderRef) => {
    const itemLines = cart
      .map((item, i) => `${i + 1}. ${item.name} x${item.quantity} — €${item.price.toFixed(2)}`)
      .join('\n');

    return [
      `New Order: ${orderRef}`,
      '',
      `Name: ${form.fullName}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || 'N/A'}`,
      '',
      'Shipping Address:',
      form.street,
      `${form.city}, ${form.postalCode}`,
      form.country,
      '',
      'Items:',
      itemLines,
      '',
      `Subtotal: €${orderDetails.subtotal.toFixed(2)}`,
      `Shipping: €${orderDetails.shipping.toFixed(2)}`,
      `Total: €${orderDetails.total.toFixed(2)}`,
      '',
      `Payment: ${form.paymentMethod}`,
      form.notes ? `Notes: ${form.notes}` : '',
    ].join('\n');
  };

  const openChatOrder = (orderRef) => {
    const message = encodeURIComponent(buildOrderMessage(orderRef));
    const url =
      form.orderChannel === 'whatsapp'
        ? `https://wa.me/19062613088?text=${message}`
        : `https://t.me/+19102279379`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const channelLabel = (channel) => {
    switch (channel) {
      case 'whatsapp': return 'WhatsApp';
      case 'telegram': return 'Telegram';
      default: return 'Email';
    }
  };

  const channelDescription = {
    email: "We'll email the order details to our team and reply with payment instructions.",
    whatsapp: "We'll open WhatsApp with your order details pre-filled. Send the message to confirm.",
    telegram: "We'll open Telegram so you can send your order details directly.",
  };

  return (
    <div className="min-h-screen bg-bone pt-24 pb-16">
      <div className="container-editorial">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <header>
            <p className="eyebrow mb-1">Checkout</p>
            <h1 className="text-3xl font-serif font-medium text-ink">Place Your Order</h1>
          </header>
          <div className="flex items-center text-green-700 text-sm font-medium">
            <FaLock className="mr-2" />
            <span>SSL Encrypted</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-bone-light border border-ink/10 rounded-editorial shadow-editorial p-6 lg:p-8">
              <div className="bg-amber-wash border border-amber/20 rounded-editorial p-4 mb-6">
                <h3 className="text-amber-dark font-medium text-base mb-1">
                  How would you like to send your order?
                </h3>
                <p className="text-ink-soft text-sm mb-4">
                  {channelDescription[form.orderChannel]}
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {['email', 'whatsapp', 'telegram'].map((channel) => (
                    <button
                      key={channel}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, orderChannel: channel }))}
                      className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                        form.orderChannel === channel
                          ? 'bg-ink text-bone-light border-ink'
                          : 'bg-bone text-ink border-ink/10 hover:border-amber'
                      }`}
                    >
                      {channel === 'email' && <FaEnvelope />}
                      {channel === 'whatsapp' && <FaWhatsapp />}
                      {channel === 'telegram' && <FaTelegram />}
                      {channelLabel(channel)}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-ink mb-1.5">
                      Full name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={form.fullName}
                      onChange={handleChange}
                      className={inputClass('fullName')}
                      placeholder="John Doe"
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass('email')}
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-ink mb-1.5">
                    Phone <span className="text-ink-faint">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass('phone')}
                    placeholder="+1 234 567 890"
                  />
                </div>

                <div className="border-t border-ink/10 pt-5">
                  <h3 className="text-lg font-serif font-medium text-ink mb-4">Shipping Address</h3>
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="street" className="block text-sm font-medium text-ink mb-1.5">
                        Street address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="street"
                        name="street"
                        type="text"
                        value={form.street}
                        onChange={handleChange}
                        className={inputClass('street')}
                        placeholder="123 Main Street, Apt 4B"
                      />
                      {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-ink mb-1.5">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="city"
                          name="city"
                          type="text"
                          value={form.city}
                          onChange={handleChange}
                          className={inputClass('city')}
                          placeholder="New York"
                        />
                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                      </div>

                      <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-ink mb-1.5">
                          Postal code <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="postalCode"
                          name="postalCode"
                          type="text"
                          value={form.postalCode}
                          onChange={handleChange}
                          className={inputClass('postalCode')}
                          placeholder="10001"
                        />
                        {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-ink mb-1.5">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="country"
                        name="country"
                        type="text"
                        value={form.country}
                        onChange={handleChange}
                        className={inputClass('country')}
                        placeholder="United States"
                      />
                      {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                    </div>
                  </div>
                </div>

                <div className="border-t border-ink/10 pt-5">
                  <h3 className="text-lg font-serif font-medium text-ink mb-4">Payment Method</h3>
                  <div className="rounded-editorial border border-amber/20 bg-amber-wash p-5 flex items-start gap-4">
                    <svg
                      className="w-10 h-10 text-amber-dark flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M23.638 14.902c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.24 14.9.358c6.43 1.605 10.342 8.115 8.738 14.544zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.52 2.1c-.347-.087-.7-.167-1.053-.25l.53-2.12-1.32-.33-.54 2.15c-.285-.065-.57-.13-.847-.2l-1.815-.45-.35 1.4s.975.22.958.235c.534.13.63.48.615.758l-.615 2.46c.037.01.085.025.138.05l-.14-.035-.86 3.45c-.066.16-.23.4-.61.31.014.02-.96-.24-.96-.24l-.66 1.5 1.715.43c.32.08.63.17.94.25l-.55 2.18 1.32.33.54-2.16c.36.1.71.18 1.05.26l-.53 2.14 1.32.33.55-2.18c2.24.42 3.93.25 4.64-1.77.57-1.63-.03-2.56-1.16-3.17.83-.19 1.45-.74 1.62-1.88zm-2.86 4.1c-.41 1.63-3.16.75-4.05.53l.72-2.9c.9.22 3.78.66 3.33 2.37zm.4-4.16c-.37 1.5-2.68.74-3.43.56l.66-2.63c.75.19 3.15.54 2.77 2.07z"/>
                    </svg>
                    <div>
                      <p className="font-medium text-ink">We accept only Bitcoin</p>
                      <p className="text-sm text-ink-muted mt-1">
                        Payment instructions are sent after we receive your order request.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-ink mb-1.5">
                    Order notes / questions <span className="text-ink-faint">(optional)</span>
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={form.notes}
                    onChange={handleChange}
                    className={inputClass('notes')}
                    placeholder="Any special instructions or questions..."
                  />
                </div>

                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-editorial p-4 text-sm text-red-700">
                    {submitError}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                  <Link
                    href="/cart"
                    className="text-amber-dark hover:text-ink flex items-center text-sm transition-colors"
                  >
                    <FaArrowLeft className="mr-2" /> Back to cart
                  </Link>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Sending...' : form.orderChannel === 'email' ? 'Send Order Request' : `Open ${channelLabel(form.orderChannel)}`}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <OrderSummary cartItems={cart} orderDetails={orderDetails} />

            <div className="mt-6 bg-bone-light border border-ink/10 rounded-editorial shadow-editorial p-6">
              <h3 className="text-lg font-serif font-medium text-ink mb-4">What happens next?</h3>
              <ol className="space-y-3 text-sm text-ink-muted list-decimal list-inside">
                {form.orderChannel === 'email' ? (
                  <>
                    <li>We receive your order request by email.</li>
                    <li>We reply with a Bitcoin wallet address and the exact amount.</li>
                    <li>Once your Bitcoin payment is confirmed, your order ships.</li>
                  </>
                ) : (
                  <>
                    <li>Your order details are opened in {channelLabel(form.orderChannel)}.</li>
                    <li>Send the pre-filled message to confirm your order.</li>
                    <li>We reply with a Bitcoin wallet address and shipping details.</li>
                  </>
                )}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
