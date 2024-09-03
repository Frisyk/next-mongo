'use client';
import Link from 'next/link';
import { GoHomeFill } from "react-icons/go";
import { MdGames } from "react-icons/md";
import { FaNoteSticky } from "react-icons/fa6";
import { FaEdit, FaTrashAlt, FaUserCircle } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import { PackageIcon } from '@/components/ui/icons';
import clsx from 'clsx';
import { deleteMaterial } from '@/lib/action';

function Navigation() {
  const navLinks = [
    { title: 'Dashboard', href: '/admin', badge: <GoHomeFill className='w-6 h-6'/> },
    { title: 'Student', href: '/admin/student', badge: <MdGames className='w-6 h-6'/> },
    { title: 'Material', href: '/admin/material', badge: <FaNoteSticky className='w-6 h-6'/> },
    { title: 'Quiz', href: '/admin/quiz', badge: <FaUserCircle className='w-6 h-6'/> },
  ];

  const path = usePathname();
  
  return (
    <div className=" h-screen sticky top-0 ">
      <div className="hidden md:block w-80 border-r dark:border-slate-900">
        <div className="flex h-screen flex-col gap-2">
          <div className="h-14  items-center border-b dark:border-slate-900 px-4 flex">
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
                  'flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-slate-300 dark:hover:text-orange-300',
                  {
                    'bg-slate-700  text-white hover:text-orange-200': path === link.href, 
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
          <div className="border-t dark:border-slate-900 p-4">
          </div>
        </div>
      </div>

      {/* Responsive Navigation for Mobile */}
      <div className="flex md:hidden fixed bottom-0 left-0 w-full border-t">
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
  )
}

function DeleteButton({id, path}:{id:string, path:string}) {
  const handleDelete = async() => {
    if(path === 'material'){
      await deleteMaterial(id)
    }
  }

  return (
    <button className='text-red-700 hover:text-red-300' onClick={handleDelete}>
      <FaTrashAlt />
    </button>
  )
}

function UpdateButton({id, path}:{id:string, path:string}) {
  return (
    <Link prefetch={false} href={{
      pathname: `/admin/${path}/edit`,
      query: {
        path: id,
      },
    }} className='text-blue-700 hover:text-blue-300'>
      <FaEdit />
    </Link>
  )
}

export { Navigation, DeleteButton, UpdateButton }