'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { RevealText } from '@/components/animations/Reveal';

const EASE = [0.22, 1, 0.36, 1];

const SLIDES = [
  {
    image: '/images/Laboratory-Science.jpg',
    caption: 'Batch 24-A / Purity 99.4%',
    label: 'Analytical verification',
  },
  {
    image: '/images/GettyImages-563374209.png',
    caption: 'Cold-chain handling',
    label: 'Controlled storage',
  },
  {
    image: '/images/MA_0449a.webp',
    caption: 'Discreet worldwide dispatch',
    label: 'Logistics',
  },
];

const STATS = [
  { value: '3', label: 'Research categories' },
  { value: '99.4%', label: 'Average verified purity' },
  { value: '48h', label: 'Typical dispatch window' },
];

export default function HeroEditorial() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 6000);
    return () => clearInterval(id);
  }, []);

  const slide = SLIDES[index];

  return (
    <section className="paper-grain relative overflow-hidden border-b border-ink/10 bg-bone">
      <div className="container-editorial relative z-10 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="grid items-end gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* Editorial copy */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="flex items-center gap-4"
            >
              <span className="h-px w-10 origin-left animate-line-grow bg-amber" />
              <span className="eyebrow">Est. Research Supply</span>
            </motion.div>

            <h1 className="mt-8 text-[13vw] leading-[0.92] tracking-tight text-ink sm:text-[64px] md:text-[78px] lg:text-[86px]">
              <RevealText text="Precision" className="block" delay={0.1} />
              <RevealText
                text="in every"
                className="block"
                delay={0.22}
              />
              <RevealText
                text="milligram."
                className="block italic text-amber-dark"
                delay={0.34}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
              className="mt-9 max-w-md text-[15px] leading-[1.75] text-ink-muted"
            >
              A quietly curated catalogue of high-purity compounds — anabolic steroids,
              psychedelic drugs and research chemicals — each batch documented, tested and
              dispatched discreetly to laboratories worldwide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
              className="mt-11 flex flex-wrap items-center gap-4"
            >
              <Link href="/products" className="btn-primary group">
                Browse the catalogue
                <FiArrowRight
                  className="ml-3 transition-transform duration-500 ease-editorial group-hover:translate-x-1"
                  size={15}
                />
              </Link>
              <Link href="/about" className="btn-secondary">
                Our standards
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.85, ease: EASE }}
              className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-ink/10 pt-8"
            >
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-serif text-[26px] leading-none text-ink md:text-[30px]">
                    {stat.value}
                  </dt>
                  <dd className="mt-2.5 text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Image plate */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-bone-dark">
              <AnimatePresence mode="sync">
                <motion.div
                  key={slide.image}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ opacity: { duration: 1.2, ease: EASE }, scale: { duration: 6.5, ease: 'linear' } }}
                  className="absolute inset-0"
                >
                  <Image
                    src={slide.image}
                    alt={slide.label}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/5 to-transparent" />

              {/* Caption plate */}
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-6 p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slide.caption}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    <span className="block text-[10px] uppercase tracking-editorial text-bone/70">
                      {slide.label}
                    </span>
                    <span className="mt-2 block font-serif text-lg text-bone-light">
                      {slide.caption}
                    </span>
                  </motion.div>
                </AnimatePresence>

                <div className="flex shrink-0 items-center gap-2">
                  {SLIDES.map((s, i) => (
                    <button
                      key={s.image}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`View ${s.label}`}
                      className={`h-px transition-all duration-700 ease-editorial ${
                        i === index ? 'w-8 bg-bone-light' : 'w-4 bg-bone/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating note card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: EASE }}
              className="absolute -left-4 bottom-12 hidden w-56 border border-ink/10 bg-bone-light p-5 shadow-editorial lg:block"
            >
              <span className="eyebrow">Certificate</span>
              <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">
                Every order ships with an analytical report and batch reference.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
