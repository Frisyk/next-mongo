'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaBookOpen, FaQuestionCircle, FaCheckCircle } from 'react-icons/fa';

// Interface yang sama dari dal.ts
interface IMaterial {
  _id: string;
  title: string;
  slug: string;
  thumbnail: string;
  tags: string[];
  createdAt: string;
  isCompleted?: boolean;
}

interface IQuiz {
  _id: string;
  title: string;
  tag: string;
  isCompleted?: boolean;
}

type MaterialListProps = {
  materials: string;
  quiz: string | null;
  babName: string;
  completedMaterials?: string[];
  completedQuizzes?: string[];
};

export default function MaterialList({
  materials,
  quiz,
  babName,
  completedMaterials = [],
  completedQuizzes = []
}: MaterialListProps) {
  let materialData: IMaterial[] = [];
  let quizData: IQuiz | null = null;

  try {
    materialData = JSON.parse(materials);
    if (quiz) {
      quizData = JSON.parse(quiz);
    }
  } catch (error) {
    console.error("Gagal parse data MaterialList:", error);
    return <p className="text-red-500">Error memuat daftar materi.</p>;
  }

  // Tandai item yang sudah selesai
  const enrichedMaterials = materialData.map(m => ({
    ...m,
    isCompleted: completedMaterials.includes(m._id) || completedMaterials.includes(m.slug)
  }));
  if (quizData) {
    quizData.isCompleted = completedQuizzes.includes(quizData._id);
  }

  // Hitung progress
  const totalItems = enrichedMaterials.length + (quizData ? 1 : 0);
  const completedCount =
    enrichedMaterials.filter(m => m.isCompleted).length +
    (quizData?.isCompleted ? 1 : 0);
  const progressPercentage = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.4,
      },
    }),
  };

  return (
    <div>
      {/* Progress Bar */}
      {totalItems > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1 text-sm">
            <span className="font-medium text-gray-700 dark:text-gray-300">Progress Bab</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}>
            </motion.div>
          </div>
        </div>
      )}

      {/* Daftar Item */}
      <div className="space-y-3">
        {enrichedMaterials.map((material, index) => (
          <motion.div
            key={material._id}
            custom={index}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className={`bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden relative ${material.isCompleted ? 'border-l-4 border-green-500' : ''}`}
          >
            {material.isCompleted && (
              <div className="absolute top-2 right-2 bg-green-100 rounded-full p-1 z-10">
                <FaCheckCircle className="text-green-600 text-base" />
              </div>
            )}
            <Link href={`/dashboard/materi/${material.slug}`} className="flex items-center p-4 group">
              <div className={`flex-shrink-0 w-16 h-16 mr-4 relative overflow-hidden rounded ${material.isCompleted ? 'opacity-60' : ''}`}>
                <Image
                  src={material.thumbnail || '/images/placeholder.jpg'}
                  alt={material.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex-grow">
                <h3 className={`font-semibold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-0.5 ${material.isCompleted ? 'line-through text-gray-500 dark:text-gray-400 group-hover:text-gray-500' : 'text-gray-800 dark:text-white'}`}>{material.title}</h3>
                <p className={`text-sm ${material.isCompleted ? 'text-gray-400 dark:text-gray-500' : 'text-gray-500 dark:text-gray-400'}`}>
                  Materi Pembelajaran
                </p>
              </div>
            </Link>
          </motion.div>
        ))}

        {quizData && (
          <motion.div
            custom={materialData.length}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className={`bg-amber-50 dark:bg-amber-900/50 border border-amber-200 dark:border-amber-800/60 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden relative ${quizData.isCompleted ? 'border-l-4 border-green-500' : ''}`}
          >
            {quizData.isCompleted && (
              <div className="absolute top-2 right-2 bg-green-100 rounded-full p-1 z-10">
                <FaCheckCircle className="text-green-600 text-base" />
              </div>
            )}
            <Link href={`/dashboard/kuis/${quizData._id}`} className="flex items-center p-4 group">
              <div className={`flex-shrink-0 w-16 h-16 mr-4 flex items-center justify-center bg-amber-100 dark:bg-amber-800/70 rounded ${quizData.isCompleted ? 'opacity-60' : ''}`}>
                <FaQuestionCircle className="text-amber-500 text-3xl" />
              </div>
              <div className="flex-grow">
                <h3 className={`font-semibold text-lg group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors mb-0.5 ${quizData.isCompleted ? 'line-through text-gray-500 dark:text-gray-400 group-hover:text-gray-500' : 'text-amber-800 dark:text-amber-300'}`}>Kuis: {quizData.title}</h3>
                <p className={`text-sm ${quizData.isCompleted ? 'text-gray-400 dark:text-gray-500' : 'text-gray-500 dark:text-gray-400'}`}>
                  Uji pemahamanmu tentang {babName}
                </p>
              </div>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
} 