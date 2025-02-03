import { getUserScoresWithNames } from '@/lib/dal'
import React from 'react'
import Leaderboard from './LeaderBoard';

export default async function page() {
    const leaderboardRank = JSON.stringify(await getUserScoresWithNames());
    if(leaderboardRank == null) return (
      <div className='w-full mt-16 mx-auto flex items-center justify-center'>belum ada rank!</div>
    )

  return (
<Leaderboard data={JSON.parse(leaderboardRank).sort((a:any, b:any) => b.totalScore - a.totalScore || (a.quizCount - b.quizCount))} />
  )
}
