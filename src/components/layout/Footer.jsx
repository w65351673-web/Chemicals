'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';
import Reveal, { RevealRule } from '@/components/animations/Reveal';
import { PRODUCT_CATEGORIES, categoryHref } from '@/lib/constants/categories';

const SHOP = [
  { label: 'All Products', href: '/products' },
  ...PRODUCT_CATEGORIES.map((cat) => ({ label: cat.label, href: categoryHref(cat.value) })),
];

const HOUSE = [
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Shipping Policy', href: '/shipping' },
];

const LEGAL = [
  { label: 'Privacy Policy', href: '/privacy' },
];

const SOCIAL = [
  { label: 'Instagram', href: '#', Icon: FiInstagram },
  { label: 'Twitter', href: '#', Icon: FiTwitter },
  { label: 'Facebook', href: '#', Icon: FiFacebook },
];

function LinkColumn({ title, links, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <h3 className="eyebrow">{title}</h3>
      <ul className="mt-6 space-y-3.5">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="link-underline text-[14px] text-ink-soft transition-colors duration-300 hover:text-ink"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="relative overflow-hidden border-t border-ink/10 bg-bone-light">
      <div className="container-editorial py-20 md:py-24">
        {/* Newsletter band */}
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:gap-20">
          <Reveal>
            <span className="eyebrow">The Dispatch</span>
            <h2 className="mt-5 max-w-lg text-[34px] leading-[1.08] text-ink md:text-[46px]">
              New compounds, purity reports and quiet restocks.
            </h2>
          </Reveal>

          <Reveal delay={0.12} className="flex flex-col justify-end">
            <form onSubmit={handleSubscribe} className="w-full">
              <label htmlFor="newsletter-email" className="eyebrow mb-4 block">
                Subscribe
              </label>
              <div className="flex items-center gap-4 border-b border-ink/25 pb-3 focus-within:border-ink">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full border-0 bg-transparent p-0 font-serif text-xl text-ink placeholder:text-ink-faint focus:ring-0 md:text-2xl"
                  aria-label="Email address for newsletter"
                />
                <motion.button
                  type="submit"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="shrink-0 text-ink-muted transition-colors hover:text-ink"
                  aria-label="Subscribe to newsletter"
                >
                  <FiArrowRight size={22} />
                </motion.button>
              </div>
              <p className="mt-4 h-5 text-[12px] tracking-wide text-amber-dark">
                {subscribed ? 'Thank you — you are on the list.' : ''}
              </p>
            </form>
          </Reveal>
        </div>

        <RevealRule className="my-16" />

        {/* Columns */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal>
            <Link href="/" className="font-serif text-[24px] leading-none text-ink">
              Chemicals<span className="italic text-amber-dark">Site</span>
            </Link>
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-ink-muted">
              A considered catalogue of high-purity research compounds, documented and dispatched
              with care. Supplied strictly for laboratory research.
            </p>
            <div className="mt-8 flex items-center gap-5">
              {SOCIAL.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-ink-faint transition-colors duration-300 hover:text-ink"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </Reveal>

          <LinkColumn title="Shop" links={SHOP} delay={0.08} />
          <LinkColumn title="House" links={HOUSE} delay={0.16} />
          <LinkColumn title="Legal" links={LEGAL} delay={0.24} />
        </div>

        <RevealRule className="my-14" />

        <div className="flex flex-col gap-4 text-[11px] uppercase tracking-editorial text-ink-faint md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} ChemicalsSite</p>
          <p>Discreet worldwide dispatch</p>
        </div>
      </div>
    </footer>
  );
}
