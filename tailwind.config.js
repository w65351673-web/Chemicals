/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Editorial Minimal palette
        bone: {
          DEFAULT: '#F7F3EC', // page canvas
          light: '#FCFAF6',
          dark: '#EFE8DD',
          deep: '#E4DACB',
        },
        ink: {
          DEFAULT: '#14110F', // primary text
          soft: '#3B3630',
          muted: '#6B6257',
          faint: '#9A9084',
        },
        amber: {
          DEFAULT: '#B4762B', // accent
          dark: '#8E5A1C',
          light: '#D9A24B',
          wash: '#F3E5CE',
        },
        primary: {
          DEFAULT: '#B4762B',
          dark: '#8E5A1C',
          light: '#D9A24B',
        },
        secondary: {
          DEFAULT: '#14110F',
          dark: '#000000',
          light: '#3B3630',
        },
        dark: {
          DEFAULT: '#14110F',
          lighter: '#FCFAF6',
          darker: '#000000',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'Georgia', 'Cambria', 'serif'],
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        editorial: '0.22em',
      },
      borderRadius: {
        editorial: '2px',
      },
      boxShadow: {
        editorial: '0 1px 2px rgba(20, 17, 15, 0.04), 0 18px 40px -28px rgba(20, 17, 15, 0.28)',
        'editorial-lg': '0 2px 4px rgba(20, 17, 15, 0.05), 0 40px 80px -40px rgba(20, 17, 15, 0.35)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'line-grow': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'slow-zoom': {
          '0%': { transform: 'scale(1.06)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 1.2s ease both',
        'line-grow': 'line-grow 1.1s cubic-bezier(0.22, 1, 0.36, 1) both',
        marquee: 'marquee 38s linear infinite',
        'slow-zoom': 'slow-zoom 12s ease-out both',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
