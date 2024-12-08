'use client';

import { logout } from '@/lib/auth';
import { LogOutIcon } from '@/components/ui/icons';
import Link from 'next/link';
import { LogInIcon } from 'lucide-react';
import { useState, useRef } from 'react';

export default function LogoutButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState('top'); // 'top' or 'bottom'
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const isNearBottom = window.innerHeight - rect.bottom < 50; // Adjust threshold as needed
      setTooltipPosition(isNearBottom ? 'top' : 'bottom');
    }
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="flex items-center gap-3 rounded-lg dark:text-slate-400 px-3 py-2 text-sm font-medium text-slate-800 transition-all hover:text-slate-900"
        onClick={async () => {
          await logout();
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <LogOutIcon className="h-4 w-4" />
        <span className="hidden md:block">Logout</span>
      </button>
      {showTooltip && (
        <div
          className={`absolute ${
            tooltipPosition === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
          } left-1/2 transform -translate-x-1/2 w-max rounded bg-slate-800 px-2 py-1 text-xs text-white shadow-lg`}
        >
          Click to logout
        </div>
      )}
    </div>
  );
}

export function LoginButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState('top'); // 'top' or 'bottom'
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = () => {
    if (linkRef.current) {
      const rect = linkRef.current.getBoundingClientRect();
      const isNearBottom = window.innerHeight - rect.bottom < 50; // Adjust threshold as needed
      setTooltipPosition(isNearBottom ? 'top' : 'bottom');
    }
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="relative">
      <Link
        ref={linkRef}
        href={'/login'}
        className="flex items-center gap-3 rounded-lg dark:text-slate-400 px-3 py-2 text-sm font-medium text-slate-800 transition-all hover:text-slate-900"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <LogInIcon className="h-4 w-4" />
        <span className="hidden md:block">Login</span>
      </Link>
      {showTooltip && (
        <div
          className={`absolute ${
            tooltipPosition === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
          } left-1/2 transform -translate-x-1/2 w-max rounded bg-slate-800 px-2 py-1 text-xs text-white shadow-lg`}
        >
          Go to login page
        </div>
      )}
    </div>
  );
}
