'use client';

import { ChevronLeftIcon, Timer, Volume2, VolumeX } from 'lucide-react';
import Link from 'next/link';

export function Nav({
  title,
  link,
  timer,
  isMusicPlaying,
  toggleMusic
}: {
  title?: string;
  link: string;
  timer: number;
  isMusicPlaying: boolean;
  toggleMusic: () => void;
}) {
  const format = (n: number) => (n < 10 ? `0${n}` : n);
  const timeText = `${Math.floor(timer / 60)}:${format(timer % 60)}`;

  return (
    <nav className="flex items-center justify-between mb-3 py-3 px-4 sm:px-6 sticky top-0 z-10 dark:bg-slate-900/80 backdrop-blur-sm">
      <Link 
        prefetch={false}
        href={link} 
        className="flex items-center cursor-pointer hover:scale-105 transition-transform"
      >
        <ChevronLeftIcon className="w-6 h-6 sm:w-8 sm:h-8" />
        <span className="hidden sm:inline ml-1">Kembali</span>
      </Link>
      
      <h1 className="text-sm sm:text-xl md:text-2xl font-bold bg-blue-200 dark:bg-blue-700 px-3 py-1 rounded-xl transition-all hover:shadow-md">
        Card Match {title ? `- ${title}` : ''}
      </h1>

      <div className="flex items-center gap-2">
        <button onClick={toggleMusic} className="p-2 rounded-full bg-blue-200 dark:bg-blue-700 hover:bg-blue-300 dark:hover:bg-blue-600 transition-all">
          {isMusicPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
        </button>
        <div className={`flex items-center font-mono text-center gap-1 sm:gap-2 text-sm sm:text-xl md:text-2xl font-bold ${
            timer <= 30 ? 'bg-red-200 dark:bg-red-700 animate-pulse' : 'bg-blue-200 dark:bg-blue-700'
        } px-3 py-1 rounded-xl transition-all`}>
            <Timer className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            {timeText}
        </div>
      </div>
      
    </nav>
  );
}
