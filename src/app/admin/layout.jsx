'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaBox, FaShoppingCart, FaUsers, FaChartLine, FaBars, FaTimes } from 'react-icons/fa';

const NAV_LINKS = [
  { href: '/admin', label: 'Dashboard', icon: FaChartLine },
  { href: '/admin/products', label: 'Products', icon: FaBox },
  { href: '/admin/orders', label: 'Orders', icon: FaShoppingCart },
  { href: '/admin/users', label: 'Users', icon: FaUsers },
];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hasCheckedAdmin = useRef(false);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    if (hasCheckedAdmin.current) {
      return;
    }

    async function checkAdminStatus() {
      try {
        const res = await fetch('/api/auth/check-admin');

        if (res.status === 401) {
          router.push('/admin/login');
          return;
        }

        const data = await res.json();

        if (!data.isAdmin) {
          router.push('/?message=You do not have admin privileges');
        } else {
          setIsAdmin(true);
          hasCheckedAdmin.current = true;
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
      <div className="min-h-screen bg-bone text-ink flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-amber border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-serif text-lg text-ink-muted">Verifying admin access…</p>
        </div>
      </div>
    );
  }

  if (isLoginPage) {
    return children;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-bone text-ink">
      {/* Mobile Header */}
      <div className="lg:hidden bg-bone-light border-b border-ink/10 p-4 flex items-center justify-between sticky top-0 z-50">
        <div>
          <h1 className="text-xl font-serif font-medium text-ink">ChemicalsSite</h1>
          <p className="text-ink-muted text-xs uppercase tracking-editorial">Admin</p>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-ink p-2 hover:bg-bone-dark rounded-editorial transition-colors"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className="flex">
        {/* Admin Sidebar - Desktop */}
        <div className="hidden lg:flex flex-col w-72 bg-bone-light border-r border-ink/10 min-h-screen p-6 sticky top-0 h-screen overflow-y-auto">
          <div className="mb-10">
            <Link href="/admin" className="inline-block">
              <h1 className="text-2xl font-serif font-medium text-ink">ChemicalsSite</h1>
            </Link>
            <p className="text-ink-muted text-xs uppercase tracking-editorial mt-1">Admin Dashboard</p>
          </div>

          <nav className="flex-1">
            <ul className="space-y-1">
              {NAV_LINKS.map(({ href, label, icon: Icon }) => {
                const active = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`flex items-center p-3 rounded-editorial transition-all duration-300 ${
                        active
                          ? 'bg-ink text-bone-light'
                          : 'text-ink-soft hover:bg-bone-dark hover:text-ink'
                      }`}
                    >
                      <Icon className={`mr-3 ${active ? 'text-amber' : 'text-ink-muted'}`} />
                      <span className="text-sm font-medium">{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="pt-6 border-t border-ink/10">
            <Link
              href="/"
              className="text-ink-muted hover:text-ink text-sm flex items-center transition-colors"
            >
              ← Return to Website
            </Link>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-ink/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className="bg-bone-light w-72 h-full p-6 overflow-y-auto border-r border-ink/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-8">
                <h1 className="text-xl font-serif font-medium text-ink">ChemicalsSite</h1>
                <p className="text-ink-muted text-xs uppercase tracking-editorial mt-1">Admin</p>
              </div>

              <nav>
                <ul className="space-y-1">
                  {NAV_LINKS.map(({ href, label, icon: Icon }) => {
                    const active = pathname === href || pathname.startsWith(`${href}/`);
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center p-3 rounded-editorial transition-all duration-300 ${
                            active
                              ? 'bg-ink text-bone-light'
                              : 'text-ink-soft hover:bg-bone-dark hover:text-ink'
                          }`}
                        >
                          <Icon className={`mr-3 ${active ? 'text-amber' : 'text-ink-muted'}`} />
                          <span className="text-sm font-medium">{label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-8 pt-6 border-t border-ink/10">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-ink-muted hover:text-ink text-sm flex items-center"
                >
                  ← Return to Website
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-10 overflow-x-hidden bg-bone min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
