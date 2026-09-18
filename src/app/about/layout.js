export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://chemicalssite.com'),
  title: 'About Us | ChemicalsSite - Premium Research Chemicals',
  description: 'Learn about ChemicalsSite, your trusted source for premium research chemicals including 5cl-adba, 5cladba, 5fadb, jwh-018, and more. Quality, safety, and customer satisfaction.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us | ChemicalsSite',
    description: 'Learn about ChemicalsSite, your trusted source for premium research chemicals.',
    url: '/about',
    type: 'website',
  },
};

export default function AboutLayout({ children }) {
  return children;
}
