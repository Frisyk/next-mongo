'use client';
import Link from 'next/link';
import { GoHomeFill } from "react-icons/go";
import { MdGames } from "react-icons/md";
import { FaNoteSticky } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import { PackageIcon } from '@/components/ui/icons';
import LogoutButton from './logout-button';
import clsx from 'clsx';

export default function Navigation({user}: {user: any}) {
  const navLinks = [
    { title: 'Home', href: '/dashboard', badge: <GoHomeFill className='w-6 h-6'/> },
    { title: 'Games', href: '/dashboard/games', badge: <MdGames className='w-6 h-6'/> },
    { title: 'Story', href: '/dashboard/stories', badge: <FaNoteSticky className='w-6 h-6'/> },
    { title: 'My Profile', href: '/dashboard/profile', badge: <FaUserCircle className='w-6 h-6'/> },
  ];

  const path = usePathname();
  
  return (
    <div className=" h-screen sticky z-20 top-0 ">
      <div className="hidden md:block w-80 border-r dark:border-purple-900">
        <div className="flex h-screen flex-col gap-2">
          <div className="h-14  items-center border-b dark:border-purple-900 px-4 flex">
            <Link prefetch={false} className="flex items-center gap-2 font-semibold" href="#">
              <PackageIcon className="h-6 w-6" />
              <span className="">Batik</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="flex flex-col gap-5 px-4 text-sm font-medium">
              {navLinks.map((link) => (
                <Link prefetch={false}
                className={clsx(
                  'flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-purple-500 dark:hover:text-orange-300',
                  {
                    'bg-purple-700  text-white hover:text-orange-200': path === link.href, 
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
          {
            user? (<div className="border-t dark:border-purple-900 p-4">
              <LogoutButton />
            </div>) : ('')
          }
          
        </div>
      </div>

      {/* Responsive Navigation for Mobile */}
      <div className="flex md:hidden bg-purple-200 dark:bg-slate-900 fixed bottom-0 left-0 w-full border-t">
        <nav className="flex justify-around w-full py-2">
          {navLinks.map((link) => (
            <Link prefetch={false}
              className={`${
                path === link.href
                  ? 'bg-purple-700 text-purple-50 hover:text-purple-300 dark:hover:text-orange-300'
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
  )
}
