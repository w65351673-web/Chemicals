import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    // Get the cookie store
    const cookieStore = cookies();
    
    // Delete the admin-token cookie
    cookieStore.delete('admin-token');
    
    return NextResponse.json({ 
      message: 'Logged out successfully',
      success: true
    });
  } catch (error) {
    console.error('Admin logout error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}
