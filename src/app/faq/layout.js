export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://darkchemsite.com'),
  title: 'FAQ | DarkChemSite - Frequently Asked Questions',
  description: 'Find answers to frequently asked questions about ordering, shipping, products, and more at DarkChemSite.',
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'FAQ | DarkChemSite',
    description: 'Find answers to frequently asked questions about ordering, shipping, and products.',
    url: '/faq',
    type: 'website',
  },
};

export default function FAQLayout({ children }) {
  return children;
}
