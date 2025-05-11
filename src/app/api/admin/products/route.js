import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/utils/db';
import Product from '@/models/Product';
import { uploadToCloudinary } from '@/lib/utils/cloudinary';

// Helper function to check admin authorization
async function checkAdminAuth() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin-token');
    
    if (!token) {
      return false;
    }
    
    // Verify the token
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET || 'admin-jwt-secret');
    
    if (!decoded || !decoded.isAdmin) {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Admin auth check error:', error);
    return false;
  }
}

// GET - Fetch all products with pagination and search
export async function GET(request) {
  try {
    // Check admin authorization
    if (!await checkAdminAuth()) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
    }

    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    
    const skip = (page - 1) * limit;
    
    // Build search query
    const searchQuery = search 
      ? { 
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { category: { $regex: search, $options: 'i' } }
          ] 
        } 
      : {};
    
    // Get products with pagination
    const products = await Product.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    // Get total count for pagination
    const totalProducts = await Product.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalProducts / limit);
    
    return NextResponse.json({
      products,
      currentPage: page,
      totalPages,
      totalProducts
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new product
export async function POST(request) {
  try {
    // Check admin authorization
    if (!await checkAdminAuth()) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
    }

    await dbConnect();
    
    let productData;
    let imageUrls = [];
    
    // Check content type to determine how to parse the request
    const contentType = request.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      // Handle JSON data
      productData = await request.json();
      
      // Images are already URLs in this case
      imageUrls = productData.images || [];
    } else if (contentType && contentType.includes('multipart/form-data')) {
      // Parse form data (including files)
      const formData = await request.formData();
      
      // Extract product data
      const name = formData.get('name');
      const slug = formData.get('slug');
      const description = formData.get('description');
      const price = parseFloat(formData.get('price'));
      const category = formData.get('category');
      const countInStock = parseInt(formData.get('countInStock'));
      const featured = formData.get('featured') === 'true';
      
      productData = {
        name,
        slug,
        description,
        price,
        category,
        countInStock,
        featured
      };
      
      // Handle image uploads
      const imageFiles = formData.getAll('images');
      
      if (imageFiles && imageFiles.length > 0) {
        for (const file of imageFiles) {
          if (file instanceof File) {
            // Upload to Cloudinary
            const result = await uploadToCloudinary(file);
            if (result && result.secure_url) {
              imageUrls.push(result.secure_url);
            }
          }
        }
      }
    } else {
      return NextResponse.json(
        { message: 'Unsupported content type' },
        { status: 400 }
      );
    }
    
    // Validate required fields
    if (!productData.name || !productData.description || isNaN(productData.price) || !productData.category) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create slug if not provided
    if (!productData.slug) {
      productData.slug = productData.name
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
    
    // Add images to product data
    productData.images = imageUrls;
    
    // Create new product
    const newProduct = new Product(productData);
    
    await newProduct.save();
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}
