import type { Metadata } from 'next';
import { Suspense } from 'react';
import { requireAuth } from '@/lib/auth';
import Navbar from '@/components/dashboard/Navbar';
import Sidebar from '@/components/dashboard/Sidebar';
import Loading from '@/components/ui/Loading';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard aplikasi belajar batik',
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Verifikasi autentikasi user sebelum render
  const user = await requireAuth();
  
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-slate-900">
      {/* Sidebar */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar user={user} />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
} 