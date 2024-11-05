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
      <div className="shadow-lg bg-slate-50 dark:bg-slate-900 rounded-lg p-2 w-full md:w-1/2 text-center">
        <h1 className='my-5 text-2xl font-bold text-left'>Riwayat Kuis</h1>

        <table className="min-w-full border border-slate-300">
          <thead className="">
            <tr>
              <th className=" py-3 px-4 border">Nama Kuis</th>
              <th className=" py-3 px-4 border">Skor</th>
              <th className=" py-3 px-4 border">waktu Ujian</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score: Score) => (
              <tr key={score._id}>
                <td className="py-3 px-4 border w-1/3">{score.quiztitle}</td>
                <td className="py-3 px-4 border w-1/3">{score.score}</td>
                <td className="py-3 px-4 border w-1/3">
                  {new Date(score.createdAt).toLocaleDateString()}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  