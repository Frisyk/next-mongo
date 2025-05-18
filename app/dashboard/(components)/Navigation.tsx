'use client';
import Link from 'next/link';
import { GoHomeFill } from "react-icons/go";
import { MdGames, MdMenu } from "react-icons/md";
import { FaNoteSticky } from "react-icons/fa6";
import { usePathname } from 'next/navigation';
import LogoutButton, { LoginButton } from './logout-button';
import clsx from 'clsx';
import { useState } from 'react';
import { FaAward, FaUserCircle } from 'react-icons/fa';
import { TbMenuDeep } from 'react-icons/tb';

export default function Navigation({ userI }: { userI: any }) { 
  const [isNavOpen, setIsNavOpen] = useState(true);
  const user = JSON.parse(userI);
  
  const navLinks = [
    { title: 'Belajar', href: '/dashboard', badge: <GoHomeFill className='w-6 h-6' /> },
    { title: 'Games', href: '/dashboard/games', badge: <MdGames className='w-6 h-6' /> },
    // { title: 'Evaluasi', href: '/dashboard/evaluation', badge: <FaNoteSticky className='w-6 h-6 text-yellow-300 bg-slate-950 rounded-md' /> },
    { title: 'LeaderBoard', href: '/dashboard/leaderboard', badge: <FaAward className='w-6 h-6' /> },
    { title: 'Profil', href: '/dashboard/profile', badge: <FaUserCircle className='w-6 h-6' /> },
  ];

  const path = usePathname();

  return (
    <div className="h-screen sticky z-20 top-0 flex overflow-hidden">
      {/* Sidebar Navigation */}
      <div className={`hidden md:block border-r overflow-hidden border-slate-300 dark:border-slate-800 transition-all duration-300 ${isNavOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex h-screen flex-col gap-4 bg-white dark:bg-slate-800">
          {/* Header dengan Toggle */}
          <div className="h-14 flex items-center border-b border-slate-300 dark:border-slate-800 px-4">
            <button 
              onClick={() => setIsNavOpen(!isNavOpen)} 
              className="flex items-center gap-3 font-semibold text-slate-900 dark:text-white"
            >
              <TbMenuDeep className="w-6 h-6" />
              {isNavOpen && <span className="text-2xl font-bold">Batika.</span>}
            </button>
          </div>

          {/* Navigasi Utama */}
          <div className="flex-1 overflow-hidden py-2 px-3">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  className={clsx(
                    'flex items-center  gap-3 rounded-lg px-3 py-3 transition-all text-slate-500 hover:text-white hover:bg-slate-300 dark:text-slate-50 dark:hover:bg-slate-500',
                    { 'bg-slate-700 text-white': path === link.href }
                  )}
                  href={link.href}
                  key={link.title}
                >
                  <span className='text-center'>{link.badge}</span>
                  {isNavOpen && <span>{link.title}</span>}
                </Link>
              ))}
            </nav>
          </div>

          {/* Login / Logout */}{
            isNavOpen && 
            <div className="border-t  border-slate-300 dark:border-slate-800 p-4">
              {user ? <LogoutButton /> : <LoginButton />}
            </div>
          }
          
        </div>
      </div>

      {/* Responsive Bottom Navigation (Mobile) */}
      <div className="flex md:hidden bg-slate-200 border-t border-blue-500 border-t-2 dark:bg-slate-800 z-20 fixed bottom-0 left-0 w-full">
        <nav className="flex justify-around w-full py-3 px-3">
          {navLinks.map((link) => (
            <Link
              className={clsx(
                'flex flex-col items-center gap-1 px-3 py-3 rounded-xl transition-all',
                {
                  'bg-slate-700 text-white hover:bg-slate-700': path === link.href,
                  'text-slate-500 dark:text-slate-50 dark:hover:bg-slate-700': path !== link.href,
                }
              )}
              href={link.href}
              key={link.title}
            >
              {link.badge}
              {/* <span className="text-xs">{link.title}</span> */}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
