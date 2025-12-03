'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaStar, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '@/components/cart/CartProvider';
import ProtectedImage from '@/components/common/ProtectedImage';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const gramOptions = [15, 20, 25, 50, 100, 500, 1000];
  const [selectedGrams, setSelectedGrams] = useState(15);

  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        // Try to determine if the slug is actually a MongoDB ID
        const isMongoId = /^[0-9a-fA-F]{24}$/.test(slug);
        
        // Choose the appropriate API endpoint based on the slug format
        const endpoint = isMongoId ? `/api/products/id/${slug}` : `/api/products/${slug}`;
        
        const { data } = await axios.get(endpoint);
        setProduct(data);
        
        // Set default selected variant if available
        if (data.priceVariants && data.priceVariants.length > 0) {
          setSelectedVariant(data.priceVariants[0]);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.response?.data?.message || 'Failed to load product');
        toast.error('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  // Calculate price based on product's actual price and selected grams
  const calculateEuroPrice = (grams) => {
    if (!product || !product.price) return '0.00';
    // Calculate price proportionally: (selected grams / base grams) * base price
    const baseGrams = 15; // Base unit is 15g
    const calculatedPrice = (grams / baseGrams) * product.price;
    return calculatedPrice.toFixed(2);
  };

  const handleAddToCart = () => {
    if (product) {
      // Calculate the euro price for the selected grams
      const euroPrice = parseFloat(calculateEuroPrice(selectedGrams));
      // Build a cart item variant object for grams
      const gramsVariant = {
        grams: selectedGrams,
        price: euroPrice,
      };
      addToCart(
        {
          ...product,
        },
        quantity,
        gramsVariant
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Product Not Found</h1>
            <p className="text-gray-400 mb-6">{error || 'The product you are looking for does not exist.'}</p>
            <Link 
              href="/products" 
              className="inline-flex items-center text-purple-500 hover:text-purple-400"
            >
              <FaArrowLeft className="mr-2" /> Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center text-sm text-gray-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-white">Products</Link>
          <span className="mx-2">/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-white">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Images */}
          <div>
            <div className="relative h-80 md:h-96 w-full rounded-lg overflow-hidden mb-4">
              {product.images && product.images.length > 0 ? (
                <ProtectedImage
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-500">No image</span>
                </div>
              )}
            </div>

            {/* Image thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-16 w-16 rounded-md overflow-hidden border-2 ${
                      selectedImage === index ? 'border-purple-500' : 'border-transparent'
                    }`}
                  >
                    <ProtectedImage
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-2">
              <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                {product.category}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(product.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-400 ml-2">
                ({product.numReviews} {product.numReviews === 1 ? 'review' : 'reviews'})
              </span>
            </div>

            {/* Euro price dropdown for grams selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Choose quantity</h3>
              <select
                className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
                value={selectedGrams}
                onChange={e => setSelectedGrams(Number(e.target.value))}
              >
                {gramOptions.map(g => (
                  <option key={g} value={g}>{g}g</option>
                ))}
              </select>
              <div className="text-2xl font-bold text-purple-400">
                €{calculateEuroPrice(selectedGrams)}
                <span className="ml-2 text-base text-gray-400">({selectedGrams}g)</span>
              </div>
            </div>


            {/* Quantity selector */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Quantity</h3>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="bg-gray-800 text-white w-10 h-10 flex items-center justify-center rounded-l-lg"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="bg-gray-700 text-white text-center w-16 h-10 border-0"
                />
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="bg-gray-800 text-white w-10 h-10 flex items-center justify-center rounded-r-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to cart button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={product.countInStock <= 0}
              className={`w-full py-3 px-4 rounded-lg flex items-center justify-center text-white font-semibold mb-4 ${
                product.countInStock > 0
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'bg-gray-700 cursor-not-allowed'
              }`}
            >
              <FaShoppingCart className="mr-2" />
              {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </motion.button>

            {/* Stock status */}
            <div className="mb-6">
              <span className={`text-sm ${product.countInStock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {product.countInStock > 0 
                  ? `In Stock (${product.countInStock} available)` 
                  : 'Out of Stock'}
              </span>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
              <div className="text-gray-300 space-y-2">
                {product.description.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Customer Reviews</h2>
          
          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review._id} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="font-semibold text-white">{review.name}</div>
                      <div className="text-gray-400 text-sm ml-4">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'text-yellow-400' : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">No reviews yet. Be the first to review this product!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
