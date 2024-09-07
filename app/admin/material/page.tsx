import { getMateri } from '@/lib/dal';
import Link from 'next/link';
import {  FaPlus } from 'react-icons/fa';
import { DeleteButton, UpdateButton } from '../components/Navigation';

export default async function Materials() {
  const materials = await getMateri();
  // Helper function to limit the text length
  const limitText = (text:string, maxLength = 100) => {
    if (!text) return ''; // Return an empty string if text is undefined or null
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="min-h-screen w-full p-6">
      <div className=" shadow-md rounded-lg overflow-hidden">
        <div className="p-4 flex justify-between items-center bg-blue-600 text-white">
          <h1 className="text-xl font-bold">Admin Material Table</h1>
          <Link prefetch={false}
            href={'/admin/material/create'}
            className="bg-blue-500 hover:bg-blue-700 p-2 rounded flex items-center"
          >
            <FaPlus className="mr-2" />
            Create New
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200 text-left text-gray-600 uppercase text-sm">
                <th className="py-3 px-6">No</th>
                <th className="py-3 px-6">Title</th>
                <th className="py-3 px-6">Short</th>
                <th className="py-3 px-6">Article</th>
                <th className="py-3 px-6">Summary</th>
                <th className="py-3 px-6">Image</th>
                <th className="py-3 px-6">Quiz</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {materials?.map((material, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">
                    {limitText(material.title)}
                  </td>
                  <td className="py-3 px-6">
                    {limitText(material.short)}
                  </td>
                  <td className="py-3 px-6">
                    {limitText(material.desc)}
                  </td>
                  <td className="py-3 px-6">
                    {limitText(material.summary)}
                  </td>
                  <td className="py-3 px-6">
                    {limitText(material.img)}
                  </td>
                  <td className="py-3 px-6">
                    {limitText(material.quizId)}
                  </td>
                  <td className="py-3 px-6">
                    <div className="flex items-center space-x-4">
                      <UpdateButton path='material' slug={material.slug} />
                      <DeleteButton path='material' id={material.id} />
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
