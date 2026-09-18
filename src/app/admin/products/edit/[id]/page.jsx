'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaSave, FaUpload, FaTimes } from 'react-icons/fa';
import { PRODUCT_CATEGORIES } from '@/lib/constants/categories';

export default function EditProduct({ params }) {
  const router = useRouter();
  const { id } = params;
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: 0,
    countInStock: 0,
    category: '',
    featured: false,
    rating: 0,
    numReviews: 0,
    images: []
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/admin/products/${id}`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch product data');
        }
        
        const productData = await res.json();
        
        setFormData({
          name: productData.name || '',
          slug: productData.slug || '',
          description: productData.description || '',
          price: productData.price || 0,
          countInStock: productData.countInStock || 0,
          category: productData.category || '',
          featured: productData.featured || false,
          rating: productData.rating || 0,
          numReviews: productData.numReviews || 0,
          images: productData.images || []
        });
        
        // Set image preview URLs
        setImagePreviewUrls(productData.images || []);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProduct();
    }
  }, [id]);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear validation error when field is edited
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;
    
    // Preview images
    const newImagePreviewUrls = [...imagePreviewUrls];
    const newImageFiles = [...imageFiles];
    
    files.forEach(file => {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        newImagePreviewUrls.push(reader.result);
        setImagePreviewUrls([...newImagePreviewUrls]);
      };
      
      reader.readAsDataURL(file);
      newImageFiles.push(file);
    });
    
    setImageFiles(newImageFiles);
  };
  
  const removeImage = (index, isExistingImage = false) => {
    if (isExistingImage) {
      // Remove existing image URL
      const newImages = [...formData.images];
      newImages.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        images: newImages
      }));
      
      // Update preview URLs
      const newPreviewUrls = [...imagePreviewUrls];
      newPreviewUrls.splice(index, 1);
      setImagePreviewUrls(newPreviewUrls);
    } else {
      // Remove new image file
      const newImageFiles = [...imageFiles];
      newImageFiles.splice(index - formData.images.length, 1);
      setImageFiles(newImageFiles);
      
      // Update preview URLs
      const newPreviewUrls = [...imagePreviewUrls];
      newPreviewUrls.splice(index, 1);
      setImagePreviewUrls(newPreviewUrls);
    }
  };
  
  const uploadImages = async () => {
    if (imageFiles.length === 0) return formData.images;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    const uploadedImageUrls = [...formData.images];
    
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'products');
        
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData
        });
        
        if (!res.ok) {
          throw new Error('Failed to upload image');
        }
        
        const data = await res.json();
        uploadedImageUrls.push(data.url);
        
        // Update progress
        setUploadProgress(Math.round(((i + 1) / imageFiles.length) * 100));
      } catch (err) {
        console.error('Error uploading image:', err);
        setError(`Failed to upload image: ${file.name}`);
      }
    }
    
    setIsUploading(false);
    return uploadedImageUrls;
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Product name is required';
    }
    
    if (!formData.slug.trim()) {
      errors.slug = 'Slug is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      errors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    
    if (isNaN(formData.price) || formData.price <= 0) {
      errors.price = 'Price must be a positive number';
    }
    
    if (isNaN(formData.countInStock) || formData.countInStock < 0) {
      errors.countInStock = 'Stock count must be a non-negative number';
    }
    
    if (!formData.category.trim()) {
      errors.category = 'Category is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSaving(true);
    
    try {
      // Upload images first
      const imageUrls = await uploadImages();
      
      // Prepare data for API
      const productData = {
        ...formData,
        images: imageUrls,
        price: parseFloat(formData.price),
        countInStock: parseInt(formData.countInStock)
      };
      
      // Update product
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update product');
      }
      
      // Redirect to products list
      router.push('/admin/products');
    } catch (err) {
      console.error('Error updating product:', err);
      setError(err.message || 'Failed to update product. Please try again.');
    } finally {
      setSaving(false);
    }
  };
  
  const inputClass = (error) =>
    `w-full bg-bone border border-ink/15 text-ink px-4 py-2.5 rounded-editorial focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-colors ${
      error ? 'border-red-500 bg-red-50/20' : ''
    }`;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-2 border-amber border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="eyebrow mb-1">Catalog</p>
          <h1 className="text-2xl font-serif font-medium text-ink">Edit Product</h1>
        </div>
        <Link href="/admin/products" className="flex items-center text-ink-muted hover:text-ink text-sm transition-colors">
          <FaArrowLeft className="mr-2" />
          Back to Products
        </Link>
      </header>

      {error && (
        <div className="bg-amber-wash border border-amber/30 text-amber-dark p-4 rounded-editorial text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-bone-light border border-ink/10 rounded-editorial p-6 shadow-editorial">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-5">
            <div>
              <label className="block text-ink-soft text-sm font-medium mb-2">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={inputClass(formErrors.name)}
              />
              {formErrors.name && <p className="text-red-700 text-sm mt-1">{formErrors.name}</p>}
            </div>

            <div>
              <label className="block text-ink-soft text-sm font-medium mb-2">Slug</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className={inputClass(formErrors.slug)}
              />
              {formErrors.slug && <p className="text-red-700 text-sm mt-1">{formErrors.slug}</p>}
              <p className="text-ink-faint text-sm mt-1">Used in URL: /products/your-slug</p>
            </div>

            <div>
              <label className="block text-ink-soft text-sm font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="5"
                className={inputClass(formErrors.description)}
              ></textarea>
              {formErrors.description && <p className="text-red-700 text-sm mt-1">{formErrors.description}</p>}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-ink-soft text-sm font-medium mb-2">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className={inputClass(formErrors.price)}
                />
                {formErrors.price && <p className="text-red-700 text-sm mt-1">{formErrors.price}</p>}
              </div>

              <div>
                <label className="block text-ink-soft text-sm font-medium mb-2">Stock Count</label>
                <input
                  type="number"
                  name="countInStock"
                  value={formData.countInStock}
                  onChange={handleInputChange}
                  min="0"
                  className={inputClass(formErrors.countInStock)}
                />
                {formErrors.countInStock && <p className="text-red-700 text-sm mt-1">{formErrors.countInStock}</p>}
              </div>
            </div>

            <div>
              <label className="block text-ink-soft text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={inputClass(formErrors.category)}
              >
                {PRODUCT_CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              {formErrors.category && <p className="text-red-700 text-sm mt-1">{formErrors.category}</p>}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="h-5 w-5 accent-amber rounded-editorial border-ink/30"
              />
              <label htmlFor="featured" className="ml-2 text-ink-soft text-sm">Featured Product</label>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-ink-soft text-sm font-medium mb-2">Rating (1-5)</label>
                <div className="flex items-center">
                  <input
                    type="range"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    min="1"
                    max="5"
                    step="0.5"
                    className="w-full accent-amber h-1.5 bg-ink/10 rounded-full appearance-none cursor-pointer"
                  />
                  <span className="ml-3 text-ink font-medium min-w-[2rem]">{formData.rating}</span>
                </div>
                <div className="flex mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${star <= formData.rating ? 'text-amber' : 'text-ink/15'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-ink-faint text-sm mt-1">Set the product rating manually (1-5 stars)</p>
              </div>

              <div>
                <label className="block text-ink-soft text-sm font-medium mb-2">Number of Reviews</label>
                <input
                  type="number"
                  name="numReviews"
                  value={formData.numReviews}
                  onChange={handleInputChange}
                  min="0"
                  className={inputClass(false)}
                />
                <p className="text-ink-faint text-sm mt-1">Set the number of reviews manually</p>
              </div>
            </div>

            <div>
              <label className="block text-ink-soft text-sm font-medium mb-2">Product Images</label>
              <div className="flex flex-wrap gap-3 mb-3">
                {imagePreviewUrls.map((url, index) => (
                  <div key={index} className="relative w-20 h-20 rounded-editorial overflow-hidden bg-bone-deep group">
                    <Image
                      src={url}
                      alt={`Product image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index, index < formData.images.length)}
                      className="absolute top-1 right-1 bg-red-700 text-bone-light rounded-full p-1 w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove image"
                    >
                      <FaTimes size={10} />
                    </button>
                  </div>
                ))}

                <label className="w-20 h-20 border-2 border-dashed border-ink/20 rounded-editorial flex flex-col items-center justify-center cursor-pointer hover:border-amber/50 transition-colors bg-bone">
                  <FaUpload className="text-ink-muted mb-1" />
                  <span className="text-[10px] text-ink-muted">Add Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    multiple
                  />
                </label>
              </div>

              {isUploading && (
                <div className="mt-2">
                  <div className="w-full bg-bone-deep rounded-full h-2">
                    <div
                      className="bg-amber h-2 rounded-full transition-all"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-ink-muted text-sm mt-1">Uploading: {uploadProgress}%</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-end border-t border-ink/10 pt-6">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary disabled:opacity-60"
          >
            {saving ? (
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
