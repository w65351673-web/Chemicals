'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Reveal, { RevealText, RevealRule } from '@/components/animations/Reveal';
import { PRODUCT_CATEGORIES, categoryHref } from '@/lib/constants/categories';

const EASE = [0.22, 1, 0.36, 1];

const PRINCIPLES = [
  {
    number: '01',
    title: 'Verified before listing',
    copy: 'No batch reaches the catalogue until an independent assay confirms identity, concentration and purity.',
  },
  {
    number: '02',
    title: 'Documented lineage',
    copy: 'Every vial carries a reference number that ties back to its certificate, storage conditions and arrival date.',
  },
  {
    number: '03',
    title: 'Discreet by default',
    copy: 'Unbranded, sealed packaging with tracked worldwide dispatch. Nothing on the outside describes the contents.',
  },
  {
    number: '04',
    title: 'Answered by people',
    copy: 'Technical questions are answered by the same team that handles the material, usually within one business day.',
  },
];

const FACTS = [
  { value: '3', label: 'Research categories' },
  { value: '99.4%', label: 'Average verified purity' },
  { value: '48h', label: 'Typical dispatch window' },
  { value: '24h', label: 'Median reply time' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bone pt-32">
      <section className="container-editorial">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">About the house</p>
            </Reveal>
            <h1 className="mt-6 font-serif text-[clamp(2.6rem,7vw,5.2rem)] leading-[0.95] text-ink">
              <RevealText text="A quiet standard" />
              <span className="block italic text-amber-dark">
                <RevealText text="for research supply" delay={0.2} />
              </span>
            </h1>
          </div>

          <div className="lg:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
              className="max-w-md text-[15px] leading-[1.8] text-ink-muted"
            >
              ChemicalsSite supplies anabolic steroids, psychedelic drugs and research
              chemicals to laboratories, analysts and independent researchers. We keep the
              catalogue deliberately narrow so that every compound in it can be documented
              properly.
            </motion.p>
          </div>
        </div>

        <Reveal delay={0.2} className="mt-16">
          <div className="relative aspect-[16/7] w-full overflow-hidden bg-bone-dark">
            <Image
              src="/images/Laboratory-Science.jpg"
              alt="Laboratory bench with analytical glassware"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      <section className="container-editorial pt-28">
        <RevealRule />
        <div className="grid grid-cols-2 gap-10 py-12 md:grid-cols-4">
          {FACTS.map((fact, i) => (
            <Reveal key={fact.label} delay={i * 0.08}>
              <p className="font-serif text-[clamp(2rem,4vw,3rem)] leading-none text-ink">
                {fact.value}
              </p>
              <p className="eyebrow mt-3">{fact.label}</p>
            </Reveal>
          ))}
        </div>
        <RevealRule />
      </section>

      <section className="container-editorial pt-28">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow">Our position</p>
              <h2 className="mt-6 font-serif text-[clamp(1.9rem,3.4vw,2.8rem)] leading-tight text-ink">
                Fewer compounds, better paperwork
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.12}>
              <p className="text-[17px] leading-[1.85] text-ink">
                Research supply has a documentation problem. Material moves quickly, and
                the certificate that should follow it often does not. We built the house
                around the opposite habit: nothing is listed before it is tested, and
                nothing ships without its reference.
              </p>
              <p className="mt-7 text-[15px] leading-[1.85] text-ink-muted">
                That means our catalogue grows slowly. It also means that when you order a
                gram of testosterone enanthate, 1P-LSD or 3-MMC, you receive the same
                material described on the listing, at the purity stated, with the analysis
                to support it. Storage is controlled and logged, orders are packed by hand,
                and every dispatch is tracked door to door.
              </p>
              <p className="mt-7 text-[15px] leading-[1.85] text-ink-muted">
                We work with laboratories, universities and independent analysts across
                Europe, North America and Asia. If a compound you need is not listed, ask
                &mdash; sourcing requests are part of the service.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-editorial pt-28">
        <Reveal>
          <p className="eyebrow">How we work</p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
          {PRINCIPLES.map((item, i) => (
            <Reveal key={item.number} delay={i * 0.08}>
              <div className="border-t border-ink/12 pt-7">
                <span className="font-serif text-[15px] text-amber-dark">
                  {item.number}
                </span>
                <h3 className="mt-4 font-serif text-[24px] leading-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-md text-[15px] leading-[1.8] text-ink-muted">
                  {item.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-editorial pt-28">
        <Reveal>
          <p className="eyebrow">What we carry</p>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden border border-ink/12 bg-ink/12 md:grid-cols-3">
          {PRODUCT_CATEGORIES.map((cat, i) => (
            <Link
              key={cat.value}
              href={categoryHref(cat.value)}
              className="group bg-bone-light px-8 py-12 transition-colors duration-500 hover:bg-bone-dark"
            >
              <span className="font-serif text-[15px] text-amber-dark">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-serif text-[26px] leading-tight text-ink">
                {cat.label}
              </h3>
              <span className="link-underline mt-6 inline-block text-[11px] font-medium uppercase tracking-editorial text-ink-muted group-hover:text-ink">
                Browse
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-editorial py-28">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 border-t border-ink/12 pt-14 md:flex-row md:items-end">
            <h2 className="max-w-xl font-serif text-[clamp(1.9rem,3.6vw,3rem)] leading-tight text-ink">
              Have a compound in mind, or a question about a batch?
            </h2>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn-primary">
                Browse catalogue
              </Link>
              <a href="mailto:info@chemicalssite.com" className="btn-secondary">
                Email us
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
