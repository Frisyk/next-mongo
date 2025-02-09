import { getUserScoresWithNames } from '@/lib/dal'
import React from 'react'
import Leaderboard from './LeaderBoard';
import Image from 'next/image';

export default async function page() {
  const leaderboardRank = JSON.stringify(await getUserScoresWithNames());

  return (
    <>
    
        <Leaderboard data={JSON.parse(leaderboardRank).sort((a:any, b:any) => b.totalScore - a.totalScore || (a.quizCount - b.quizCount))} />
     
    </> 
  )
}
