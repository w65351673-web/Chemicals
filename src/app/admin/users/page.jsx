'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaSearch, FaUserEdit, FaTrash, FaUserPlus } from 'react-icons/fa';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [error, setError] = useState('');

  const fetchUsers = async (page = 1, search = '') => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/users?page=${page}&search=${search}`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await res.json();
      setUsers(data.users || []);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || 1);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users. Please try again.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, searchTerm);
  }, [currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchUsers(1, searchTerm);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    
    try {
      const res = await fetch(`/api/admin/users/${userToDelete._id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) {
        throw new Error('Failed to delete user');
      }
      
      // Refresh user list
      fetchUsers(currentPage, searchTerm);
      setShowDeleteModal(false);
      setUserToDelete(null);
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user. Please try again.');
    }
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Use the fetched users directly
  const displayUsers = users;

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="eyebrow mb-1">Administration</p>
          <h1 className="text-2xl font-serif font-medium text-ink">User Management</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users..."
              className="bg-bone border border-ink/15 border-r-0 text-ink px-4 py-2.5 rounded-l-[2px] focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-colors text-sm"
            />
            <button
              type="submit"
              className="bg-ink text-bone-light px-4 py-2.5 rounded-r-[2px] hover:bg-ink-soft transition-colors"
            >
              <FaSearch />
            </button>
          </form>

          <Link
            href="/admin/users/new"
            className="btn-primary"
          >
            <FaUserPlus className="mr-2" />
            Add User
          </Link>
        </div>
      </header>

      {error && (
        <div className="bg-amber-wash border border-amber/30 text-amber-dark p-4 rounded-editorial text-sm">
          {error}
        </div>
      )}

      {/* Users Table */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-2 border-amber border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {displayUsers && displayUsers.length > 0 ? (
            <div className="bg-bone-light border border-ink/10 rounded-editorial overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-ink-muted border-b border-ink/10 bg-bone/50">
                      <th className="p-4 font-normal">Name</th>
                      <th className="p-4 font-normal">Email</th>
                      <th className="p-4 font-normal">Role</th>
                      <th className="p-4 font-normal">Joined</th>
                      <th className="p-4 font-normal">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayUsers.map((user) => (
                      <tr key={user._id} className="border-b border-ink/5 last:border-0 hover:bg-bone/50 transition-colors">
                        <td className="p-4 font-medium text-ink-soft">{user.name}</td>
                        <td className="p-4 text-ink-muted">{user.email}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs ${
                            user.role === 'admin'
                              ? 'bg-ink text-bone-light'
                              : 'bg-ink/5 text-ink-muted'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4 text-ink-muted">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Link
                              href={`/admin/users/edit/${user._id}`}
                              className="text-ink-muted hover:text-ink p-1.5 hover:bg-bone-deep rounded-editorial transition-colors"
                              title="Edit User"
                            >
                              <FaUserEdit size={18} />
                            </Link>
                            <button
                              onClick={() => handleDeleteClick(user)}
                              className="text-ink-muted hover:text-red-700 p-1.5 hover:bg-bone-deep rounded-editorial transition-colors disabled:opacity-40"
                              title="Delete User"
                              disabled={user.role === 'admin'}
                            >
                              <FaTrash size={18} />
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
                <div className="flex justify-center p-4 border-t border-ink/10">
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 rounded-editorial bg-bone border border-ink/10 text-ink-soft hover:bg-bone-deep disabled:opacity-40 text-sm transition-colors"
                    >
                      Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1.5 rounded-editorial text-sm ${
                          currentPage === page
                            ? 'bg-ink text-bone-light'
                            : 'bg-bone border border-ink/10 text-ink-soft hover:bg-bone-deep'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 rounded-editorial bg-bone border border-ink/10 text-ink-soft hover:bg-bone-deep disabled:opacity-40 text-sm transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-bone-light border border-ink/10 p-8 rounded-editorial text-center">
              <p className="text-ink-muted mb-4">No users found.</p>
              <Link
                href="/admin/users/new"
                className="btn-primary"
              >
                Add Your First User
              </Link>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-ink/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-bone-light border border-ink/10 rounded-editorial max-w-md w-full p-6 shadow-editorial-lg">
            <h3 className="text-xl font-serif font-medium text-ink mb-4">Confirm Deletion</h3>
            <p className="text-ink-muted mb-8">
              Are you sure you want to delete the user <span className="font-medium text-ink-soft">{userToDelete?.name}</span>?
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-bone border border-ink/15 text-ink-soft rounded-editorial hover:border-ink/30 hover:text-ink transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-700 text-bone-light rounded-editorial hover:bg-red-800 transition-colors text-sm"
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
