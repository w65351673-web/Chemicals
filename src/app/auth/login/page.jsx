'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '@/components/auth/AuthProvider';
import toast from 'react-hot-toast';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirect);
    }
  }, [isAuthenticated, router, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        toast.success('Login successful!');
        router.push(redirect);
      } else {
        toast.error(result.message || 'Login failed');
      }
    } catch (error) {
      toast.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "bg-bone border border-ink/15 text-ink rounded-editorial py-3 px-4 pl-10 w-full focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-colors";

  return (
    <div className="min-h-screen bg-bone pt-24 pb-16">
      <div className="container-editorial py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-bone-light border border-ink/10 rounded-editorial p-8 shadow-editorial">
            <div className="text-center mb-8">
              <p className="eyebrow mb-2">Account</p>
              <h1 className="text-3xl font-serif font-medium text-ink">Login</h1>
              <p className="text-ink-muted mt-2 text-sm">
                Welcome back
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-ink-soft text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-ink-muted" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={inputClass}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-ink-soft text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-ink-muted" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={inputClass}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={loading}
                className={`w-full btn-primary justify-center ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-bone-light border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Login'
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-ink-muted">
                Don't have an account?{' '}
                <Link href="/auth/register" className="text-amber-dark hover:text-ink link-underline font-medium transition-colors">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bone pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-amber border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-serif text-lg text-ink-muted">Loading...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
