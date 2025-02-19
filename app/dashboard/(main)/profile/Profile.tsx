'use client';

import React from 'react';
import { UserImage } from '../../(components)/Header';
import ScoreBoard from './ScoreBoard';
import Link from 'next/link';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface ProfileProps {
  iuser: string;
  ilatestEvaluation: string;
  scores: string;
}

const formatMonthYear = (dateString: string) => {
  const date = new Date(dateString + "-01"); // Tambahkan hari untuk menghindari kesalahan parsing
  return date.toLocaleDateString("id-ID", { year: "numeric", month: "long" });
};

export default function Profile({ iuser, ilatestEvaluation, scores }: ProfileProps) {
    const user = JSON.parse(iuser)
    const latestEvaluation = JSON.parse(ilatestEvaluation)
  return (
    <main>
      {user ? (
        <motion.section 
          className='pb-10'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex gap-6 mb-2 mx-auto md:w-4/5 md:justify-start">
            <UserImage userI={JSON.stringify(user)} />
            <div className="flex flex-col gap-2 md:gap-4">
              <h1 className="text-3xl font-bold">
                Hi, {user.username} 😎
              </h1>
              <section className="flex gap-2">
                <p className="p-2 md:px-5 text-xs md:text-lg rounded-full bg-blue-100 dark:bg-blue-800">
                  kelas {user.uclass}
                </p>
              </section>
            </div>
          </div>

          {/* Section Evaluasi Terbaru */}
          <motion.section 
            className="my-8 p-4 mx-auto md:w-4/5 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold mb-4">Evaluasi dari Guru</h2>
            {latestEvaluation ? (
              <div className="flex flex-col gap-2">
                <p className="text-lg font-medium text-blue-600 dark:text-blue-300">
                  {latestEvaluation.content}
                </p>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatMonthYear(latestEvaluation.month)}
                </span>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                Belum ada evaluasi terbaru.
              </p>
            )}
          </motion.section>

          {/* Section ScoreBoard */}
          <ScoreBoard scores={JSON.parse(scores)} />
        </motion.section>
      ) : (
        <motion.section 
          className="flex flex-col m-auto items-center md:mt-20 justify-center text-center px-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Kamu belum login nih!
          </h2>
          <p className="mb-6 text-lg">
            Yuk login atau buat akun untuk melanjutkan.
          </p>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg shadow-md font-semibold hover:bg-gray-200 transition-all"
            >
              <FaSignInAlt className="text-xl" />
              Login
            </Link>
            <Link
              href="/signup"
              className="flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg shadow-md font-semibold hover:bg-gray-200 transition-all"
            >
              <FaUserPlus className="text-xl" />
              Buat Akun
            </Link>
          </div>
        </motion.section>
      )}
    </main>
  );
}
