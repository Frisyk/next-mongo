"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Score {
  _id: string;
  userId: string;
  quiztitle: string;
  score: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


interface ScoreBoardProps {
  scores: Score[];
}

export default function ScoreBoard({ scores}: ScoreBoardProps) {
  return (
    <motion.div 
      className="shadow-lg bg-slate-50 dark:bg-gray-800 rounded-lg p-4 w-full text-center md:w-4/5 mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      
      {/* Jika Tidak Ada Riwayat Kuis */}
      <h1 className="my-5 text-2xl font-bold ">Riwayat Kuis</h1>
      {scores.length === 0 ? (
        <motion.div
          className="flex flex-col items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          
          <Image width={300} height={300} src="/icons/empty.png" alt="No Data" className="w-40 h-40 opacity-75" />
          <p className="text-gray-500 dark:text-gray-400 mt-4">
            Belum ada riwayat kuis. Coba Kerjain Kuisnya yuk!
          </p>
        </motion.div>
      ) : (
        <>
          <table className="min-w-full text-sm table-auto">
            <thead className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white dark:bg-gradient-to-r dark:from-blue-700 dark:to-indigo-800">
              <tr>
                <th className="py-3 px-4">Nama Kuis</th>
                <th className="py-3 px-4">Skor</th>
                <th className="py-3 px-4">Waktu Ujian</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, index) => (
                <tr
                  key={score._id}
                  className={`w-full ${
                    index % 2 === 0 ? 'bg-blue-50 dark:bg-blue-800' : 'bg-indigo-50 dark:bg-indigo-800'
                  } hover:bg-yellow-100 dark:hover:bg-blue-500`}
                >
                  <td className="py-4 px-6  font-semibold text-blue-700 dark:text-blue-300">
                    {score.quiztitle}
                  </td>
                  <td className="py-4 px-6 text-center text-green-600 font-bold dark:text-green-400">
                    {score.score}
                  </td>
                  <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                    {new Date(score.createdAt).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </motion.div>
  );
}
