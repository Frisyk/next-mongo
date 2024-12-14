// pages/admin/student/[id].tsx (or the appropriate path)
import { UserImage } from '@/app/dashboard/(components)/Header';
import ScoreBoard from '@/app/dashboard/(main)/profile/ScoreBoard';
import { getDetailsStudent, getEvaluationsForUser } from '@/lib/admin/students';
import React from 'react';
import EvaluationTable from './Evaluation'; // Ensure the path is correct

export default async function Page({ params }: { params: any }) {
  const student = await getDetailsStudent(params.id);
  const evaluationsResult = await getEvaluationsForUser(student.id);
  const evaluations = evaluationsResult.success ? evaluationsResult.data : [];

  return (
    <main className="w-full p-4 md:p-10">
      <div className="flex flex-col md:flex-row gap-6 mb-6 md:ml-20 items-center mx-auto transition-all duration-300 ease-in-out">
        {/* User Image */}
        <UserImage userI={JSON.stringify(student)} />

        {/* Student Info */}
        <div className="flex flex-col items-center md:items-start gap-2 md:gap-4 text-center md:text-left">
          <h1 className="text-3xl font-bold">
            {student ? student.username : 'Student'}
          </h1>
          <section className="flex justify-center md:justify-start gap-2">
            <p className="p-2 md:px-5 text-xs md:text-lg rounded-full bg-slate-100 dark:bg-slate-800">
              {student ? `Kelas ${student.uclass}` : 'Kelas X'}
            </p>
          </section>
        </div>
      </div>

      {/* Conditional Rendering for Evaluation and ScoreBoard */}
      {student && (
        <section>
          <EvaluationTable userId={student.id} Ievaluations={JSON.stringify(evaluations)} />
          <ScoreBoard id={student.id} />
        </section>
      )}
    </main>
  );
}
