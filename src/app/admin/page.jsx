'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBox, FaShoppingCart, FaUsers, FaDollarSign } from 'react-icons/fa';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const res = await fetch('/api/admin/dashboard');
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <div className="bg-purple-500/20 p-3 rounded-lg mr-4">
              <FaBox className="text-purple-400 text-xl" />
            </div>
            <h2 className="text-lg font-semibold">Products</h2>
          </div>
          <p className="text-3xl font-bold">{stats.totalProducts}</p>
          <Link href="/admin/products" className="text-purple-400 text-sm mt-2 inline-block hover:underline">
            Manage Products →
          </Link>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <div className="bg-purple-500/20 p-3 rounded-lg mr-4">
              <FaShoppingCart className="text-purple-400 text-xl" />
            </div>
            <h2 className="text-lg font-semibold">Orders</h2>
          </div>
          <p className="text-3xl font-bold">{stats.totalOrders}</p>
          <Link href="/admin/orders" className="text-purple-400 text-sm mt-2 inline-block hover:underline">
            View All Orders →
          </Link>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <div className="bg-purple-500/20 p-3 rounded-lg mr-4">
              <FaUsers className="text-purple-400 text-xl" />
            </div>
            <h2 className="text-lg font-semibold">Users</h2>
          </div>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
          <Link href="/admin/users" className="text-purple-400 text-sm mt-2 inline-block hover:underline">
            Manage Users →
          </Link>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <div className="bg-purple-500/20 p-3 rounded-lg mr-4">
              <FaDollarSign className="text-purple-400 text-xl" />
            </div>
            <h2 className="text-lg font-semibold">Revenue</h2>
          </div>
          <p className="text-3xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
          <span className="text-gray-400 text-sm mt-2 inline-block">
            Total Sales
          </span>
        </div>
      </div>
      
      {/* Recent Orders */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        
        {stats.recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-700">
                  <th className="pb-3 pr-4">Order ID</th>
                  <th className="pb-3 pr-4">Customer</th>
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3 pr-4">Amount</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order._id} className="border-b border-gray-700">
                    <td className="py-3 pr-4">#{order._id.slice(-6)}</td>
                    <td className="py-3 pr-4">{order.user?.name || 'Guest User'}</td>
                    <td className="py-3 pr-4">{new Date(order.createdAt || Date.now()).toLocaleDateString()}</td>
                    <td className="py-3 pr-4">${(order.total || order.totalPrice || 0).toFixed(2)}</td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        (order.status || '') === 'completed' ? 'bg-green-500/20 text-green-400' :
                        (order.status || '') === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                        (order.status || '') === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {(order.status || 'pending').charAt(0).toUpperCase() + (order.status || 'pending').slice(1)}
                      </span>
                    </td>
                    <td className="py-3">
                      <Link href={`/admin/orders/${order._id}`} className="text-purple-400 hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400">No recent orders found.</p>
        )}
        
        <div className="mt-4 text-right">
          <Link href="/admin/orders" className="text-purple-400 hover:underline">
            View All Orders →
          </Link>
        </div>
      </div>
    </div>
  );
}
