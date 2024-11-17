import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Content({ materi }: { materi: any }) {
  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-bold my-5 md:mb-10 text-center md:text-left">
        Yuk Belajar Lagi Hari Ini 🚀
      </h1>
      <div className="flex flex-wrap gap-6">
        {materi?.map((m: any, index: number) => (
          <div
            key={m.id}
            className="w-full sm:w-[20rem] md:w-[18rem] lg:w-[22rem] bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <Link prefetch={false} href={`/dashboard/${m.slug}`}>
              <div className="flex flex-col h-full">
                {/* Image Section */}
                <div className="relative w-full h-40 md:h-56">
                  <Image
                    alt="Image"
                    src={m.img}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-2xl"
                  />
                </div>

                {/* Content Section */}
                <div className="flex flex-col gap-3 p-5">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Chapter {index + 1}
                  </span>
                  <h3 className="text-lg md:text-2xl font-bold text-slate-900 dark:text-orange-300 capitalize line-clamp-2">
                    {m.title}
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
