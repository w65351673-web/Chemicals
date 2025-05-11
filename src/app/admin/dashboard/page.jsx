'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaBox, FaShoppingCart, FaUsers, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0
  });

  useEffect(() => {
    // In a real application, you would fetch actual stats from your API
    // For now, we'll just simulate loading and set some dummy data
    const timer = setTimeout(() => {
      setStats({
        products: 24,
        orders: 18,
        users: 45,
        revenue: 4599.99
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/logout', {
        method: 'POST'
      });
      
      if (response.ok) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-800 shadow-lg z-10">
        <div className="p-6 bg-purple-600">
          <h1 className="text-xl font-bold text-white">MidnightChems</h1>
          <p className="text-purple-200 text-sm">Admin Dashboard</p>
        </div>
        
        <nav className="mt-6 px-4">
          <Link 
            href="/admin/dashboard" 
            className="flex items-center px-4 py-3 text-white bg-gray-700 rounded-lg mb-2"
          >
            <FaTachometerAlt className="mr-3" />
            Dashboard
          </Link>
          
          <Link 
            href="/admin/dashboard/products" 
            className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg mb-2"
          >
            <FaBox className="mr-3" />
            Products
          </Link>
          
          <Link 
            href="/admin/dashboard/orders" 
            className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg mb-2"
          >
            <FaShoppingCart className="mr-3" />
            Orders
          </Link>
          
          <Link 
            href="/admin/dashboard/users" 
            className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg mb-2"
          >
            <FaUsers className="mr-3" />
            Users
          </Link>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg mt-6"
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </button>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-gray-400 mt-2">
            Welcome to your MidnightChems admin dashboard
          </p>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-300">Products</h3>
                  <div className="bg-purple-600/20 p-3 rounded-lg">
                    <FaBox className="text-purple-500" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-white">{stats.products}</p>
                <p className="text-gray-400 text-sm mt-2">Total products in stock</p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-300">Orders</h3>
                  <div className="bg-blue-600/20 p-3 rounded-lg">
                    <FaShoppingCart className="text-blue-500" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-white">{stats.orders}</p>
                <p className="text-gray-400 text-sm mt-2">Total orders received</p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-300">Users</h3>
                  <div className="bg-green-600/20 p-3 rounded-lg">
                    <FaUsers className="text-green-500" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-white">{stats.users}</p>
                <p className="text-gray-400 text-sm mt-2">Registered users</p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-300">Revenue</h3>
                  <div className="bg-yellow-600/20 p-3 rounded-lg">
                    <span className="text-yellow-500 font-bold">$</span>
                  </div>
                </div>
                <p className="text-3xl font-bold text-white">${stats.revenue.toFixed(2)}</p>
                <p className="text-gray-400 text-sm mt-2">Total revenue</p>
              </div>
            </div>
            
            {/* Recent activity */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-700/50 rounded-lg">
                  <div className="bg-purple-600/20 p-2 rounded-lg mr-4">
                    <FaShoppingCart className="text-purple-500" />
                  </div>
                  <div>
                    <p className="text-white">New order received</p>
                    <p className="text-gray-400 text-sm">Order #ORD-123456 - $79.99</p>
                  </div>
                  <p className="text-gray-400 text-sm ml-auto">2 hours ago</p>
                </div>
                
                <div className="flex items-center p-3 bg-gray-700/50 rounded-lg">
                  <div className="bg-blue-600/20 p-2 rounded-lg mr-4">
                    <FaUsers className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white">New user registered</p>
                    <p className="text-gray-400 text-sm">user@example.com</p>
                  </div>
                  <p className="text-gray-400 text-sm ml-auto">5 hours ago</p>
                </div>
                
                <div className="flex items-center p-3 bg-gray-700/50 rounded-lg">
                  <div className="bg-green-600/20 p-2 rounded-lg mr-4">
                    <FaBox className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-white">Product stock updated</p>
                    <p className="text-gray-400 text-sm">Cannabinoid X - 15 units added</p>
                  </div>
                  <p className="text-gray-400 text-sm ml-auto">1 day ago</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
