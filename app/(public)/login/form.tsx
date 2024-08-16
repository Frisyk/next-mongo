'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/lib/action';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';

export function LoginForm() {
  const [state, action] = useFormState(login, undefined);
  
  return (
    <form action={action} className="bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden border-4 border-blue-400 dark:border-blue-800">
      <div className="px-8 py-10 md:px-10">
        <h2 className="text-4xl font-extrabold text-center text-zinc-800 dark:text-white">
          Welcome Back!
        </h2>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mt-3">
          We missed you, sign in to continue.
        </p>
        <div className="mt-10">
          <div className="relative">
            <Label
              htmlFor="email"
              className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
            >
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
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
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
            />
            {state?.errors?.password && (
              <p className="text-sm text-red-500">{state.errors.password}</p>
            )}
          </div>
          {state?.message && (
            <p className="text-sm text-red-500">{state.message}</p>
          )}
          <LoginButton />
        </div>
      </div>
      <div className="px-8 py-4 bg-blue-200 dark:bg-zinc-800">
        <div className="text-sm text-blue-900 dark:text-blue-300 text-center">
          Dont have an account?
          <Link className="font-medium underline" href="/signup">
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
}

export function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button 
      aria-disabled={pending} 
      type="submit" 
      className="w-full px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-800 mt-4"
    >
      {pending ? 'Submitting...' : 'Lets Go'}
    </Button>
  );
}
