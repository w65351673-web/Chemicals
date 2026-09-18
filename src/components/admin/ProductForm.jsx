'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaUpload, FaTimes, FaSave, FaArrowLeft } from 'react-icons/fa';
import { PRODUCT_CATEGORY_VALUES } from '@/lib/constants/categories';

export default function ProductForm({ product = null }) {
  const router = useRouter();
  const isEditing = !!product;
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    countInStock: '',
    featured: false,
    images: []
  });
  
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Categories available in the store
  const categories = PRODUCT_CATEGORY_VALUES;
  
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        category: product.category || '',
        countInStock: product.countInStock?.toString() || '',
        featured: product.featured || false,
        images: product.images || []
      });
      setImagePreviewUrls(product.images || []);
    }
  }, [product]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleImageChange = (e) => {
    e.preventDefault();
    
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;
    
    // Preview images
    const newImageFiles = [...imageFiles, ...files];
    setImageFiles(newImageFiles);
    
    const newImagePreviewUrls = [...imagePreviewUrls];
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImagePreviewUrls.push(reader.result);
        setImagePreviewUrls([...newImagePreviewUrls]);
      };
      reader.readAsDataURL(file);
    });
  };
  
  const removeImage = (index) => {
    // If editing and removing an existing image
    if (isEditing && index < formData.images.length) {
      const newImages = [...formData.images];
      newImages.splice(index, 1);
      setFormData({ ...formData, images: newImages });
      setImagePreviewUrls(imagePreviewUrls.filter((_, i) => i !== index));
      return;
    }
    
    // If removing a newly added image
    const adjustedIndex = isEditing ? index - formData.images.length : index;
    const newImageFiles = [...imageFiles];
    newImageFiles.splice(adjustedIndex, 1);
    setImageFiles(newImageFiles);
    
    const newImagePreviewUrls = [...imagePreviewUrls];
    newImagePreviewUrls.splice(index, 1);
    setImagePreviewUrls(newImagePreviewUrls);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Create FormData object for file uploads
      const submitData = new FormData();
      
      // Add form fields
      Object.keys(formData).forEach(key => {
        if (key !== 'images') {
          submitData.append(key, formData[key]);
        }
      });
      
      // Add existing images if editing
      if (isEditing) {
        submitData.append('existingImages', JSON.stringify(formData.images));
      }
      
      // Add new image files
      imageFiles.forEach(file => {
        submitData.append('images', file);
      });
      
      // Send request
      const url = isEditing 
        ? `/api/admin/products/${product._id}` 
        : '/api/admin/products';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        body: submitData
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to save product');
      }
      
      const savedProduct = await res.json();
      
      setSuccess(isEditing ? 'Product updated successfully!' : 'Product created successfully!');
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/admin/products');
      }, 1500);
      
    } catch (err) {
      console.error('Error saving product:', err);
      setError(err.message || 'An error occurred while saving the product');
    } finally {
      setLoading(false);
    }
  };
  
  const inputClass = "w-full bg-bone border border-ink/15 text-ink px-4 py-2.5 rounded-editorial focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-colors text-sm";

  return (
    <div className="bg-bone-light border border-ink/10 rounded-editorial shadow-editorial p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.push('/admin/products')}
          className="mr-4 text-ink-muted hover:text-ink transition-colors"
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-2xl font-serif font-medium text-ink">
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h2>
      </div>

      {error && (
        <div className="bg-amber-wash border border-amber/30 text-amber-dark px-4 py-3 rounded-editorial mb-6 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-ink text-bone-light px-4 py-3 rounded-editorial mb-6 text-sm">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-ink-soft text-sm font-medium mb-2" htmlFor="name">
              Product Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="block text-ink-soft text-sm font-medium mb-2" htmlFor="category">
              Category*
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-ink-soft text-sm font-medium mb-2" htmlFor="price">
              Price ($)*
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="block text-ink-soft text-sm font-medium mb-2" htmlFor="countInStock">
              Stock Quantity*
            </label>
            <input
              type="number"
              id="countInStock"
              name="countInStock"
              value={formData.countInStock}
              onChange={handleChange}
              min="0"
              className={inputClass}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-ink-soft text-sm font-medium mb-2" htmlFor="description">
              Description*
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={inputClass}
              required
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="mr-2 h-4 w-4 accent-amber rounded-editorial border-ink/30"
              />
              <label htmlFor="featured" className="text-ink-soft text-sm">
                Feature this product on the homepage
              </label>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-ink-soft text-sm font-medium mb-2">
              Product Images
            </label>

            <div className="mb-4">
              <label className="flex flex-col items-center px-4 py-6 bg-bone border border-dashed border-ink/20 text-ink-muted rounded-editorial cursor-pointer hover:border-amber/50 hover:text-ink transition-colors">
                <FaUpload className="mb-2 text-xl" />
                <span className="text-sm">Upload Images</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {imagePreviewUrls.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                {imagePreviewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <div className="relative h-32 w-full rounded-editorial overflow-hidden bg-bone-deep border border-ink/10">
                      <Image
                        src={url}
                        alt={`Product image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-700 text-bone-light p-1.5 rounded-full hover:bg-red-800 transition-colors"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end border-t border-ink/10 pt-6">
          <button
            type="button"
            onClick={() => router.push('/admin/products')}
            className="btn-secondary mr-3"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-bone-light border-t-transparent rounded-full animate-spin mr-2"></div>
                Saving…
              </>
            ) : (
              <>
                <FaSave className="mr-2" />
                Save Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
