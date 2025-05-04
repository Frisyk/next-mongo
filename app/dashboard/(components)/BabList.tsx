'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaBookOpen, FaChevronRight, FaLayerGroup } from 'react-icons/fa';

// Interface (salin dari page.tsx jika perlu, pastikan konsisten)
interface IBabInfo { 
    _id: string; 
    nama: string; 
    deskripsi?: string; 
    thumbnail?: string; 
    urutan: number; 
}
interface IMaterial { _id: string; title: string; slug: string; /*...*/ }
interface IQuiz { _id: string; title: string; tag: string; /*...*/}
interface MaterialGroup {
  babInfo: IBabInfo;
  materials: IMaterial[];
  quiz: IQuiz | null;
}

type BabListProps = {
  groupedMaterials: string; // Data dikirim sebagai string JSON
};

export default function BabList({ groupedMaterials }: BabListProps) {
  let data: MaterialGroup[] = [];
  try {
    data = JSON.parse(groupedMaterials);
  } catch (error) {
    console.error("Gagal parse data BabList:", error);
    return <p className="text-red-500">Error memuat data Bab.</p>;
  }

  if (!data || data.length === 0) {
    return <p className="text-center py-10 text-gray-500">Belum ada materi tersedia.</p>;
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.4,
      },
    }),
  };

  const enrichData = data.map(group => ({
    ...group,
    totalItems: group.materials.length + (group.quiz ? 1 : 0),
    // Buat slug URL yang konsisten
    slug: group.babInfo.nama.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  }));

  return (
    // Gunakan list atau div dengan space
    <div className="space-y-3 flex">
      {enrichData.map((group, index) => (
        <motion.div
          key={group.babInfo._id}
          custom={index}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          layout // Tambahkan layout animation
          className="block"
        >
          <Link 
            href={`/dashboard/bab/${group.slug}`} 
            className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg focus:shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 overflow-hidden flex flex-row group relative"
          >
            {/* Gambar Thumbnail */} 
            <div className="flex-shrink-0 w-24 h-24 relative">
              <Image
                src={group.babInfo.thumbnail || '/images/placeholder.jpg'}
                alt={`Thumbnail ${group.babInfo.nama}`}
                layout="fill"
                objectFit="cover"
              />
               {/* Badge Jumlah Item */}
               <div className="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded-full flex items-center">
                  <FaLayerGroup className="mr-1"/> {group.totalItems}
               </div>
            </div>
            {/* Info Teks */} 
            <div className="p-3 flex flex-col flex-grow">
              <h3 className="font-semibold text-base mb-1 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">{group.babInfo.nama}</h3>
              {group.babInfo.deskripsi && (
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 flex-grow">{group.babInfo.deskripsi}</p>
              )}
               {/* Chevron sebagai indikator aksi */}
               <FaChevronRight className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors"/>
            </div>
           
          </Link>
        </motion.div>
      ))}
    </div>
  );
} 