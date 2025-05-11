import { Suspense } from 'react';
import ProductList from '@/components/product/ProductList';
import dbConnect from '@/lib/utils/db';
import Product from '@/models/Product';

// Metadata for SEO
export const metadata = {
  title: 'Products | DarkChemSite',
  description: 'Browse our premium collection of research chemicals, cannabinoids, stimulants, and benzos.',
};

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
  
  // Build query based on parameters
  let query = {};
  
  if (searchParams.category) {
    // Special case for 'research chemicals' to also match 'other'
    if (searchParams.category.toLowerCase() === 'research chemicals') {
      query.category = { $in: [/^research chemicals$/i, /^other$/i] };
    } else {
      // Make category filtering case-insensitive for other categories
      query.category = { $regex: new RegExp('^' + searchParams.category + '$', 'i') };
    }
  }
  
  if (searchParams.search) {
    query.name = { $regex: searchParams.search, $options: 'i' };
  }
  
  // Execute query with sorting
  const sortField = searchParams.sort || 'createdAt';
  const sortOrder = searchParams.order === 'asc' ? 1 : -1;
  
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
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    </div>
  );
}

export default async function ProductsPage({ searchParams }) {
  const products = await getProducts(searchParams);
  const selectedCategory = searchParams.category || '';
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {selectedCategory ? `${selectedCategory}` : 'All Products'}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {selectedCategory 
              ? `Browse our premium collection of ${selectedCategory.toLowerCase()}.`
              : 'Browse our premium collection of research chemicals, cannabinoids, stimulants, and benzos.'}
          </p>
        </div>
        
        <Suspense fallback={<ProductsLoading />}>
          <ProductList initialProducts={products} selectedCategory={selectedCategory} />
        </Suspense>
      </div>
    </div>
  );
}
