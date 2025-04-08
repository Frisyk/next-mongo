import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// GET endpoint: cek status session
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    console.log('[SessionAPI] Session check', session ? 'Session exists' : 'No session found');
    
    if (session && session.user) {
      return NextResponse.json({
        status: 'authenticated',
        user: {
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
          isAdmin: session.user.isAdmin,
        }
      });
    }
    
    return NextResponse.json({
      status: 'unauthenticated',
      message: 'User tidak terautentikasi'
    }, { status: 401 });
  } catch (error) {
    console.error('[SessionAPI] Error checking session:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Terjadi kesalahan saat memeriksa session'
    }, { status: 500 });
  }
}

// POST endpoint: update session cookie
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Jika tidak ada session, kembalikan error
    if (!session) {
      return NextResponse.json({
        status: 'error',
        message: 'Tidak ada session yang aktif'
      }, { status: 401 });
    }
    
    // Session masih valid, kita sebenarnya tidak perlu melakukan apa-apa
    // karena NextAuth akan memperpanjang session secara otomatis
    // Endpoint ini hanya untuk memperbarui timestamp aktivitas terbaru
    
    console.log('[SessionAPI] Session refresh for user:', session.user.id);
    
    return NextResponse.json({
      status: 'success',
      message: 'Session berhasil diperbarui'
    });
  } catch (error) {
    console.error('[SessionAPI] Error refreshing session:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Terjadi kesalahan saat memperbarui session'
    }, { status: 500 });
  }
} 