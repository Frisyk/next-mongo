'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { useEffect } from 'react';

// Fungsi untuk melakukan ping ke server untuk refresh session
async function pingSession() {
  try {
    await fetch('/api/user/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // Tidak perlu menghandle respons, kita hanya ingin memastikan cookie dikirim
  } catch (error) {
    console.error('[SessionProvider] Error refreshing session:', error);
  }
}

export default function SessionProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  useEffect(() => {
    // Ping sesi ketika komponen dimuat
    pingSession();

    // Set interval untuk ping sesi setiap 5 menit untuk menjaga sesi tetap hidup
    const interval = setInterval(() => {
      pingSession();
    }, 5 * 60 * 1000); // 5 menit

    return () => clearInterval(interval);
  }, []);

  return (
    <NextAuthSessionProvider>
      {children}
    </NextAuthSessionProvider>
  );
} 