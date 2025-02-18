import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface Game {
    title: string,
    slug: string,
    img: string,
}

export default function  Card({title, slug, img}: Game) {
  return (
<Link href={`games/${slug}`} className="m-2 p-5 bg-white/10 rounded-lg flex flex-col items-center justify-center gap-4 shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-[#F99417] duration-300">
    <Image src={img} width={500} height={500} className="rounded-lg w-64 h-64 object-cover transition-transform transform hover:scale-110" alt="image" />
    <p className="font-semibold  text-2xl group-hover:text-white transition-colors duration-300">{title}</p>
</Link>

  );
}
