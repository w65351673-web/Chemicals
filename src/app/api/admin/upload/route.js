import { NextResponse } from 'next/server';
import { handleFileUpload } from '@/lib/utils/multerUpload';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

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

export async function POST(request) {
  try {
    // Check admin authorization
    if (!await checkAdminAuth()) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
    }

    // Check if request is multipart form data
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { message: 'Content type must be multipart/form-data' },
        { status: 400 }
      );
    }

    // Handle file upload with Multer
    const result = await handleFileUpload(request);
    
    if (!result.success) {
      return NextResponse.json(
        { message: result.error },
        { status: result.status || 500 }
      );
    }

    return NextResponse.json({
      message: 'File uploaded successfully',
      url: result.url,
      filename: result.filename,
      originalName: result.originalName,
      size: result.size
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { message: 'Error uploading file: ' + error.message },
      { status: 500 }
    );
  }
}
