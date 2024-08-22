'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { MdLightMode } from "react-icons/md";
import { MdNightlightRound } from "react-icons/md";
import { ArrowLeft } from 'lucide-react';

export default function Header({title, link}: {title?: string, link:string}) {
  const path = usePathname().split('/').pop();
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

  return (
    <header className="flex items-center border-b dark:border-purple-900 p-4 md:gap-4 ">
      <Link prefetch={false}
        className="flex items-center rounded-md py-2"
        href={link}
      >
       <ArrowLeft className='w-6 h-6 mx-2'/>
      <h1 className="text-lg font-semibold capitalize  ">
        {title? title : path}
      </h1>
      </Link>
      <button
        onClick={toggleTheme}
        className="ml-auto flex items-center justify-center rounded-md p-2  "
        aria-label="Toggle Dark Mode"
      >
        { theme === 'light'? (
          <MdNightlightRound className="w-6 h-6" />
        ) : (
          <MdLightMode className="w-6 h-6" />
        )}
      </button>
    </header>
  )
}
