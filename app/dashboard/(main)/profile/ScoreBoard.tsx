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
      <div className="shadow-lg bg-slate-50 dark:bg-slate-900 rounded-lg p-2 w-full text-center md:w-4/5">
        <h1 className='my-5 text-2xl font-bold text-left'>Riwayat Kuis</h1>

        <table className="min-w-full border text-sm border-slate-300">
          <thead className="">
            <tr>
              <th className=" py-3 px-4 border">Nama Kuis</th>
              <th className=" py-3 px-4 border">Skor</th>
              <th className=" py-3 px-4 border">waktu Ujian</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score: Score) => (
              <tr key={score._id} className="w-full">
                <td className="py-4 px-6 border border-gray-300 font-semibold">
                  {score.quiztitle}
                </td>
                <td className="py-4 px-6 border border-gray-300 text-center">
                  {score.score}
                </td>
                <td className="py-4 px-6 border border-gray-300">
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
  