'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

// Fungsi untuk sinkronisasi session
async function syncSession() {
  try {
    console.log('[SessionSyncProvider] Syncing sessions...');
    const response = await fetch('/api/user/session/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      console.log('[SessionSyncProvider] Sessions synced successfully');
    } else {
      console.error('[SessionSyncProvider] Error syncing sessions:', await response.text());
    }
  } catch (error) {
    console.error('[SessionSyncProvider] Fetch error syncing sessions:', error);
  }
}

// Komponen untuk melakukan ping dan sync pada session
function SessionSync() {
  const { data: session, status } = useSession();

  useEffect(() => {
    // Jika user sudah login, sinkronkan session
    if (status === 'authenticated' && session?.user?.id) {
      console.log('[SessionSyncProvider] User authenticated, syncing session');
      syncSession();
      
      // Set interval untuk sync session setiap 15 menit
      const interval = setInterval(() => {
        syncSession();
      }, 15 * 60 * 1000); // 15 menit
      
      return () => clearInterval(interval);
    }
  }, [session, status]);

  return null; // Komponen ini tidak merender apapun
}

export default function SessionSyncProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <NextAuthSessionProvider>
      <SessionSync />
      {children}
    </NextAuthSessionProvider>
  );
} 