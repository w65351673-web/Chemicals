import dbConnect from '@/lib/utils/db';
import Product from '@/models/Product';
import HomeClient from '@/components/home/HomeClient';

// Metadata for SEO
export const metadata = {
  title: 'DarkChemSite | Premium Research Chemicals - 5cl-adba, jwh-018, adb-butinaca',
  description: 'Premium quality research chemicals including 5cl-adba, 5cladba, 5fadb, jwh-018, adb-butinaca, ab-pinaca, 5F-EDMB-PINACA, ADB-FUBINACA, 4FADB, AMB-FUBINACA, MDMB-4en-PINACA. Top-grade synthetic cannabinoids and benzos for laboratory research.',
  keywords: '5cl-adba, 5cladba, 5fadb, jwh-018, adb-butinaca, ab-pinaca, 5F-EDMB-PINACA, ADB-FUBINACA, 4FADB, AMB-FUBINACA, MDMB-4en-PINACA, research chemicals, synthetic cannabinoids, benzos',
  openGraph: {
    title: 'DarkChemSite | Premium Research Chemicals',
    description: 'Premium quality research chemicals including 5cl-adba, 5cladba, 5fadb, jwh-018, adb-butinaca and more.',
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
