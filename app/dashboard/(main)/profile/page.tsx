import { Metadata } from 'next';
import React from 'react';
import { UserImage } from '../../(components)/Header';
import { getUser } from '@/lib/dal';
import ScoreBoard from './ScoreBoard';
import LogoutButton, { LoginButton } from '../../(components)/logout-button';
import { getEvaluationsForUser } from '@/lib/admin/students';

export const metadata: Metadata = {
  title: 'My Profile',
};

export default async function Profile() {
  const user = await getUser();
  const evaluations = await getEvaluationsForUser(user.id);

  // Ambil evaluasi terbaru jika ada
  const latestEvaluation =
    evaluations && evaluations.data && evaluations.data.length > 0
      ? evaluations.data[0]
      : null;

  return (
    <main>
      <div className="flex gap-6 mb-2 mx-auto md:w-4/5 md:justify-start">
        <UserImage userI={JSON.stringify(user)} />
        <div className="flex flex-col gap-2 md:gap-4">
          <h1 className="text-3xl font-bold">
            Hi, {user == null ? 'User' : user.username} 😎
          </h1>
          <section className="flex gap-2">
            <p className="p-2 md:px-5 text-xs md:text-lg rounded-full bg-blue-100 dark:bg-blue-800">
              kelas {user == null ? 'X' : user.uclass}
            </p>
          </section>
        </div>
      </div>

      {user && (
        <>
          {/* Section Evaluasi Terbaru */}
          <section className="my-8 p-4 mx-auto md:w-4/5 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Evaluasi dari Guru</h2>
            {latestEvaluation ? (
              <div className="flex flex-col gap-2">
                <p className="text-lg font-medium text-blue-600 dark:text-blue-300">
                  {latestEvaluation.content}
                </p>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {latestEvaluation.month}
                </span>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                Belum ada evaluasi terbaru.
              </p>
            )}
          </section>

          {/* Section ScoreBoard */}
          <ScoreBoard id={user ? user.id : null} />
        </>
      )}
    </main>
  );
}
