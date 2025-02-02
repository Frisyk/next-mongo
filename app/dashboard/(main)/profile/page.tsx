import { Metadata } from 'next';
import React from 'react';
import { UserImage } from '../../(components)/Header';
import { getUser, getUserScoresWithNames } from '@/lib/dal';
import ScoreBoard from './ScoreBoard';
import LogoutButton, { LoginButton } from '../../(components)/logout-button';
import { getEvaluationsForUser } from '@/lib/admin/students';
import Link from 'next/link';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'My Profile',
};

export default async function Profile() {
  const user = await getUser();
  const getLatestEvaluation = async () => {
    try {
            
      if (!user) {
        return null; // Early return if no user found
      }
      
      const evaluations = await getEvaluationsForUser(user.id);
      
      // Return the latest evaluation if available
      return evaluations?.data?.[0] || null;
    } catch (error) {
      console.error('Error fetching user evaluations:', error);
      return null; // Return null in case of an error
    }
  };
  
  const latestEvaluation = await getLatestEvaluation();
  
  return (
    <main>
      {
        user? (
          <section className='pb-10'>
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
                {/* Section Evaluasi Terbaru */}
            <section className="my-8 p-4 mx-auto md:w-4/5 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">Evaluasi dari Guru</h2>
                  {user && latestEvaluation ? (
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
          </section>
        ) : (
          <section className="flex flex-col m-auto items-center md:mt-20 justify-center text-center px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Kamu belum login nih!
          </h2>
          <p className="mb-6 text-lg">
            Yuk login atau buat akun untuk melanjutkan.
          </p>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg shadow-md font-semibold hover:bg-gray-200 transition-all"
            >
              <FaSignInAlt className="text-xl" />
              Login
            </Link>
            <Link
              href="/register"
              className="flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg shadow-md font-semibold hover:bg-gray-200 transition-all"
            >
              <FaUserPlus className="text-xl" />
              Buat Akun
            </Link>
          </div>
        </section>
        )
      }
      
    </main>
  );
}
