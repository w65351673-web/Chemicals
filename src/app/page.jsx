import dbConnect from '@/lib/utils/db';
import Product from '@/models/Product';
import HomeClient from '@/components/home/HomeClient';

// Metadata for SEO
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://chemicalssite.com'),
  title: 'ChemicalsSite | Anabolic Steroids, Psychedelic Drugs & Research Chemicals',
  description: 'High-purity anabolic steroids, psychedelic drugs and research chemicals for laboratory research. Testosterone enanthate, trenbolone acetate, oxandrolone, 1P-LSD, 4-ACO-DMT, mescaline HCl, 2C-B, 3-MMC, 2-FDCK and more.',
  keywords: 'anabolic steroids, psychedelic drugs, research chemicals, testosterone enanthate, trenbolone acetate, nandrolone decanoate, oxandrolone, 1P-LSD, 4-ACO-DMT, mescaline HCl, 2C-B, 3-MMC, 3-CMC, 2-FDCK',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ChemicalsSite | Anabolic Steroids, Psychedelics & Research Chemicals',
    description: 'High-purity anabolic steroids, psychedelic drugs and research chemicals \u2014 assayed, documented and discreetly dispatched.',
    url: '/',
    type: 'website',
  },
};

async function getFeaturedProducts() {
  await dbConnect();
  
  try {
    const products = await Product.find({ featured: true })
      .limit(6)
      .select('-reviews')
      .lean();
    
    return JSON.parse(JSON.stringify(products)); 
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();
  
  return <HomeClient featuredProducts={featuredProducts} />;
}
