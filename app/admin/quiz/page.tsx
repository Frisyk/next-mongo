import { getAllQuizzes } from '@/lib/admin/quizzes';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import { DeleteButton, UpdateButton } from '../components/Navigation';

export default async function Materials() {
  const quizzes = await getAllQuizzes();

  return (
    <div className="min-h-screen w-full p-6">
      <div className="shadow-md rounded-lg overflow-hidden">
        <div className="p-4 flex justify-between items-center bg-blue-600 text-white">
          <h1 className="text-xl font-bold">Admin Material Table</h1>
          <Link
            prefetch={false}
            href={'/admin/quiz/create'}
            className="bg-blue-500 hover:bg-blue-700 p-2 rounded flex items-center"
          >
            <FaPlus className="mr-2" />
            Create New
          </Link>
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
              {quizzes?.map((quiz, index) => (
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
                      <UpdateButton path='quiz' slug={quiz.id} />
                      <DeleteButton path='quiz' id={quiz.id} />
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
