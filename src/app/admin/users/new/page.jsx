'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaSave } from 'react-icons/fa';

export default function NewUser() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field-specific error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Prepare data for API (exclude confirmPassword)
      const { confirmPassword, ...userData } = formData;
      
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to create user');
      }
      
      // Redirect to users list on success
      router.push('/admin/users');
    } catch (err) {
      console.error('Error creating user:', err);
      setError(err.message || 'Failed to create user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (error) =>
    `w-full bg-bone border border-ink/15 text-ink px-4 py-2.5 rounded-editorial focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-colors text-sm ${
      error ? 'border-red-500 bg-red-50/20' : ''
    }`;

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="eyebrow mb-1">Administration</p>
          <h1 className="text-2xl font-serif font-medium text-ink">Add New User</h1>
        </div>
        <Link
          href="/admin/users"
          className="flex items-center text-ink-muted hover:text-ink text-sm transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back to Users
        </Link>
      </header>

      {error && (
        <div className="bg-amber-wash border border-amber/30 text-amber-dark p-4 rounded-editorial text-sm">
          {error}
        </div>
      )}

      <div className="bg-bone-light border border-ink/10 rounded-editorial p-6 shadow-editorial">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-ink-soft text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass(formErrors.name)}
                placeholder="Enter user's full name"
              />
              {formErrors.name && (
                <p className="mt-1 text-red-700 text-sm">{formErrors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-ink-soft text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClass(formErrors.email)}
                placeholder="user@example.com"
              />
              {formErrors.email && (
                <p className="mt-1 text-red-700 text-sm">{formErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-ink-soft text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={inputClass(formErrors.password)}
                placeholder="Enter password"
              />
              {formErrors.password && (
                <p className="mt-1 text-red-700 text-sm">{formErrors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-ink-soft text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={inputClass(formErrors.confirmPassword)}
                placeholder="Confirm password"
              />
              {formErrors.confirmPassword && (
                <p className="mt-1 text-red-700 text-sm">{formErrors.confirmPassword}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-ink-soft text-sm font-medium mb-2">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-bone border border-ink/15 text-ink px-4 py-2.5 rounded-editorial focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-colors text-sm"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-ink/10">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-bone-light border-t-transparent rounded-full animate-spin mr-2"></div>
                  Saving…
                </>
              ) : (
                <>
                  <FaSave className="mr-2" />
                  Save User
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
