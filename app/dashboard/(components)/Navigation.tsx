'use client';
import Link from 'next/link';
import { GoHomeFill } from "react-icons/go";
import { MdGames } from "react-icons/md";
import { FaNoteSticky } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import LogoutButton, { LoginButton } from './logout-button';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { MdLightMode } from "react-icons/md";
import { MdNightlightRound } from "react-icons/md";

export default function Navigation({ userI }: { userI: any }) {
  const [theme, setTheme] = useState<string>(() => {
    // Check user's preference from localStorage or fallback to the default 'light' theme
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  const user = JSON.parse(userI);
  const navLinks = [
    { title: 'Belajar', href: '/dashboard', badge: <GoHomeFill className='w-6 h-6'/> },
    { title: 'Games', href: '/dashboard/games', badge: <MdGames className='w-6 h-6'/> },
    { title: 'Evaluasi', href: '/dashboard/evaluation', badge: <FaNoteSticky className='w-6 h-6 text-yellow-300 bg-slate-950 rounded-md'/> },
    { title: 'Profil', href: '/dashboard/profile', badge: <FaUserCircle className='w-6 h-6'/> },
  ];

  const path = usePathname();

  return (
    <div className="h-screen sticky z-20 top-0">
      <div className="hidden md:block md:w-52 lg:w-80 border-r border-slate-300 dark:border-slate-800">
        <div className="flex h-screen flex-col gap-2 bg-white dark:bg-slate-900">
          <div className="h-14 items-center border-b border-slate-300 dark:border-slate-800 px-4 flex">
            <Link prefetch={false} className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white" href="/">
              <span className="text-2xl font-bold">Batik.</span>
            </Link>
            <button
              onClick={toggleTheme}
              className="ml-auto flex items-center  rounded-full justify-center p-2  "
              aria-label="Toggle Dark Mode"
            >
              { theme != 'light'? (
                <MdNightlightRound className="w-6 h-6 " />
              ) : (
                <MdLightMode className="w-6 h-6" />
              )}
            </button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="flex flex-col gap-5 px-4 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  prefetch={false}
                  className={clsx(
                    'flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-slate-500 hover:text-white hover:bg-slate-600 dark:text-slate-50 dark:hover:bg-slate-800',
                    {
                      'bg-slate-700 text-white': path === link.href,
                    },
                  )}
                  href={link.href}
                  key={link.title}
                >
                  {link.badge}
                  <span>{link.title}</span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="border-t border-slate-300 dark:border-slate-800 p-4">
            {user ? <LogoutButton /> : <LoginButton />}
          </div>
        </div>
      </div>

      {/* Responsive Navigation for Mobile */}
      <div className="flex md:hidden bg-slate-200 dark:bg-slate-900 z-20 fixed bottom-0 left-0 w-full border-t border-slate-300 dark:border-slate-800">
        <nav className="flex justify-around w-full py-2">
          {navLinks.map((link) => (
            <Link
              prefetch={false}
              className={clsx(
                'flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all',
                {
                  'bg-slate-700 text-white hover:bg-slate-700': path === link.href,
                  'text-slate-500 dark:text-slate-50 dark:hover:bg-slate-700': path !== link.href,
                },
              )}
              href={link.href}
              key={link.title}
            >
              {link.badge}
              <span className="text-xs">{link.title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
