/**
 * Dynamic Sitemap for SEO optimization
 * Includes all research chemical keywords: 5cl-adba, 5cladba, 5fadb, jwh-018, 
 * adb-butinaca, ab-pinaca, 5F-EDMB-PINACA, ADB-FUBINACA, 4FADB, AMB-FUBINACA, MDMB-4en-PINACA,
 * Etizolam, Flualprazolam, Clonazolam, Flubromazolam, Diclazepam, Bromazolam, Pyrazolam, Phenazepam,
 * AB-FUBINACA, MDMB-CHMINACA, MDMB-FUBINACA, Isotonitazene, Protonitazene, Metonitazene, Alprazolam,
 * 5fmdmb-2201, 4fadb
 */

import dbConnect from '@/lib/utils/db';
import Product from '@/models/Product';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://darkchemsite.com';
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/shipping`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Fetch all products from database
  let productPages = [];
  try {
    await dbConnect();
    const products = await Product.find({}).select('slug updatedAt').lean();
    
    productPages = products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: product.updatedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return static pages even if database fails
  }

  // Always return at least static pages
  return [...staticPages, ...productPages];
}
