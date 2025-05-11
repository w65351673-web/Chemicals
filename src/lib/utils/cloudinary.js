// Use CommonJS require for better compatibility with Next.js
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Upload a file to Cloudinary
 * @param {File} file - The file to upload
 * @param {Object} options - Upload options
 * @returns {Promise<Object>} - Cloudinary upload result
 */
export async function uploadToCloudinary(file, options = {}) {
  try {
    // Convert file to base64 string
    const fileBuffer = await file.arrayBuffer();
    const base64String = Buffer.from(fileBuffer).toString('base64');
    const dataURI = `data:${file.type};base64,${base64String}`;
    
    // Set default options
    const defaultOptions = {
      folder: 'darkchemsite',
      resource_type: 'auto'
    };
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(
      dataURI,
      { ...defaultOptions, ...options }
    );
    
    return result;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
}

/**
 * Delete a file from Cloudinary
 * @param {string} publicId - The public ID of the file to delete
 * @returns {Promise<Object>} - Cloudinary deletion result
 */
export async function deleteFromCloudinary(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
}

/**
 * Get a signed URL for a Cloudinary resource
 * @param {string} publicId - The public ID of the resource
 * @param {Object} options - Transformation options
 * @returns {string} - Signed URL
 */
export function getSignedUrl(publicId, options = {}) {
  return cloudinary.url(publicId, {
    secure: true,
    sign_url: true,
    ...options
  });
}
