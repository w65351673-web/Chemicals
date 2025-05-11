'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaSearch, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

export default function AdminOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchOrders = async (page = 1, search = '', status = 'all') => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        search: search || '',
        status: status !== 'all' ? status : ''
      }).toString();
      
      const res = await fetch(`/api/admin/orders?${queryParams}`);
      
      if (!res.ok) {
        throw new Error(`Error fetching orders: ${res.status}`);
      }
      
      const data = await res.json();
      setOrders(data.orders || []);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || 1);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage, searchTerm, statusFilter);
  }, [currentPage, statusFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchOrders(1, searchTerm, statusFilter);
  };

  const handleDeleteClick = (order) => {
    setOrderToDelete(order);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!orderToDelete) return;
    
    try {
      const res = await fetch(`/api/admin/orders/${orderToDelete._id}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        // Show success message
        alert('Order deleted successfully');
        
        // Update the orders list
        setOrders(orders.filter(o => o._id !== orderToDelete._id));
        setShowDeleteModal(false);
        setOrderToDelete(null);
      } else {
        const error = await res.json();
        console.error('Failed to delete order:', error.message || 'Unknown error');
        alert(`Failed to delete order: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      alert(`Error deleting order: ${error.message || 'Unknown error'}`);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/update-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (res.ok) {
        // Update the order in the local state
        const data = await res.json();
        setOrders(orders.map(order => 
          order._id === orderId ? { ...order, status: newStatus, ...data.order } : order
        ));
      } else {
        const error = await res.json();
        console.error('Failed to update order status:', error.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'processing':
        return 'bg-blue-500/20 text-blue-400';
      case 'shipped':
        return 'bg-indigo-500/20 text-indigo-400';
      case 'delivered':
        return 'bg-green-500/20 text-green-400';
      case 'completed':
        return 'bg-purple-500/20 text-purple-400';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Orders</h1>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <form onSubmit={handleSearch} className="flex">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full bg-gray-700 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button 
              type="submit"
              className="ml-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
            >
              Search
            </button>
          </form>
          
          <div className="flex items-center space-x-2">
            <span className="text-gray-300">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Orders Table */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {filteredOrders.length > 0 ? (
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 bg-gray-700">
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order._id} className="border-b border-gray-700 hover:bg-gray-750">
                        <td className="p-4 font-medium">#{order._id.slice(-6)}</td>
                        <td className="p-4">
                          {order.user ? (
                            <div>
                              <div className="font-medium">{order.user.name}</div>
                              <div className="text-gray-400 text-sm">{order.user.email}</div>
                            </div>
                          ) : (
                            <span className="text-gray-400">Unknown</span>
                          )}
                        </td>
                        <td className="p-4 text-gray-300">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 font-medium">${order.totalPrice.toFixed(2)}</td>
                        <td className="p-4">
                          <div className="flex items-center">
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order._id, e.target.value)}
                              className="ml-2 bg-gray-700 text-white text-xs px-2 py-1 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>
                        </td>
                        <td className="p-4">
                          {order.isPaid ? (
                            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                              Paid
                            </span>
                          ) : (
                            <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs">
                              Not Paid
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <Link 
                              href={`/admin/orders/${order._id}`}
                              className="text-blue-400 hover:text-blue-300 p-1 hover:bg-gray-700 rounded"
                              title="View Order Details"
                            >
                              <FaEye />
                            </Link>
                            <button 
                              onClick={() => {
                                // Navigate to the order details page with edit mode activated
                                router.push(`/admin/orders/${order._id}?edit=true`);
                              }}
                              className="text-green-400 hover:text-green-300 p-1 hover:bg-gray-700 rounded"
                              title="Edit Order"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(order)}
                              className="text-red-400 hover:text-red-300 p-1 hover:bg-gray-700 rounded"
                              title="Delete Order"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-4 flex justify-center">
                  <div className="flex space-x-1">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
                    >
                      Prev
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded ${
                          currentPage === i + 1 ? 'bg-purple-600 text-white' : 'bg-gray-700 text-white'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-800 p-8 rounded-lg text-center">
              <p className="text-gray-400 mb-4">No orders found.</p>
            </div>
          )}
        </>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete order #{orderToDelete?._id.slice(-6)}? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
