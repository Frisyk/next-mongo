'use client';
import Link from 'next/link';
import { GoHomeFill } from "react-icons/go";
import { MdGames } from "react-icons/md";
import { FaNoteSticky } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import { PackageIcon } from '@/components/ui/icons';
import clsx from 'clsx';
import Image from 'next/image';

export default function HomeNav() {
  const navLinks = [
    { title: 'Home', href: '/dashboard', badge: <GoHomeFill className='w-6 h-6'/> },
    { title: 'Games', href: '/dashboard/games', badge: <MdGames className='w-6 h-6'/> },
    { title: 'Story', href: '/dashboard/stories', badge: <FaNoteSticky className='w-6 h-6'/> },
    { title: 'My Profile', href: '/dashboard/profile', badge: <FaUserCircle className='w-6 h-6'/> },
  ];

  const path = usePathname();
  
  return (
    <div className="sticky z-20 top-0 w-full bg-slate-200 dark:bg-slate-900">
      {/* Top Navigation */}
      <div className="flex gap-10 items-center h-14 border-b dark:border-slate-900 px-4">
        <Link prefetch={false} className="flex items-center gap-2 font-semibold" href="#">
          <PackageIcon className="h-6 w-6" />
          <span>Batik</span>
        </Link>
        <nav className="flex gap-5 text-sm font-medium">
          {navLinks.map((link) => (
            <Link prefetch={false}
              className={clsx(
                'flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-slate-500 dark:hover:text-orange-300',
                {
                  'bg-slate-700 text-white hover:text-orange-200': path === link.href, 
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
        {/* <div className="flex items-center">
          {user ? <LogoutButton /> : <LoginButton />}
        </div> */}
      </div>

      {/* Responsive Navigation for Mobile */}
      <div className="flex md:hidden bg-slate-200 dark:bg-slate-900 fixed bottom-0 left-0 w-full border-t">
        <nav className="flex justify-around w-full py-2">
          {navLinks.map((link) => (
            <Link prefetch={false}
              className={`${
                path === link.href
                  ? 'bg-slate-700 text-slate-50 hover:text-slate-300 dark:hover:text-orange-300'
                  : ''
              } flex flex-col items-center gap-1 px-3 py-2 transition-all hover:text-orange-300`}
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
  );
}
