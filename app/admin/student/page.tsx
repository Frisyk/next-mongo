import React from 'react'
import Link from 'next/link';
import { getAllStudents } from '@/lib/admin/students';
import { ObjectId } from 'mongoose';

export interface Student {
  id: ObjectId; 
  username: string;
  uclass: string;
  uas: number;
  uts: number;
}
export default async function Students() {
  const students: Student[] = await getAllStudents()

  return (
    <div className="min-h-screen w-full p-6">
      <div className="shadow-md rounded-lg overflow-hidden">
        <div className="p-4 flex justify-between items-center bg-slate-600 text-white">
          <h1 className="text-xl font-bold">Student List</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left uppercase text-sm">
                <th className="py-3 px-6 text-center">No</th>
                <th className="py-3 px-6 text-center">Name</th>
                <th className="py-3 px-6 text-center">Class</th>
                <th className="py-3 px-6 text-center">UAS Score</th>
                <th className="py-3 px-6 text-center">UTS Score</th>
                <th className="py-3 px-6 text-center">Details</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {students.map((student, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-500"
                >
                  <td className="py-3 px-6 text-center">{index + 1}</td>
                  <td className="py-3 px-6 text-center">{student.username}</td>
                  <td className="py-3 px-6 text-center">{student.uclass}</td>
                  <td className="py-3 px-6 text-center">{student.uas}</td>
                  <td className="py-3 px-6 text-center">{student.uts}</td>
                  <td className="py-3 px-6 text-center">
                    <Link
                      href={`/admin/student/${student.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      View Details
                    </Link>
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
