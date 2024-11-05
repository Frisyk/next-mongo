import { Metadata } from 'next'
import React from 'react'
import { UserImage } from '../../(components)/Header'
import { getUser } from '@/lib/dal'
import ScoreBoard from './ScoreBoard'

export const metadata: Metadata = {
  title: 'My Profile'
}



export default async function Profile() {
  const user = await getUser()
  
  return (
    <main>
      <div className='flex gap-6 mb-2 items-center justify-center md:justify-start'>
        <UserImage userI={JSON.stringify(user)} />
        <div className="flex flex-col gap-2 md:gap-4">
          <h1 className='text-4xl font-bold'>Hi, {user==null? 'User' : user.username}😎</h1>
          <p className='p-2 px-5 text-md w-fit rounded-full bg-blue-100 dark:bg-blue-800'>kelas 10 Mipa</p>
        </div>
      </div>
      {
        user && <ScoreBoard id={user? user.id : null} />
      }
      
    </main>
  )
}
