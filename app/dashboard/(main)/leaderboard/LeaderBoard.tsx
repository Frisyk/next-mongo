"use client";

import { motion } from "framer-motion";

interface LeaderboardProps {
  data: { username: string; totalScore: number; quizCount: number }[];
}

export default function Leaderboard({ data }: LeaderboardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-4 dark:text-white">
        📜 Leaderboard
      </h2>
      <div className="overflow-hidden border rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-teal-500 dark:bg-teal-700 text-white">
            <tr>
              <th className="p-3 text-left">Rank</th>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-right">Score</th>
              <th className="p-3 text-right">Quizzes</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <motion.tr
                key={user.username}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="p-3">{index + 1 === 1 ? "🏆" : index + 1}</td>
                <td className="p-3 font-medium">{user.username}</td>
                <td className="p-3 text-right font-bold text-teal-600 dark:text-teal-400">
                  {user.totalScore}
                </td>
                <td className="p-3 text-right">{user.quizCount}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
