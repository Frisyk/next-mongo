import { NextRequest, NextResponse } from 'next/server';
import { syncSessionFromNextAuth } from '@/lib/stateless-next-auth';

// POST: sinkronisasi session NextAuth ke stateless session
export async function POST(request: NextRequest) {
  try {
    const result = await syncSessionFromNextAuth();
    
    if (!result) {
      return NextResponse.json({
        status: 'error',
        message: 'Tidak dapat menyinkronkan session, pengguna tidak terautentikasi'
      }, { status: 401 });
    }
    
    return NextResponse.json({
      status: 'success',
      message: 'Session berhasil disinkronkan'
    });
  } catch (error) {
    console.error('[SessionSyncAPI] Error syncing session:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Terjadi kesalahan saat menyinkronkan session'
    }, { status: 500 });
  }
} 