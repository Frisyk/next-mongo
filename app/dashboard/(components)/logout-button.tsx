'use client';

import { logout } from '@/lib/action';
import { LogOutIcon } from '@/components/ui/icons';
import Link from 'next/link';
import { LogInIcon } from 'lucide-react';
export default function LogoutButton() {
  return (
    <button
      className="flex items-center gap-3 rounded-lg dark:text-slate-400  px-3 py-2 text-sm font-medium text-slate-500 transition-all hover:text-slate-900"
      onClick={async () => {
        await logout();
      }}
    >
      <LogOutIcon className="h-4 w-4" />
      Logout
    </button>
  );
}
export function LoginButton() {
  return (
    <Link href={'/login'}
      className="flex items-center gap-3 rounded-lg dark:text-slate-400  px-3 py-2 text-sm font-medium text-slate-500 transition-all hover:text-slate-900"
    >
      <LogInIcon className="h-4 w-4" />
      Login
    </Link>
  );
}
