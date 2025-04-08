'use client';

import { FormState, LoginFormSchema } from '@/lib/definitions';
import { useFormState, useFormStatus } from 'react-dom';
import { login } from '@/lib/auth';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { LuEye, LuEyeOff } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold rounded-md shadow-md transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? 'Masuk...' : 'Masuk'}
    </button>
  );
}

export function LoginForm() {
  const [errorMessage, dispatch] = useFormState(login, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  useEffect(() => {
    // Handle different error types from NextAuth
    if (error) {
      console.log("[Login] Error from URL params:", error);
      
      switch (error) {
        case 'signup_required':
          toast.info('Email belum terdaftar. Silakan mendaftar terlebih dahulu!', {
            autoClose: 3000,
            onClose: () => router.push('/signup')
          });
          break;
        case 'use_google_login':
          toast.info('Akun ini terdaftar melalui Google. Silakan gunakan tombol "Masuk dengan Google"');
          break;
        case 'invalid_password':
          toast.error('Password yang Anda masukkan salah. Silakan coba lagi.');
          break;
        case 'OAuthAccountNotLinked':
          toast.error('Email ini sudah terdaftar dengan metode login yang berbeda. Silakan gunakan metode login yang sesuai.');
          break;
        case 'OAuthSignin':
        case 'OAuthCallback':
        case 'OAuthCreateAccount':
          toast.error('Terjadi kesalahan saat login dengan Google. Silakan coba lagi.');
          break;
        default:
          toast.error(`Terjadi kesalahan saat login: ${error}. Silakan coba lagi.`);
      }
    }
  }, [error, router]);

  const handleGoogleSignIn = async () => {
    try {
      console.log("[Login] Attempting Google sign in");
      setIsLoading(true);
      
      // Dapatkan callbackUrl dari query string atau gunakan default
      const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
      console.log("[Login] Using callbackUrl:", callbackUrl);
      
      // Google login dengan redirect
      signIn('google', { 
        callbackUrl: callbackUrl
      });
      
      // Kode dibawah tidak akan dieksekusi karena redirect
    } catch (error) {
      console.error("[Login] Unhandled Google sign in error:", error);
      toast.error('Terjadi kesalahan saat login dengan Google. Silakan coba lagi.');
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      console.log("[Login] Attempting credentials sign in");
      setIsLoading(true);
      
      // Dapatkan callbackUrl dari query string atau gunakan default
      const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
      console.log("[Login] Using callbackUrl:", callbackUrl);
      
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.get('email'),
        password: formData.get('password'),
        callbackUrl: callbackUrl
      });
      
      console.log("[Login] Credentials sign in result:", result);
      
      if (result?.error) {
        console.error("[Login] Credentials sign in error:", result.error);
        
        // Handle errors dari NextAuth
        switch (result.error) {
          case 'signup_required':
            toast.info('Email belum terdaftar. Silakan mendaftar terlebih dahulu!', {
              autoClose: 3000,
              onClose: () => router.push('/signup')
            });
            break;
          case 'use_google_login':
            toast.info('Akun ini terdaftar melalui Google. Silakan gunakan tombol "Masuk dengan Google"');
            break;
          case 'invalid_password':
            toast.error('Password yang Anda masukkan salah. Silakan coba lagi.');
            break;
          default:
            toast.error(`Login gagal: ${result.error}`);
        }
      } else if (result?.url) {
        // Gunakan router.push agar context client-side dipertahankan
        // dan cookie session dapat dikirim dengan benar
        router.push(result.url);
      }
    } catch (error) {
      console.error("[Login] Unhandled credentials sign in error:", error);
      toast.error('Terjadi kesalahan saat login. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <ToastContainer position="top-center" theme="colored" />
      <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Masuk</h1>
        
        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full mb-4 flex items-center justify-center gap-2 py-3 px-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold rounded-md border border-gray-300 shadow-sm transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <FcGoogle className="text-xl" />
          <span>{isLoading ? 'Memproses...' : 'Masuk dengan Google'}</span>
        </button>
        
        <div className="relative flex items-center justify-center mb-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-sm text-gray-500 dark:text-gray-400">atau</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="contoh@email.com"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-slate-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-slate-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
              >
                {showPassword ? <LuEyeOff /> : <LuEye />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Ingat saya
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                Lupa password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold rounded-md shadow-md transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>
        
        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          Belum memiliki akun?{' '}
          <Link
            href="/signup"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 hover:underline"
          >
            Daftar disini
          </Link>
        </p>
      </div>
    </div>
  );
}

