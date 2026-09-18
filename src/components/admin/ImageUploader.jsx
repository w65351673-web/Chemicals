'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { FaUpload, FaTrash, FaSpinner } from 'react-icons/fa';

/**
 * Image uploader component that uses Multer for local file storage
 * 
 * @param {Object} props
 * @param {string[]} props.images - Array of image URLs
 * @param {Function} props.onChange - Function to call when images change
 * @param {number} props.maxImages - Maximum number of images allowed (default: 5)
 */
export default function ImageUploader({ images = [], onChange, maxImages = 5 }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if maximum images reached
    if (images.length >= maxImages) {
      setError(`Maximum of ${maxImages} images allowed`);
      return;
    }

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Only JPEG, PNG, WEBP, and GIF files are allowed.');
      return;
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds the 5MB limit.');
      return;
    }

    setUploading(true);
    setError('');

    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', file);

      // Upload the file
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error uploading image');
      }

      const data = await response.json();

      // Add the new image URL to the array
      const newImages = [...images, data.url];
      onChange(newImages);
    } catch (error) {
      console.error('Error uploading image:', error);
      setError(error.message || 'Error uploading image');
    } finally {
      setUploading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Handle image deletion
  const handleDeleteImage = async (index) => {
    try {
      const imageToDelete = images[index];
      
      // Only call the delete API if the image is from our uploads
      if (imageToDelete.startsWith('/uploads/')) {
        await fetch('/api/admin/upload/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filePath: imageToDelete }),
        });
      }

      // Remove the image from the array
      const newImages = [...images];
      newImages.splice(index, 1);
      onChange(newImages);
    } catch (error) {
      console.error('Error deleting image:', error);
      setError('Error deleting image');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-32 h-32 bg-bone-deep rounded-editorial overflow-hidden group border border-ink/10"
          >
            <Image
              src={image}
              alt={`Product image ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
            />
            <button
              type="button"
              onClick={() => handleDeleteImage(index)}
              className="absolute inset-0 bg-ink/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FaTrash className="text-bone-light text-xl" />
            </button>
          </div>
        ))}

        {images.length < maxImages && (
          <label className="w-32 h-32 border-2 border-dashed border-ink/20 rounded-editorial flex flex-col items-center justify-center cursor-pointer hover:border-amber/50 transition-colors bg-bone">
            {uploading ? (
              <FaSpinner className="text-amber text-2xl animate-spin" />
            ) : (
              <>
                <FaUpload className="text-ink-muted text-2xl mb-2" />
                <span className="text-sm text-ink-muted">Upload</span>
              </>
            )}
            <input
              type="file"
              className="hidden"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileChange}
              disabled={uploading}
              ref={fileInputRef}
            />
          </label>
        )}
      </div>

      {error && (
        <p className="text-red-700 text-sm">{error}</p>
      )}

      <p className="text-ink-muted text-sm">
        Upload up to {maxImages} images (JPEG, PNG, WEBP, GIF). Max size: 5MB per image.
      </p>
    </div>
  );
}
