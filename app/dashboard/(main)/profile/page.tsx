import { Metadata } from 'next'
import React from 'react'
import { UserImage } from '../../(components)/Header'
import { getUser } from '@/lib/dal'
import ScoreBoard from './ScoreBoard'
import LogoutButton, { LoginButton } from '../../(components)/logout-button'

export const metadata: Metadata = {
  title: 'My Profile'
}



export default async function Profile() {
  const user = await getUser()
  
  return (
    <main>
      
      <div className='flex gap-6 mb-2  md:justify-start'>
        <UserImage userI={JSON.stringify(user)} />
        <div className="flex flex-col gap-2 md:gap-4">
          <h1 className='text-3xl font-bold'>Hi, {user==null? 'User' : user.username}😎</h1>
          <section className='flex gap-2'>
            <p className='p-2 md:px-5 text-xs md:text-lg rounded-full bg-blue-100 dark:bg-blue-800'>kelas {user.uclass}</p>
          </section>
        </div>
      </div>
      {
        user && <ScoreBoard id={user? user.id : null} />
      }
      
    </main>
  )
}
