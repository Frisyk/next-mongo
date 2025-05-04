'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaBookOpen, FaChevronRight, FaLayerGroup } from 'react-icons/fa';

interface IBabInfo {
  _id: string;
  nama: string;
  deskripsi?: string;
  thumbnail?: string;
  urutan: number;
}

interface IMaterial {
  _id: string;
  title: string;
  slug: string;
}

interface IQuiz {
  _id: string;
  title: string;
  tag: string;
}

interface MaterialGroup {
  babInfo: IBabInfo;
  materials: IMaterial[];
  quiz: IQuiz | null;
}

type BabListProps = {
  groupedMaterials: string;
};

// Animation config
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
};

// Extracted reusable card
const BabCard = ({ group, index }: { group: EnrichedGroup; index: number }) => {
  return (
    <motion.div
      key={group.babInfo._id}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      layout
      className="block"
    >
      <Link
        href={`/dashboard/bab/${group.slug}`}
        className="bg-white dark:bg-slate-800 rounded-xl shadow hover:shadow-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300 flex overflow-hidden group relative"
      >
        {/* Thumbnail */}
        <div className="w-24 h-24 relative shrink-0">
          <Image
            src={group.babInfo.thumbnail || '/images/placeholder.jpg'}
            alt={`Thumbnail ${group.babInfo.nama}`}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
            <FaLayerGroup className="mr-1" /> {group.totalItems}
          </div>
        </div>

        {/* Info */}
        <div className="p-3 flex flex-col flex-grow relative">
          <h3 className="font-semibold text-base text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
            {group.babInfo.nama}
          </h3>
          {group.babInfo.deskripsi && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              {group.babInfo.deskripsi}
            </p>
          )}
          <FaChevronRight className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors" />
        </div>
      </Link>
    </motion.div>
  );
};

// Type with enriched slug and totalItems
interface EnrichedGroup extends MaterialGroup {
  totalItems: number;
  slug: string;
}

export default function BabList({ groupedMaterials }: BabListProps) {
  let data: MaterialGroup[] = [];

  try {
    data = JSON.parse(groupedMaterials);
  } catch (error) {
    console.error('Gagal parse data BabList:', error);
    return (
      <p className="text-red-500 bg-red-50 p-4 rounded-md text-sm">
        Terjadi kesalahan saat memuat data bab.
      </p>
    );
  }

  if (data.length === 0) {
    return (
      <div className="py-10 text-center text-gray-500 dark:text-gray-400 text-sm">
        Belum ada materi yang tersedia.
      </div>
    );
  }

  const enrichedData: EnrichedGroup[] = data.map((group) => ({
    ...group,
    totalItems: group.materials.length + (group.quiz ? 1 : 0),
    slug: group.babInfo.nama
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, ''),
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {enrichedData.map((group, index) => (
        <BabCard key={group.babInfo._id} group={group} index={index} />
      ))}
    </div>
  );
}
