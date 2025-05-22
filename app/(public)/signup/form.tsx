'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signup } from '@/lib/auth';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';

export function SignupForm() {
  const [state, action] = useFormState(signup, undefined);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form action={action} className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border-2 border-slate-900 dark:border-slate-800">
      <div className="px-8 py-10 md:px-10">
        <h2 className="text-4xl font-extrabold text-center text-zinc-800 dark:text-white">
          Buat Akun Baru
        </h2>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mt-3">
          Isi form di bawah untuk membuat akun baru
        </p>
        <div className="mt-10">
          <div className="relative">
            <Label
              htmlFor="name"
              className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
            >
              Nama
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="tulis nama mu disini"
              className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-slate-500 dark:focus:border-slate-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-slate-400"
            />
            {state?.errors?.name && (
              <p className="text-sm text-red-500">{state.errors.name}</p>
            )}
          </div>
          <div className="relative">
            <Label
              htmlFor="class"
              className="block my-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
            >
              Kelas
            </Label>
            <select
              id="class"
              name="class"
              className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-slate-500 dark:focus:border-slate-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-slate-400"
            >
              <option value="" disabled selected>
                Pilih kelas
              </option>
              <option value="XA">XA</option>
              <option value="XB">XB</option>
              <option value="XC">XC</option>
              <option value="XD">XD</option>
              <option value="XE">XE</option>
              <option value="XF">XF</option>
            </select>
            {state?.errors?.name && (
              <p className="text-sm text-red-500">{state.errors.name}</p>
            )}
          </div>

          <div className="mt-6">
            <Label
              htmlFor="email"
              className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
            >
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="john@example.com"
              className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-slate-500 dark:focus:border-slate-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-slate-400"
            />
            {state?.errors?.email && (
              <p className="text-sm text-red-500">{state.errors.email}</p>
            )}
          </div>
          <div className="mt-6">
            <Label
              htmlFor="password"
              className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-slate-500 dark:focus:border-slate-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-slate-400"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-zinc-600 dark:text-zinc-200 hover:text-zinc-800 dark:hover:text-zinc-100 focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {state?.errors?.password && (
              <div className="text-sm text-red-500 mt-2">
                <p>Password must:</p>
                <ul>
                  {state.errors.password.map((error) => (
                    <li key={error}>- {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {state?.message && (
            <p className="text-sm text-red-500 mt-2">{state.message}</p>
          )}
          <SignupButton />
        </div>
      </div>
      <div className="px-8 py-4 bg-slate-200 dark:bg-zinc-800">
        <div className="text-sm text-slate-900 dark:text-slate-300 text-center">
          Sudah Punya Akun?
          <Link prefetch={false} className="font-medium underline" href="/login">
            Login
          </Link>
        </div>
      </div>
    </form>
  );
}

export function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <Button 
      aria-disabled={pending} 
      type="submit" 
      className="w-full px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-gradient-to-r from-slate-600 to-slate-500 rounded-lg hover:from-slate-700 hover:to-slate-600 focus:outline-none focus:ring-4 focus:ring-slate-400 dark:focus:ring-slate-800 mt-4"
    >
      {pending ? 'Tunggu Sebentar...' : 'Doftar Akun'}
    </Button>
  );
}
