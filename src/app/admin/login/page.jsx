'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      console.log('Attempting admin login with:', { username });
      
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      console.log('Login response:', response.status, data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Success - redirect to admin dashboard
      console.log('Login successful');
      
      // Add a small delay before redirecting to ensure cookie is set
      setTimeout(() => {
        router.push('/admin');
      }, 500);
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bone flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-bone-light border border-ink/10 rounded-editorial p-8 shadow-editorial">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-serif font-medium text-ink mb-2">Admin Login</h1>
          <p className="text-ink-muted text-sm uppercase tracking-editorial">ChemicalsSite Dashboard</p>
        </div>

        {error && (
          <div className="bg-amber-wash border border-amber/30 text-amber-dark p-4 rounded-editorial mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-ink-soft text-sm mb-2 font-medium">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-bone border border-ink/15 text-ink px-4 py-3 rounded-editorial focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-colors"
              placeholder="Enter admin username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-ink-soft text-sm mb-2 font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-bone border border-ink/15 text-ink px-4 py-3 rounded-editorial focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-colors"
              placeholder="Enter admin password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink text-bone-light font-medium py-3 px-4 rounded-editorial hover:bg-ink-soft transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Login to Dashboard'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/" className="text-ink-muted hover:text-ink text-sm transition-colors link-underline">
            Return to Main Site
          </Link>
        </div>
      </div>
    </div>
  );
}
