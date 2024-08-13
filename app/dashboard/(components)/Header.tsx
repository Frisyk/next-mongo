'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { TbHexagonLetterBFilled } from "react-icons/tb";
import { MdLightMode } from "react-icons/md";
import { MdNightlightRound } from "react-icons/md";

export default function Header() {
  const path = usePathname().split('/').pop();
  const [dark,setDark] = useState(false)

  const toggleTheme = () => {
    setDark(!dark)
    document.body.classList.toggle('dark')
  }

  return (
    <header className="flex h-14 items-center border-b dark:border-purple-900 px-4 md:gap-4 dark:text-white">
      <Link
        className="flex items-center rounded-md bg-purple-100 dark:bg-purple-700 px-2 py-2 lg:hidden"
        href="#"
      >
        <TbHexagonLetterBFilled className="h-6 w-6 text-gray-900 " />
        <span className="sr-only">Batik</span>
      </Link>
      <h1 className="md:block hidden text-lg font-semibold capitalize  ">
        {path}
      </h1>
      <button
        onClick={toggleTheme}
        className="ml-auto flex items-center justify-center rounded-md p-2  "
        aria-label="Toggle Dark Mode"
      >
        {!dark ? (
          <MdNightlightRound className="w-6 h-6" />
        ) : (
          <MdLightMode className="w-6 h-6" />
        )}
      </button>
    </header>
  )
}
