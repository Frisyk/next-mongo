import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface Game {
    title: string,
    slug: string,
    img: string,
}

export default function Card({title, slug, img}: Game) {
  return (
    <Link prefetch={false} href={`games/${slug}`}
      className="m-2 group py-5 bg-white/10 rounded-lg flex flex-col items-center justify-center gap-2 relative after:absolute after:h-full after:bg-[#F99417] z-10 shadow-lg after:-z-10 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden after:-translate-y-full after:hover:translate-y-0 [&_p]:delay-200 [&_p]:transition-all w-full md:w-1/3"
    >
        <Image
            src={img}
            width={500}
            height={500}
            className='rounded w-full h-60 p-2 object-cover'
            alt='image'
        />
        <div className='flex w-full items-center justify-between px-4'>
            <p className="font-semibold text-slate-600 group-hover:text-white text-2xl">
                {title}
            </p>
        </div>
      
    </Link>
  );
}
