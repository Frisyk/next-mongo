'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { MdLightMode } from "react-icons/md";
import { MdNightlightRound } from "react-icons/md";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const getInitials = (name: string) => {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('');
  return initials.toUpperCase();
};




export const UserImage = ({ userI }: {userI: string}) => {
  const user = JSON.parse(userI)
  const initials = user == null? 'U' : getInitials(user.username);

  return user?.img ? (
    <Image
      alt={`image ${user.username}`}
      src={user.img}
      width={400}
      height={400}
      className="rounded-full bg-orange-300 w-8 h-8"
    />
  ) : (
    <div className="rounded-full bg-blue-800 p-6 w-20 md:w-32 h-20 md:h-32 flex items-center justify-center text-white font-bold text-3xl">
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

      <button
        onClick={toggleTheme}
        className="ml-auto flex items-center ring-slate-900 dark:ring-white ring-1 rounded-full justify-center p-2  "
        aria-label="Toggle Dark Mode"
      >
        { theme != 'light'? (
          <MdNightlightRound className="w-6 h-6 " />
        ) : (
          <MdLightMode className="w-6 h-6" />
        )}
      </button>
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


