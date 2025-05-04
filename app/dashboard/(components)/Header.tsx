'use client'

import React, { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { FaSignOutAlt, FaSun, FaMoon } from 'react-icons/fa'
import { MdLightMode, MdMoreVert, MdNightlightRound } from 'react-icons/md'
import { logout } from '@/lib/auth'
import LogoutButton, { LoginButton } from './logout-button'

const getInitials = (name: string) => {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
  return initials.toUpperCase()
}

export const UserImage = ({ userI }: { userI: string }) => {
  const user = JSON.parse(userI)
  const initials = user == null ? 'U' : getInitials(user.username)

  return user?.img ? (
    <Image
      alt={`image ${user.username}`}
      src={user.img}
      width={400}
      height={400}
      className="rounded-full bg-orange-300 w-8 h-8"
    />
  ) : (
    <div className="rounded-full bg-slate-800 p-6 w-20 md:w-28 h-20 md:h-28 flex items-center justify-center text-white font-bold text-3xl">
      {initials}
    </div>
  )
}

export default function Header({ user, link }: { user?: any; link: string }) {
  const path = usePathname().split('/').pop()

  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light'
    }
    return 'light'
  })

  const [isMenuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const handleLogout = async () => {
    await logout()
  }

  return (
    <header className="flex h-14 sticky top-0 z-30 bg-white dark:bg-slate-900 w-full justify-between items-center border-b dark:border-slate-800 px-4 md:gap-4 dark:text-white">
      {/* Logo */}
      <Link prefetch={false} className="flex items-center rounded-md md:hidden px-2 py-2" href="#">
        <span className="text-lg font-bold">Batika.</span>
      </Link>

      {/* Judul Halaman */}
      <h1 className="md:block hidden text-lg font-semibold capitalize">{path}</h1>

      {/* Tombol Theme di desktop */}
      <button
        onClick={toggleTheme}
        className="md:flex items-center gap-2 p-2 hidden rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 transition"
      >
        {theme !== 'light' ? (
          <>
            <MdNightlightRound className="w-5 h-5" />
            <span>Dark Mode</span>
          </>
        ) : (
          <>
            <MdLightMode className="w-5 h-5" />
            <span>Light Mode</span>
          </>
        )}
      </button>

      {/* Tombol Menu Mobile */}
      <div className="relative flex gap-2 items-center md:hidden">
        <button
          ref={buttonRef}
          onClick={() => setMenuOpen(!isMenuOpen)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-800 transition"
          aria-label="Open Menu"
        >
          <MdMoreVert className="w-6 h-6" />
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute top-12 right-0 bg-white dark:bg-slate-900 shadow-md rounded-lg w-40 p-2 z-50"
          >
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 p-2 w-full rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 transition"
            >
              {theme !== 'light' ? (
                <>
                  <MdNightlightRound className="w-5 h-5" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <MdLightMode className="w-5 h-5" />
                  <span>Light Mode</span>
                </>
              )}
            </button>
            <hr className="border-gray-300 dark:border-slate-700 my-2" />
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center p-2 rounded hover:bg-gray-700"
              >
                <FaSignOutAlt className="mr-3" />
                Logout
              </button>
            ) : (
              <LoginButton />
            )}
          </div>
        )}
      </div>
    </header>
  )
}

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
    <section className='text-left w-full md:w-1/3 gap-5 min-h-40 hidden md:block dark:bg-gray-800 bg-white p-6 rounded-2xl shadow-lg'>
      {isDayTime ? (
        <FaSun className="text-yellow-400 text-5xl -mb-10 ml-auto" />
      ) : (
        <FaMoon className="text-slate-300 text-5xl  -mb-10 ml-auto" />
      )}
      <div className="flex flex-col gap-3 mt-2">
        <p className="text-3xl font-bold">{time}</p>
        <p className="text-lg">{date}</p>
      </div>
      
    </section>
  );
}


