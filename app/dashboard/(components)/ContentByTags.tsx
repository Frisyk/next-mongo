"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaBookOpen, FaChevronRight, FaQuestionCircle } from 'react-icons/fa';

// Interface yang sama dari dal.ts
interface IMaterial {
  _id: string;
  title: string;
  slug: string;
  thumbnail: string;
  tags: string[];
  createdAt: string;
}

interface IQuiz {
  _id: string;
  title: string;
  tag: string;
}

interface IBab {
  _id: string;
  nama: string;
  deskripsi?: string;
  thumbnail?: string;
}

interface MaterialGroup {
  babInfo: IBab;
  materials: IMaterial[];
  quiz: IQuiz | null;
}

type BabListProps = {
  groupedMaterials: string;
};

export default function BabList({ groupedMaterials }: BabListProps) {
  const data: MaterialGroup[] = JSON.parse(groupedMaterials);

  if (!data || data.length === 0) {
    return <p className="text-center py-10 text-gray-500">Belum ada materi tersedia.</p>;
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((group, index) => (
        <motion.div
          key={group.babInfo._id}
          custom={index}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden flex flex-col"
        >
          <div className="relative h-48 w-full">
            <Image
              src={group.babInfo.thumbnail || '/images/placeholder.jpg'}
              alt={`Thumbnail ${group.babInfo.nama}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h2 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">{group.babInfo.nama}</h2>
            {group.babInfo.deskripsi && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow">{group.babInfo.deskripsi}</p>
            )}
            <div className="mt-auto">
              {group.materials.length > 0 ? (
                 <Link href={`/dashboard/bab/${group.babInfo.nama.toLowerCase().replace(/\s+/g, '-')}`}>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center">
                        <FaBookOpen className="mr-2" /> Lihat Materi ({group.materials.length})
                        <FaChevronRight className="ml-auto"/>
                    </button>
                </Link>
              ) : (
                 <p className="text-sm text-center text-gray-500 dark:text-gray-400">Belum ada materi.</p>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 