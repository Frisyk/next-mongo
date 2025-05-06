import { getUserScoresWithNames } from '@/lib/dal'
import React from 'react'
import Leaderboard from './LeaderBoard';
import Image from 'next/image';
import { Metadata } from 'next';
import { revalidatePath } from 'next/cache';
export const metadata: Metadata = {
  title: 'Leader Board',
};
export default async function page() {
  const leaderboardRank = JSON.stringify(await getUserScoresWithNames());
  revalidatePath("/dashboard/leaderboard")
  return (
    <>
    
        <Leaderboard dataJson={leaderboardRank} />
     
    </> 
  )
}
