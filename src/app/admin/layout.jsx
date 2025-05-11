'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaBox, FaShoppingCart, FaUsers, FaChartLine, FaCog } from 'react-icons/fa';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Check if the current path is the login page
  const [isLoginPage, setIsLoginPage] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoginPage(window.location.pathname === '/admin/login');
    }
  }, []);
  
  useEffect(() => {
    // Skip admin check if we're on the login page
    if (isLoginPage) {
      setLoading(false);
      return;
    }
    
    async function checkAdminStatus() {
      try {
        console.log('Checking admin status...');
        const res = await fetch('/api/auth/check-admin');
        console.log('Admin check response:', res.status);
        
        if (res.status === 401) {
          // Not authenticated
          console.log('Not authenticated, redirecting to login');
          router.push('/admin/login');
          return;
        }
        
        const data = await res.json();
        console.log('Admin check data:', data);
        
        if (!data.isAdmin) {
          // Authenticated but not admin
          console.log('Not admin, redirecting to home');
          router.push('/?message=You do not have admin privileges');
        } else {
          console.log('Admin status confirmed');
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('Failed to check admin status:', error);
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    }
    
    checkAdminStatus();
  }, [router, isLoginPage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // If we're on the login page, render the children without the admin layout
  if (isLoginPage) {
    return children;
  }
  
  // For other admin pages, if not admin, don't render (will redirect in useEffect)
  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Admin Sidebar */}
      <div className="w-64 bg-gray-800 min-h-screen p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-purple-400">DarkChemSite</h1>
          <p className="text-gray-400 text-sm">Admin Dashboard</p>
        </div>
        
        <nav>
          <ul className="space-y-2">
            <li>
              <Link href="/admin" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors">
                <FaChartLine className="mr-3 text-purple-400" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/products" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors">
                <FaBox className="mr-3 text-purple-400" />
                Products
              </Link>
            </li>
            <li>
              <Link href="/admin/orders" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors">
                <FaShoppingCart className="mr-3 text-purple-400" />
                Orders
              </Link>
            </li>
            <li>
              <Link href="/admin/users" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors">
                <FaUsers className="mr-3 text-purple-400" />
                Users
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="mt-auto pt-8">
          <Link href="/" className="text-gray-400 hover:text-white text-sm flex items-center">
            ← Return to Website
          </Link>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
}
