"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface LeaderboardProps {
  data: { username: string; class: string; totalScore: number; quizCount: number }[];
}

export default function Leaderboard({ dataJson }: { dataJson: string }) {
  let data: LeaderboardProps["data"] = [];

  try {
    data = JSON.parse(dataJson).sort(
      (a: any, b: any) => b.totalScore - a.totalScore || a.quizCount - b.quizCount
    );
    
  } catch (error) {
    console.error("Invalid JSON Data:", error);
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-slate-800 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-4 dark:text-white">📜 Leaderboard</h2>
      
      {data.length > 0 ? (
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full border-collapse">
            <thead className="bg-teal-500 dark:bg-teal-700 text-white">
              <tr>
                <th className="p-3 text-center">Rank</th>
                <th className="p-3 text-left">Nama</th>
                <th className="p-3 text-center">Kelas</th>
                <th className="p-3 text-center">Skor</th>
                <th className="p-3 text-center">Kuis</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, index) => (
                <motion.tr
                  key={`${user.username}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="p-3 text-3xl text-center">{index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1  }</td>
                  <td className="p-3 font-medium">{user.username}</td>
                  <td className="p-3 text-center font-medium">{user.class}</td>
                  <td className="p-3 text-center font-bold text-teal-600 dark:text-teal-400">
                    {user.totalScore}
                  </td>
                  <td className="p-3 text-center">{user.quizCount}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <motion.div
          className="flex flex-col items-center justify-center mt-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image src="/icons/ranking.png" alt="No ranking available" width={150} height={150} />
          <p className="mt-4 text-gray-500 dark:text-gray-400 text-lg font-medium">
            Belum ada ranking saat ini!
          </p>
        </motion.div>
      )}
    </div>
  );
}
