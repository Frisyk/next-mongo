'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MdLightMode, MdNightlightRound } from "react-icons/md";
import { ArrowLeft } from 'lucide-react';
import Modal from './Modals';

const Header: React.FC<{ title?: string, link: string }> = ({ title, link }) => {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

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

  const handleBackClick = (e: React.MouseEvent) => {
    if(link=='dashboard') return router.back()
    e.preventDefault();
    setIsModalOpen(true);
  };

  const confirmExit = () => {
    setIsModalOpen(false);
    router.push(`/dashboard/${link}`);
  };

  return (
    <>
      <header className="flex items-center border-b sticky top-0 bg-slate-50 dark:bg-slate-900 dark:border-slate-900 p-4 md:gap-4 ">
        <button onClick={handleBackClick} className="flex items-center rounded-md py-2">
          <ArrowLeft className='w-6 h-6 mx-2' />
          <p className="text-lg hidden md:block font-semibold capitalize">Kembali</p>
        </button>
        <button
          onClick={toggleTheme}
          className="ml-auto flex items-center rounded-full justify-center p-2"
          aria-label="Toggle Dark Mode"
        >
          {theme !== 'light' ? (
            <MdNightlightRound className="w-6 h-6" />
          ) : (
            <MdLightMode className="w-6 h-6" />
          )}
        </button>
      </header>
      {
        link? (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h2 className="text-xl font-bold">Peringatan</h2>
            <p className="mt-2">Apakah kamu yakin ingin keluar? Progressmu akan direset.</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={confirmExit}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Keluar
              </button>
            </div>
          </Modal>
        ) : (
          ""
        )
      }

      
    </>
  );
};

export default Header;
