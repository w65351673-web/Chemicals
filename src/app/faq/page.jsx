'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';

function renderAnswerWithLinks(text) {
  const emailRegex = /([\w.-]+@[\w.-]+\.\w+)/g;
  const parts = text.split(emailRegex);
  return parts.map((part, i) =>
    emailRegex.test(part) ? (
      <a key={i} href={`mailto:${part}`} className="text-amber-dark hover:text-ink link-underline">{part}</a>
    ) : (
      part
    )
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'ordering', name: 'Ordering & Payment' },
    { id: 'shipping', name: 'Shipping & Delivery' },
    { id: 'products', name: 'Products & Quality' },
    { id: 'contact', name: 'Contact & Support' },
  ];

  const faqs = [
    // Ordering & Payment
    {
      category: 'ordering',
      question: 'What payment methods do you accept?',
      answer: 'We currently accept Bitcoin only. After you submit your order request, we reply with the wallet address and exact amount in BTC. Once your payment is confirmed, your order is prepared for shipping.'
    },
    {
      category: 'ordering',
      question: 'How do I pay with Bitcoin?',
      answer: 'Add products to your cart, proceed to checkout, and send the order request. Our team will email you a Bitcoin wallet address and the exact amount to send. After the required confirmations, your order ships.'
    },
    {
      category: 'ordering',
      question: 'Do I need an account to place an order?',
      answer: 'No. You can check out as a guest. Just fill in your shipping details and send the order request from the checkout page.'
    },
    {
      category: 'ordering',
      question: 'Do you offer bulk discounts?',
      answer: 'Yes. Contact us at info@chemicalssite.com, on WhatsApp, or on Telegram with the products and quantities you need and we will provide a custom quote.'
    },

    // Shipping & Delivery
    {
      category: 'shipping',
      question: 'How much is shipping?',
      answer: 'Shipping is a flat €50 per order. The fee is added automatically at checkout. There are no additional taxes or hidden charges.'
    },
    {
      category: 'shipping',
      question: 'How long does shipping take?',
      answer: 'Orders are processed within 24–48 hours after payment confirmation. Delivery times vary by destination: Europe typically 3–7 business days, international 7–21 business days.'
    },
    {
      category: 'shipping',
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to most countries worldwide. You are responsible for knowing your local import regulations.'
    },
    {
      category: 'shipping',
      question: 'Is packaging discreet?',
      answer: 'Yes. All orders are shipped in plain, unmarked packaging with no product or company identifiers on the outside.'
    },
    {
      category: 'shipping',
      question: 'How can I track my order?',
      answer: 'Once your order ships, we email you a tracking number and carrier link so you can follow the package in real time.'
    },

    // Products & Quality
    {
      category: 'products',
      question: 'Are your products tested?',
      answer: 'Yes. Every batch is quality-controlled and supplied with documented identity and purity data. Certificates of Analysis are available on request.'
    },
    {
      category: 'products',
      question: 'What purity level are your products?',
      answer: 'Our products are typically 98% or higher purity, verified by independent analytical testing.'
    },
    {
      category: 'products',
      question: 'Are your products for human consumption?',
      answer: 'No. All products are sold as reference materials for laboratory and analytical research only. They are not intended for human or veterinary use.'
    },
    {
      category: 'products',
      question: 'How should I store the products?',
      answer: 'Store in a cool, dry place away from light and moisture. Keep containers sealed until use and follow standard laboratory safety protocols.'
    },

    // Contact & Support
    {
      category: 'contact',
      question: 'How can I contact you?',
      answer: 'You can reach us by email at info@chemicalssite.com, by WhatsApp, or by Telegram using the floating icons on the bottom-left of every page. We usually respond within 24 hours.'
    },
    {
      category: 'contact',
      question: 'Can I order by phone?',
      answer: 'We do not take phone orders. Please use the website checkout or contact us by email, WhatsApp, or Telegram for assistance.'
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-bone pt-24 pb-16">
      <div className="container-editorial max-w-5xl">
        {/* Header */}
        <header className="text-center mb-12">
          <p className="eyebrow mb-3">Support</p>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-ink mb-4">Frequently Asked Questions</h1>
          <p className="text-ink-muted text-lg max-w-2xl mx-auto">
            Quick answers about Bitcoin payments, shipping, products, and getting in touch.
          </p>
        </header>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <FaSearch className="absolute left-4 top-3.5 text-ink-muted" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bone-light border border-ink/15 text-ink rounded-editorial py-3 pl-12 pr-4 focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-colors"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-editorial text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-ink text-bone-light'
                    : 'bg-bone-light border border-ink/10 text-ink-soft hover:border-ink/30 hover:text-ink'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="border-t border-ink/10">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-ink/10"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-5 flex items-start justify-between text-left group"
                >
                  <span className="text-ink font-serif text-lg pr-6 group-hover:text-amber-dark transition-colors">{faq.question}</span>
                  <span className="mt-1 flex-shrink-0 text-ink-faint group-hover:text-ink transition-colors">
                    {openIndex === index ? (
                      <FaChevronUp className="w-4 h-4" />
                    ) : (
                      <FaChevronDown className="w-4 h-4" />
                    )}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="pb-5">
                    <p className="text-ink-muted leading-relaxed max-w-3xl">{renderAnswerWithLinks(faq.answer)}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-ink-muted text-lg">No questions found matching your search.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-4 text-amber-dark hover:text-ink link-underline text-sm"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 bg-ink text-bone-light rounded-editorial p-8 text-center">
          <h2 className="text-2xl font-serif font-medium mb-4">Still Have Questions?</h2>
          <p className="text-bone-deep mb-6 max-w-xl mx-auto">
            Can&apos;t find the answer you&apos;re looking for? Reach out by email, WhatsApp, or Telegram and we&apos;ll get back to you quickly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:info@chemicalssite.com"
              className="btn-primary"
            >
              Email Support
            </a>
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-bone text-ink px-6 py-3 rounded-editorial hover:bg-bone-deep transition-colors font-medium text-sm"
            >
              Browse Products
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { href: '/privacy', label: 'Privacy Policy' },
            { href: '/shipping', label: 'Shipping Policy' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-bone-light border border-ink/10 hover:border-ink/30 rounded-editorial p-4 text-center transition-colors"
            >
              <p className="text-ink-soft font-medium text-sm">{link.label}</p>
            </Link>
          ))}
        </div>

        {/* Back to Home */}
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="btn-secondary"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
