'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiArrowUpRight, FiPlus } from 'react-icons/fi';
import { useCart } from '@/components/cart/CartProvider';
import Reveal, { RevealText, RevealRule } from '@/components/animations/Reveal';
import HeroEditorial from '@/components/home/HeroEditorial';
import SEOKeywords from '@/components/seo/SEOKeywords';
import { PRODUCT_CATEGORIES, categoryHref } from '@/lib/constants/categories';

const EASE = [0.22, 1, 0.36, 1];

const MARQUEE_TERMS = [
  'TESTOSTERONE ENANTHATE',
  'TRENBOLONE ACETATE',
  'OXANDROLONE',
  '1P-LSD',
  '4-ACO-DMT',
  'MESCALINE HCL',
  '2C-B',
  '3-MMC',
  '2-FDCK',
  'NANDROLONE DECANOATE',
];

const CATEGORY_COPY = {
  'anabolic steroids': {
    copy: 'Anabolic and androgenic reference compounds, assayed for identity and concentration before listing.',
    image: '/images/GettyImages-563374209.png',
  },
  'psychedelic drugs': {
    copy: 'Tryptamine, phenethylamine and lysergamide reference materials for analytical and receptor work.',
    image: '/images/MA_0449a.webp',
  },
  'research chemicals': {
    copy: 'Specialist reagents and novel compounds for method development and comparative analysis.',
    image: '/images/Laboratory-Science.jpg',
  },
};

const CATEGORIES = PRODUCT_CATEGORIES.map((cat, i) => ({
  number: String(i + 1).padStart(2, '0'),
  title: cat.label,
  href: categoryHref(cat.value),
  copy: CATEGORY_COPY[cat.value]?.copy || '',
  image: CATEGORY_COPY[cat.value]?.image || '/images/Laboratory-Science.jpg',
}));

const STANDARDS = [
  {
    title: 'Verified on arrival',
    copy: 'Each incoming batch is independently assayed before it is listed. No batch ships without a report.',
  },
  {
    title: 'Documented lineage',
    copy: 'Reference numbers tie every vial back to its analytical certificate and storage conditions.',
  },
  {
    title: 'Discreet logistics',
    copy: 'Neutral packaging, temperature-aware handling and tracked delivery across all major regions.',
  },
];

const TESTIMONIALS = [
  {
    text: 'The consistency between batches is what keeps us here. Documentation arrives before the parcel does.',
    author: 'Dr. J. Smith',
    role: 'Research Scientist',
    avatar: '/images/avatar-1.jpg',
  },
  {
    text: 'Purity has matched the stated certificate on every order we have assayed in-house.',
    author: 'L. Johnson',
    role: 'Laboratory Director',
    avatar: '/images/avatar-2.jpg',
  },
  {
    text: 'Quiet, precise and fast. Exactly what a supply partner for analytical work should be.',
    author: 'M. Williams',
    role: 'Chemical Analyst',
    avatar: '/images/avatar-3.jpg',
  },
  {
    text: 'Their catalogue depth cut our sourcing time down dramatically this year.',
    author: 'Dr. A. Rodriguez',
    role: 'Pharmaceutical Researcher',
    avatar: '/images/avatar-4.jpg',
  },
];

export default function HomeClient({ featuredProducts = [] }) {
  return (
    <div className="bg-bone">
      <SEOKeywords />
      <HeroEditorial />
      <CompoundMarquee />
      <CategoryIndex />
      <FeaturedProducts products={featuredProducts} />
      <StandardsSection />
      <Testimonials />
      <ClosingCta />
    </div>
  );
}

/* ------------------------------------------------------------------ */

function CompoundMarquee() {
  return (
    <section className="overflow-hidden border-b border-ink/10 bg-bone-light py-5">
      <div className="flex w-[200%] animate-marquee">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex w-1/2 items-center justify-around">
            {MARQUEE_TERMS.map((term) => (
              <span
                key={`${dup}-${term}`}
                className="flex items-center gap-8 whitespace-nowrap px-6 text-[11px] uppercase tracking-editorial text-ink-faint"
              >
                {term}
                <span className="h-1 w-1 rounded-full bg-amber/60" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, copy, action }) {
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
      <div>
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
        <h2 className="mt-5 max-w-2xl text-[34px] leading-[1.06] text-ink md:text-[52px]">
          <RevealText text={title} />
        </h2>
        {copy && (
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-[15px] leading-[1.75] text-ink-muted">{copy}</p>
          </Reveal>
        )}
      </div>
      {action && (
        <Reveal delay={0.2} className="md:pb-2">
          {action}
        </Reveal>
      )}
    </div>
  );
}

function CategoryIndex() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="border-b border-ink/10 py-24 md:py-32">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="The Index"
          title="Three disciplines, one standard."
          copy="Navigate the catalogue by research area. Every listing carries its own purity report, storage guidance and batch reference."
          action={
            <Link
              href="/products"
              className="link-underline inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-editorial text-ink"
            >
              View all products <FiArrowUpRight size={14} />
            </Link>
          }
        />

        <div className="mt-16 border-t border-ink/10">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.href} delay={0.06 * i}>
              <Link
                href={cat.href}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="group relative grid grid-cols-1 items-center gap-6 border-b border-ink/10 py-10 transition-colors duration-500 ease-editorial md:grid-cols-[80px_1fr_1fr_40px] md:gap-10"
              >
                <span className="font-serif text-[15px] text-ink-faint">{cat.number}</span>

                <h3 className="text-[30px] leading-none text-ink transition-transform duration-700 ease-editorial group-hover:translate-x-2 md:text-[40px]">
                  {cat.title}
                </h3>

                <p className="max-w-sm text-[14px] leading-relaxed text-ink-muted">{cat.copy}</p>

                <span className="flex items-center justify-start text-ink-faint transition-all duration-500 ease-editorial group-hover:translate-x-1 group-hover:text-ink md:justify-end">
                  <FiArrowRight size={20} />
                </span>

                {/* Hover image preview */}
                <AnimatePresence>
                  {hovered === i && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="pointer-events-none absolute right-16 top-1/2 hidden h-40 w-32 -translate-y-1/2 overflow-hidden border border-ink/10 shadow-editorial xl:block"
                    >
                      <Image
                        src={cat.image}
                        alt=""
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stars({ rating = 0 }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`Rated ${rating} of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`text-[11px] ${n <= Math.round(rating) ? 'text-amber-dark' : 'text-ink/20'}`}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function FeaturedProducts({ products = [] }) {
  const { addToCart } = useCart();

  const handleAdd = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <section className="border-b border-ink/10 bg-bone-light py-24 md:py-32">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="Selected Works"
          title="Featured compounds."
          copy="A rotating selection from the catalogue, chosen for purity, documentation and demand."
        />

        {products.length > 0 ? (
          <div className="mt-16 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <Reveal key={product._id} delay={0.07 * (i % 3)}>
                <article className="group flex h-full flex-col">
                  <Link
                    href={`/products/${product.slug}`}
                    className="relative block aspect-[4/5] w-full overflow-hidden bg-bone-dark"
                  >
                    {product.images && product.images[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-[1.1s] ease-editorial group-hover:scale-[1.05]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="text-[11px] uppercase tracking-editorial text-ink-faint">
                          No image
                        </span>
                      </div>
                    )}

                    {product.countInStock <= 0 && (
                      <span className="absolute left-4 top-4 bg-ink px-3 py-1.5 text-[10px] uppercase tracking-editorial text-bone-light">
                        Out of stock
                      </span>
                    )}

                    {product.countInStock > 0 && (
                      <motion.button
                        type="button"
                        onClick={(e) => handleAdd(e, product)}
                        whileTap={{ scale: 0.94 }}
                        className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-3 items-center justify-center bg-bone-light text-ink opacity-0 shadow-editorial transition-all duration-500 ease-editorial group-hover:translate-y-0 group-hover:opacity-100 hover:bg-ink hover:text-bone-light"
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <FiPlus size={18} />
                      </motion.button>
                    )}
                  </Link>

                  <div className="mt-6 flex flex-1 flex-col">
                    <span className="text-[10px] uppercase tracking-editorial text-ink-faint">
                      {product.category}
                    </span>

                    <h3 className="mt-3 text-[22px] leading-tight text-ink">
                      <Link
                        href={`/products/${product.slug}`}
                        className="link-underline transition-colors duration-300 hover:text-amber-dark"
                      >
                        {product.name}
                      </Link>
                    </h3>

                    <div className="mt-3 flex items-center gap-3">
                      <Stars rating={product.rating || 0} />
                      <span className="text-[11px] text-ink-faint">
                        {product.numReviews || 0} {product.numReviews === 1 ? 'review' : 'reviews'}
                      </span>
                    </div>

                    <p className="mt-4 line-clamp-2 text-[14px] leading-relaxed text-ink-muted">
                      {product.description}
                    </p>

                    <div className="mt-6 flex items-end justify-between border-t border-ink/10 pt-4">
                      <span className="font-serif text-[20px] text-ink">
                        &euro;{typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}
                      </span>
                      {product.countInStock > 0 ? (
                        <button
                          type="button"
                          onClick={(e) => handleAdd(e, product)}
                          className="link-underline text-[11px] font-medium uppercase tracking-editorial text-ink-muted transition-colors hover:text-ink"
                        >
                          Add to cart
                        </button>
                      ) : (
                        <span className="text-[11px] uppercase tracking-editorial text-ink-faint">
                          Unavailable
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mt-16 border-y border-ink/10 py-20 text-center">
            <p className="text-[14px] text-ink-muted">
              No featured compounds are on display at the moment.
            </p>
          </Reveal>
        )}

        <Reveal delay={0.1} className="mt-20 text-center">
          <Link href="/products" className="btn-secondary group">
            View the full catalogue
            <FiArrowRight
              className="ml-3 transition-transform duration-500 ease-editorial group-hover:translate-x-1"
              size={15}
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function StandardsSection() {
  return (
    <section className="border-b border-ink/10 py-24 md:py-32">
      <div className="container-editorial grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <Reveal>
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-bone-dark">
            <Image
              src="/images/Laboratory-Science.jpg"
              alt="Laboratory analysis of research compounds"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-ink/10" />
          </div>
        </Reveal>

        <div className="flex flex-col justify-center">
          <Reveal>
            <span className="eyebrow">Standards</span>
          </Reveal>
          <h2 className="mt-5 text-[34px] leading-[1.06] text-ink md:text-[48px]">
            <RevealText text="Nothing leaves" />
            <RevealText text="unverified." className="block italic text-amber-dark" delay={0.12} />
          </h2>

          <div className="mt-12">
            {STANDARDS.map((item, i) => (
              <Reveal key={item.title} delay={0.08 * i}>
                <div className="grid gap-4 border-t border-ink/10 py-8 md:grid-cols-[1fr_1.4fr] md:gap-10">
                  <h3 className="text-[19px] leading-snug text-ink">{item.title}</h3>
                  <p className="text-[14px] leading-relaxed text-ink-muted">{item.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <RevealRule />

          <Reveal delay={0.1} className="mt-10">
            <Link
              href="/about"
              className="link-underline inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-editorial text-ink"
            >
              Read our process <FiArrowUpRight size={14} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(id);
  }, []);

  const item = TESTIMONIALS[active];

  return (
    <section className="border-b border-ink/10 bg-bone-light py-24 md:py-32">
      <div className="container-editorial">
        <Reveal>
          <span className="eyebrow">Correspondence</span>
        </Reveal>

        <div className="mt-12 grid gap-14 lg:grid-cols-[1.4fr_0.6fr] lg:gap-20">
          <div className="min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={active}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <p className="text-[26px] leading-[1.35] text-ink md:text-[38px]">
                  &ldquo;{item.text}&rdquo;
                </p>
                <footer className="mt-10 flex items-center gap-4">
                  <span className="relative h-11 w-11 overflow-hidden rounded-full bg-bone-dark">
                    <Image src={item.avatar} alt={item.author} fill sizes="44px" className="object-cover" />
                  </span>
                  <span>
                    <span className="block text-[14px] text-ink">{item.author}</span>
                    <span className="block text-[11px] uppercase tracking-editorial text-ink-faint">
                      {item.role}
                    </span>
                  </span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <Reveal delay={0.1} className="flex flex-col justify-end">
            <div className="flex flex-col gap-4">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.author}
                  type="button"
                  onClick={() => setActive(i)}
                  className="group flex items-center gap-4 text-left"
                  aria-label={`Read testimonial from ${t.author}`}
                >
                  <span
                    className={`h-px transition-all duration-700 ease-editorial ${
                      i === active ? 'w-12 bg-amber-dark' : 'w-6 bg-ink/20 group-hover:w-9'
                    }`}
                  />
                  <span
                    className={`text-[12px] uppercase tracking-editorial transition-colors duration-500 ${
                      i === active ? 'text-ink' : 'text-ink-faint group-hover:text-ink-muted'
                    }`}
                  >
                    {t.author}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="paper-grain relative overflow-hidden bg-ink py-28 md:py-36">
      <div className="container-editorial relative z-10 text-center">
        <Reveal>
          <span className="text-[11px] font-medium uppercase tracking-editorial text-bone/50">
            Open Account
          </span>
        </Reveal>

        <h2 className="mx-auto mt-8 max-w-3xl text-[36px] leading-[1.05] text-bone-light md:text-[62px]">
          <RevealText text="Begin your next" />
          <RevealText text="study with us." className="block italic text-amber-light" delay={0.12} />
        </h2>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-[15px] leading-[1.75] text-bone/65">
            Join the laboratories and research groups that rely on ChemicalsSite for documented,
            high-purity compounds.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/products"
            className="inline-flex items-center rounded-editorial bg-bone-light px-7 py-3 text-[13px] font-medium uppercase tracking-[0.14em] text-ink transition-colors duration-500 ease-editorial hover:bg-amber-light"
          >
            Browse products
          </Link>
          <a
            href="mailto:info@chemicalssite.com"
            className="inline-flex items-center rounded-editorial border border-bone/30 px-7 py-3 text-[13px] font-medium uppercase tracking-[0.14em] text-bone-light transition-colors duration-500 ease-editorial hover:border-bone-light hover:bg-bone-light hover:text-ink"
          >
            Talk to us
          </a>
        </Reveal>
      </div>
    </section>
  );
}
