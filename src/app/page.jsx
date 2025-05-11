import dbConnect from '@/lib/utils/db';
import Product from '@/models/Product';
import HomeClient from '@/components/home/HomeClient';

// Metadata for SEO
export const metadata = {
  title: 'DarkChemSite | Premium Research Chemicals',
  description: 'Premium quality research chemicals, cannabinoids, and benzos for your research needs.',
};

// This function fetches featured products on the server
async function getFeaturedProducts() {
  await dbConnect();
  
  try {
    const products = await Product.find({ featured: true })
      .limit(6)
      .select('-reviews') // Exclude reviews for performance
      .lean();
    
    return JSON.parse(JSON.stringify(products)); // Serialize for client component
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();
  
  return <HomeClient featuredProducts={featuredProducts} />;
}
