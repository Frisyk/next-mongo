"use client"

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import React from 'react';

export default function Content({ materi }: { materi: any }) {
  const materials = JSON.parse(materi)
  return (
    <div className="w-full">
      <h1 className="text-2xl md:text-4xl font-bold my-5 md:mb-10 text-center md:text-left">
        Yuk Belajar Lagi Hari Ini 🚀
      </h1>
      <div className="flex flex-wrap gap-6">
        {materials?.map((m: any, index: number) => (
          <motion.div
            key={m.id}
            className="w-full sm:w-[20rem] grow md:w-[18rem] lg:w-[20rem] bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }} // Delay for staggered animations
          >
            <Link prefetch={false} href={`/dashboard/${m.slug}`}>
              <div className="flex flex-col h-full">
                {/* Image Section */}
                <motion.div
                  className="relative w-full h-40 md:h-56"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    alt="Image"
                    src={m.img}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-2xl"
                  />
                </motion.div>

                {/* Content Section */}
                <div className="flex flex-col gap-3 p-5">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Chapter {index + 1}
                  </span>
                  <motion.h3
                    className="text-lg md:text-2xl font-bold text-slate-900 dark:text-orange-300 capitalize line-clamp-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    {m.title}
                  </motion.h3>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
