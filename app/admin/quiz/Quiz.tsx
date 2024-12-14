"use client";
import { useState } from 'react';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import { DeleteButton, UpdateButton } from '../components/Navigation';

type Answer = {
  text: string;
};

export type Quiz = {
  _id: string;
  tag: string;
  questionText: string;
  answers: Answer[];
};

export default function Quiz({ mquizzes }: { mquizzes: any }) {
  const [searchQuery, setSearchQuery] = useState('');
  const quizzes = JSON.parse(mquizzes)
  const filteredQuizzes = quizzes?.filter((quiz:Quiz) =>
    quiz.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full p-6">
      <div className="shadow-md rounded-lg overflow-hidden">
        <div className="p-4 flex justify-between items-center bg-slate-600 text-white">
          <h1 className="text-xl font-bold">Admin Material Table</h1>
          <Link
            prefetch={false}
            href={'/admin/quiz/create'}
            className="bg-slate-500 hover:bg-slate-700 p-2 rounded flex items-center"
          >
            <FaPlus className="mr-2" />
            Create New
          </Link>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <input
            type="text"
            placeholder="Search by tag"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border dark:text-slate-900 rounded-lg px-4 py-2 w-full"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className=" text-left uppercase text-sm">
                <th className="py-3 px-6">No</th>
                <th className="py-3 px-6">Tag</th>
                <th className="py-3 px-6">Question</th>
                <th className="py-3 px-6">Option A</th>
                <th className="py-3 px-6">Option B</th>
                <th className="py-3 px-6">Option C</th>
                <th className="py-3 px-6">Option D</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody className=" text-sm">
              {filteredQuizzes?.map((quiz:Quiz, index:number) => (
                <tr key={quiz._id} className="border-b border-gray-200 hover:bg-slate-200 dark:hover:bg-slate-500">
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{quiz.tag}</td>
                  <td className="py-3 px-6">{quiz.questionText}</td>
                  <td className="py-3 px-6">{quiz.answers[0]?.text || ''}</td>
                  <td className="py-3 px-6">{quiz.answers[1]?.text || ''}</td>
                  <td className="py-3 px-6">{quiz.answers[2]?.text || ''}</td>
                  <td className="py-3 px-6">{quiz.answers[3]?.text || ''}</td>
                  <td className="py-3 px-6">
                    <div className="flex items-center space-x-4">
                      <UpdateButton path="quiz" slug={quiz._id} />
                      <DeleteButton path="quiz" id={quiz._id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
