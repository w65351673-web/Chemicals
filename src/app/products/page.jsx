import { Suspense } from 'react';
import ProductList from '@/components/product/ProductList';
import dbConnect from '@/lib/utils/db';
import Product from '@/models/Product';
import { categoryLabel } from '@/lib/constants/categories';

// Dynamic Metadata for SEO - handles query parameters
export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const category = params?.category || '';
  
  // Always use /products as canonical to avoid duplicate content from query params
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://chemicalssite.com';
  
  return {
    metadataBase: new URL(baseUrl),
    title: category 
      ? `${categoryLabel(category)} | ChemicalsSite`
      : 'Anabolic Steroids, Psychedelics & Research Chemicals | ChemicalsSite',
    description: category
      ? `Browse high-purity ${categoryLabel(category).toLowerCase()} for laboratory research \u2014 every batch assayed and documented.`
      : 'Browse high-purity anabolic steroids, psychedelic drugs and research chemicals for laboratory research. Testosterone enanthate, trenbolone acetate, oxandrolone, 1P-LSD, 4-ACO-DMT, mescaline HCl, 2C-B, 3-MMC, 2-FDCK and more.',
    keywords: 'anabolic steroids, psychedelic drugs, research chemicals, testosterone enanthate, trenbolone acetate, nandrolone decanoate, oxandrolone, 1P-LSD, 4-ACO-DMT, mescaline HCl, 2C-B, 3-MMC, 2-FDCK, buy research chemicals online',
    alternates: {
      canonical: '/products', // Always point to /products to avoid duplicate content from query params
    },
    openGraph: {
      title: category 
        ? `${categoryLabel(category)} | ChemicalsSite`
        : 'Anabolic Steroids, Psychedelics & Research Chemicals | ChemicalsSite',
      description: category
        ? `Browse high-purity ${categoryLabel(category).toLowerCase()} for laboratory research.`
        : 'Browse high-purity anabolic steroids, psychedelic drugs and research chemicals for laboratory research.',
      url: '/products',
      type: 'website',
    },
  };
}

// Helper function to convert MongoDB documents to plain objects
function convertToPlainObject(doc) {
  // Convert _id to string
  const plainObject = { ...doc };
  if (plainObject._id) {
    plainObject._id = plainObject._id.toString();
  }
  
  // Handle nested objects and arrays
  Object.keys(plainObject).forEach(key => {
    if (plainObject[key] && typeof plainObject[key] === 'object') {
      if (Array.isArray(plainObject[key])) {
        plainObject[key] = plainObject[key].map(item => {
          if (item && typeof item === 'object' && item._id) {
            return convertToPlainObject(item);
          }
          return item;
        });
      } else if (plainObject[key]._id) {
        plainObject[key] = convertToPlainObject(plainObject[key]);
      }
    }
  });
  
  return plainObject;
}

// This function fetches products on the server
async function getProducts(searchParams) {
  await dbConnect();
  
  // First await the entire searchParams object
  const params = await searchParams;
  
  // Now safely extract values
  const category = params?.category || null;
  const search = params?.search || null;
  const sort = params?.sort || 'createdAt';
  const order = params?.order || 'desc';
  
  // Build query based on parameters
  let query = {};
  
  if (category) {
    console.log('Filtering by category:', category);
    
    // Handle 'research chemicals' category with multiple approaches to ensure it works
    if (category.toLowerCase() === 'research chemicals') {
      // Try multiple approaches to match research chemicals
      query.$or = [
        // Exact match (case-sensitive)
        { category: 'research chemicals' },
        // Exact match (case-insensitive regex)
        { category: { $regex: /^research chemicals$/i } },
        // Partial match (case-insensitive)
        { category: { $regex: /research chemicals/i } }
      ];
      console.log('Using enhanced research chemicals filter with multiple matching strategies');
    } else {
      // Make category filtering case-insensitive for other categories
      query.category = { $regex: new RegExp('^' + category + '$', 'i') };
    }
  }
  
  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }
  
  // Execute query with sorting
  const sortField = sort;
  const sortOrder = order === 'asc' ? 1 : -1;
  
  const sortOptions = {};
  sortOptions[sortField] = sortOrder;
  
  // Fetch products
  try {
    const products = await Product.find(query)
      .sort(sortOptions)
      .select('-reviews') // Exclude reviews for performance
      .lean();
    
    // Convert MongoDB documents to plain objects
    return products.map(product => convertToPlainObject(product));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Loading component
function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-14 py-14 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[4/5] w-full bg-bone-dark" />
          <div className="mt-5 h-4 w-2/3 bg-bone-dark" />
          <div className="mt-3 h-3 w-1/3 bg-bone-dark" />
        </div>
      ))}
    </div>
  );
}

export default async function ProductsPage({ searchParams }) {
  // First await the entire searchParams object
  const params = await searchParams;
  
  const products = await getProducts(searchParams);
  const selectedCategory = params?.category || '';
  
  return (
    <div className="min-h-screen bg-bone pt-32">
      <div className="container-editorial">
        <header className="grid grid-cols-1 items-end gap-8 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow">{selectedCategory ? 'Category' : 'The catalogue'}</p>
            <h1 className="mt-5 font-serif text-[clamp(2.4rem,6vw,4.4rem)] leading-[0.98] text-ink">
              {selectedCategory ? categoryLabel(selectedCategory) : 'All products'}
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="max-w-sm text-[15px] leading-[1.75] text-ink-muted">
              {selectedCategory
                ? `A curated selection of ${categoryLabel(selectedCategory).toLowerCase()}, each batch assayed for identity and purity before it is listed.`
                : 'Anabolic steroids, psychedelic drugs and research chemicals \u2014 each batch assayed, documented and dispatched discreetly.'}
            </p>
          </div>
        </header>

        <Suspense fallback={<ProductsLoading />}>
          <ProductList initialProducts={products} selectedCategory={selectedCategory} />
        </Suspense>
      </div>
    </div>
  );
}
