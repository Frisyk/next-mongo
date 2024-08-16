'use client';

import { logout } from '@/lib/action';
import { LogOutIcon } from '@/components/ui/icons';
export default function LogoutButton() {
  return (
    <button
      className="flex items-center gap-3 rounded-lg dark:text-purple-400  px-3 py-2 text-sm font-medium text-purple-500 transition-all hover:text-purple-900"
      onClick={async () => {
        await logout();
      }}
    >
      <LogOutIcon className="h-4 w-4" />
      Logout
    </button>
  );
}
