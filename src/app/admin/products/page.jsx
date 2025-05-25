'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // For specific operations like delete
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null); // For success/error messages

  const fetchProducts = async (page = 1, search = '') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/products?page=${page}&search=${search}`);
      const data = await res.json();
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, searchTerm);
  }, [currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts(1, searchTerm);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    
    try {
      setIsLoading(true); // Show loading state
      
      const res = await fetch(`/api/admin/products/${productToDelete._id}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        // Success - remove product from list
        setProducts(products.filter(p => p._id !== productToDelete._id));
        setShowDeleteModal(false);
        setProductToDelete(null);
        setAlertMessage({ type: 'success', text: 'Product deleted successfully' });
      } else {
        // Handle error response
        let errorMessage = 'Failed to delete product';
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // If parsing JSON fails, use status text
          errorMessage = `Failed to delete product: ${res.statusText}`;
        }
        
        setAlertMessage({ type: 'error', text: errorMessage });
        console.error(errorMessage);
      }
    } catch (error) {
      // Handle network/unexpected errors
      const errorMessage = `Error deleting product: ${error.message || 'Unknown error'}`;
      setAlertMessage({ type: 'error', text: errorMessage });
      console.error(errorMessage);
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  // Clear alert message after 5 seconds
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  return (
    <div>
      {/* Alert Message */}
      {alertMessage && (
        <div className={`mb-4 p-4 rounded-md ${alertMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {alertMessage.text}
        </div>
      )}
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link 
          href="/admin/products/new" 
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <FaPlus className="mr-2" /> Add Product
        </Link>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <form onSubmit={handleSearch} className="flex">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search products..."
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
      </div>
      
      {/* Products Table */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {products && products.length > 0 ? (
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 bg-gray-700">
                      <th className="p-4">Image</th>
                      <th className="p-4">Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4">Featured</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id} className="border-b border-gray-700 hover:bg-gray-750">
                        <td className="p-4">
                          <div className="relative h-12 w-12 rounded overflow-hidden bg-gray-700">
                            {product.images && product.images[0] ? (
                              <Image 
                                src={product.images[0]} 
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-500">
                                <span className="text-xs">No image</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4 font-medium">{product.name}</td>
                        <td className="p-4 text-gray-300">{product.category}</td>
                        <td className="p-4">${product.price.toFixed(2)}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            product.countInStock > 10 ? 'bg-green-500/20 text-green-400' :
                            product.countInStock > 0 ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {product.countInStock > 0 ? `${product.countInStock} in stock` : 'Out of stock'}
                          </span>
                        </td>
                        <td className="p-4">
                          {product.featured ? (
                            <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs">
                              Featured
                            </span>
                          ) : (
                            <span className="bg-gray-600/20 text-gray-400 px-2 py-1 rounded-full text-xs">
                              Not Featured
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <Link 
                              href={`/admin/products/edit/${product._id}`}
                              className="text-blue-400 hover:text-blue-300"
                              title="Edit"
                            >
                              <FaEdit />
                            </Link>
                            <button
                              onClick={() => handleDeleteClick(product)}
                              className="text-red-400 hover:text-red-300"
                              title="Delete"
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
              <p className="text-gray-400 mb-4">No products found.</p>
              <Link 
                href="/admin/products/new" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg inline-flex items-center"
              >
                <FaPlus className="mr-2" /> Add Your First Product
              </Link>
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
              Are you sure you want to delete <span className="font-semibold">{productToDelete?.name}</span>? 
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
