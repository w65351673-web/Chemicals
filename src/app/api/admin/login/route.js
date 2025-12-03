import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    // Parse request body
    const { username, password } = await request.json();
    
    console.log('Login attempt with:', { username, passwordProvided: !!password });
    
    // Hardcoded credentials for development
    // In production, these should come from environment variables
    const adminUsername = 'darkadmin';
    const adminPassword = 'supersecret123';
    
    console.log('Expected credentials:', { adminUsername, adminPasswordExists: !!adminPassword });
    
    // Validate credentials
    if (username !== adminUsername || password !== adminPassword) {
      console.log('Credentials mismatch:', { 
        usernameMatch: username === adminUsername,
        passwordMatch: password === adminPassword 
      });
      
      return NextResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 }
      );
    }
    
    console.log('Authentication successful for:', username);
    
    // Create JWT token
    const token = jwt.sign(
      { 
        username: adminUsername,
        isAdmin: true 
      },
      process.env.JWT_SECRET || 'admin-jwt-secret',
      { expiresIn: '1d' }
    );
    
    // Set cookie
    const cookieStore = cookies();
    cookieStore.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/'
    });
    
    return NextResponse.json({ 
      message: 'Login successful',
      success: true
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}
