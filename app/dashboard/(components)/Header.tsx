'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const getInitials = (name: string) => {
  if (!name) return 'US';
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('');
  return initials.toUpperCase();
};

interface UserImageProps {
  user?: {
    username?: string;
    img?: string;
  };
}


const UserImage = ({ user }: UserImageProps) => {
  const initials = getInitials(user?.username || 'U');

  return user?.img ? (
    <Image
      alt={`image ${user.username}`}
      src={user.img}
      width={400}
      height={400}
      className="rounded-full bg-orange-300 w-8 h-8"
    />
  ) : (
    <div className="rounded-full bg-blue-800 w-8 h-8 flex items-center justify-center text-white font-bold text-lg">
      {initials}
    </div>
  );
};

export default function Header({user, link}: {user?: any, link:string}) {
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
    <header className="flex h-14 w-full justify-between items-center border-b dark:border-slate-800 px-4 md:gap-4 dark:text-white">
      <Link prefetch={false}
        className="flex items-center rounded-md  px-2 py-2 lg:hidden"
        href="#"
      >
        <span className="text-lg font-bold">Batik.</span>
      </Link>
      <h1 className="md:block hidden text-lg font-semibold capitalize  ">
        {path}
      </h1>
      <div className='flex gap-2 items-center'>

      <label className="switch flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        className="input hidden" 
        checked={theme === 'dark'} 
        onChange={toggleTheme} 
      />
      <span className="slider relative w-20 h-8 bg-slate-100 rounded-full transition-colors duration-300 flex items-center">
        <span className="sun absolute left-2 top-1/2 transform -translate-y-1/2 text-yellow-400">
          <FaSun className="w-6 h-6" />
        </span>
        <span className="moon absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-700">
          <FaMoon className="w-6 h-6" />
        </span>
        <span className="absolute w-10 h-7 bg-gray-200 rounded-full transform transition-transform duration-300 ease-in-out" 
              style={{ transform: theme === 'light' ? 'translateX(100%)' : 'translateX(0)' }}>
        </span>
      </span>
    </label>
      {/* <UserImage user={user} /> */}
      </div>
    </header>
  )
}

import { FaSun, FaMoon } from 'react-icons/fa';
import Image from 'next/image';

const getCurrentDateTime = () => {
  const now = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };
  
  return {
    date: now.toLocaleDateString('id-ID', dateOptions),
    time: now.toLocaleTimeString('id-ID', timeOptions),
    hour: now.getHours(), // Get the current hour
  };
};

export function GetTime() {
  const { date, time, hour } = getCurrentDateTime();

  const isDayTime = hour >= 6 && hour < 18; // Daytime between 6 AM and 6 PM

  return (
    <section className='flex items-center text-left w-full md:w-1/3 gap-5 h-40 dark:bg-gray-800 bg-gray-100 p-6 rounded-2xl shadow-lg'>
      {isDayTime ? (
        <FaSun className="text-yellow-400 text-4xl" />
      ) : (
        <FaMoon className="text-blue-400 text-4xl" />
      )}
      <div className="flex flex-col gap-3">
        <p className="text-5xl font-bold">{time}</p>
        <p className="text-xl">{date}</p>
      </div>
    </section>
  );
}


