'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
function LoginRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Get all current query parameters
    const params = new URLSearchParams();
    searchParams.forEach((value, key) => {
      params.append(key, value);
    });
    
    // Redirect to the admin/dashboard login page with all query parameters
    router.replace(`/admin/login?${params.toString()}`);
  }, [router, searchParams]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-bone">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-amber border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-ink-muted">Redirecting to login page...</p>
      </div>
    </div>
  );
}

export default function LoginRedirect() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-bone">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-amber border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-ink-muted">Loading...</p>
        </div>
      </div>
    }>
      <LoginRedirectContent />
    </Suspense>
  );
}
