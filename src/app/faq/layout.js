export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://chemicalssite.com'),
  title: 'FAQ | ChemicalsSite - Frequently Asked Questions',
  description: 'Find answers to frequently asked questions about ordering, shipping, products, and more at ChemicalsSite.',
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'FAQ | ChemicalsSite',
    description: 'Find answers to frequently asked questions about ordering, shipping, and products.',
    url: '/faq',
    type: 'website',
  },
};

export default function FAQLayout({ children }) {
  return children;
}
