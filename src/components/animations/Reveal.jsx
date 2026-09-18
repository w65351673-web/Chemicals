'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Editorial reveal wrapper: slow, quiet fade + slide used site-wide.
 */
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  duration = 0.9,
  y = 28,
  x = 0,
  once = true,
  amount = 0.25,
  className = '',
  ...props
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount });
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Splits a line of text into words that rise into place one after another.
 */
export function RevealText({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.06,
  once = true,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: 0.4 });
  const words = String(text).split(' ');

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom pb-[0.16em] -mb-[0.16em]"
        >
          <motion.span
            className={`inline-block ${wordClassName}`}
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{ duration: 0.95, delay: delay + i * stagger, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/**
 * A hairline rule that draws itself in when scrolled into view.
 */
export function RevealRule({ className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <motion.div
      ref={ref}
      className={`h-px w-full origin-left bg-ink/15 ${className}`}
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    />
  );
}
