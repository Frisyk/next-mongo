import React from 'react'
import Card from './Card'
import { getGamesList } from '@/lib/dal'

export default async function Games() {
  const gamesList = await getGamesList()

  return (
    <div className='flex flex-col md:flex-row p-4 gap-5'>
      {
        gamesList?.map((game, index) => (
          <Card key={index} title={game.title} point={game.point} img={game.img} slug={game.slug} />
        ))
      }
    </div>
  )
}
