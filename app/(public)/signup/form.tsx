'use client';

import { FormState, SignupFormSchema } from '@/lib/definitions';
import { useFormState, useFormStatus } from 'react-dom';
import { signup } from '@/lib/auth';
import Link from 'next/link';
import { useState } from 'react';
import { LuEye, LuEyeOff } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { signIn } from 'next-auth/react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold rounded-md shadow-md transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? 'Mendaftar...' : 'Daftar Sekarang'}
    </button>
  );
}

export function SignupForm() {
  const [errorMessage, dispatch] = useFormState(signup, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Buat Akun Baru</h1>
        
        <button
          onClick={() => signIn('google')}
          className="w-full mb-4 flex items-center justify-center gap-2 py-3 px-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold rounded-md border border-gray-300 shadow-sm transition-all duration-300"
        >
          <FcGoogle className="text-xl" />
          <span>Daftar dengan Google</span>
        </button>
        
        <div className="relative flex items-center justify-center mb-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-sm text-gray-500 dark:text-gray-400">atau</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        
        <form action={dispatch} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nama
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Nama Lengkap"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-slate-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errorMessage?.errors?.name && (
              <p className="text-red-500 text-sm mt-1">{errorMessage.errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="class" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Kelas
            </label>
            <input
              id="class"
              name="class"
              type="text"
              required
              placeholder="Kelas/Kelompok"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-slate-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errorMessage?.errors?.class && (
              <p className="text-red-500 text-sm mt-1">{errorMessage.errors.class}</p>
            )}
          </div>

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
            {errorMessage?.errors?.email && (
              <p className="text-red-500 text-sm mt-1">{errorMessage.errors.email}</p>
            )}
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
                autoComplete="new-password"
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
            {errorMessage?.errors?.password && (
              <p className="text-red-500 text-sm mt-1">{errorMessage.errors.password}</p>
            )}
          </div>

          {errorMessage?.message && (
            <div className="p-2 text-sm text-red-500 dark:text-red-400 rounded-md text-center">
              {errorMessage.message}
            </div>
          )}

          <SubmitButton />
        </form>
        
        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          Sudah memiliki akun?{' '}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 hover:underline"
          >
            Masuk disini
          </Link>
        </p>
      </div>
    </div>
  );
}
