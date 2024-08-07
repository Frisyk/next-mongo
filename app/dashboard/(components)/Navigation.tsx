'use client';
import Link from 'next/link';
import { GoHomeFill } from "react-icons/go";
import { MdGames } from "react-icons/md";
import { FaNoteSticky } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { PackageIcon } from '@/components/ui/icons';
import LogoutButton from '../logout-button';

export default function Navigation() {
  const navLinks = [
    { title: 'Home', href: '/dashboard', badge: <GoHomeFill className='w-6 h-6'/> },
    { title: 'Games', href: '/dashboard/games', badge: <MdGames className='w-6 h-6'/> },
    { title: 'Notes', href: '/dashboard/notes', badge: <FaNoteSticky className='w-6 h-6'/> },
    { title: 'My Profile', href: '/dashboard/profile', badge: <FaUserCircle className='w-6 h-6'/> },
  ];

  const path = usePathname();
  
  return (
    <div className="relative">
      <div className="hidden md:block w-80 border-r">
        <div className="flex h-screen flex-col gap-2">
          <div className="h-14 items-center border-b px-4 flex">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <PackageIcon className="h-6 w-6" />
              <span className="">Batik</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="flex flex-col gap-5 px-4 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  className={`${
                    path === link.href
                      ? 'bg-purple-100 text-purple-900 hover:text-purple-900'
                      : ''
                  } flex items-center gap-3 rounded-lg px-3 py-2 text-purple-500 transition-all hover:text-purple-900`}
                  href={link.href}
                  key={link.title}
                >
                  {link.badge}
                  <span>{link.title}</span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="border-t p-4">
            <LogoutButton />
          </div>
        </div>
      </div>

      {/* Responsive Navigation for Mobile */}
      <div className="flex md:hidden fixed bottom-0 left-0 w-full bg-white border-t">
        <nav className="flex justify-around w-full py-2">
          {navLinks.map((link) => (
            <Link
              className={`${
                path === link.href
                  ? 'bg-purple-100 text-purple-900 hover:text-purple-900'
                  : ''
              } flex flex-col items-center gap-1 px-3 py-2 text-purple-500 transition-all hover:text-purple-900`}
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
