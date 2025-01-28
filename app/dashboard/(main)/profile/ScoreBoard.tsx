import { getUserScore } from '@/lib/admin/students'
import React from 'react'

interface Score {
    _id: string;
    userId: string;
    quiztitle: string;
    score: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export default async function ScoreBoard({ id }: { id?: string }) {
    const scores = await getUserScore(id);
  
    if (!Array.isArray(scores)) {
      return <div>Error: {scores.message || "Unable to load scores."}</div>;
    }
  
    return (
      <div className="shadow-lg bg-slate-50 dark:bg-slate-900 rounded-lg p-2 w-full text-center md:w-4/5 mx-auto">
        <h1 className='my-5 text-2xl font-bold text-left'>Riwayat Kuis</h1>

        <table className="min-w-full text-sm table-auto">
          <thead className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white dark:bg-gradient-to-r dark:from-blue-700 dark:to-indigo-800">
            <tr>
              <th className="py-3 px-4">Nama Kuis</th>
              <th className="py-3 px-4">Skor</th>
              <th className="py-3 px-4">Waktu Ujian</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score: Score, index) => (
              <tr
                key={score._id}
                className={`w-full ${index % 2 === 0 ? 'bg-blue-50 dark:bg-blue-800' : 'bg-indigo-50 dark:bg-indigo-800'} hover:bg-yellow-100 dark:hover:bg-blue-500`}
              >
                <td className="py-4 px-6 text-left font-semibold text-blue-700 dark:text-blue-300">
                  {score.quiztitle}
                </td>
                <td className="py-4 px-6 text-center text-green-600 font-bold dark:text-green-400">
                  {score.score}
                </td>
                <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                  {new Date(score.createdAt).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>


      </div>
    );
  }
  