import React from 'react'
import Card from './Card'
import { getGamesList } from '@/lib/dal'

export default async function Games() {
  const gamesList = [
    {
      title: "Card Match",
      slug: "cardmatch",
      img: ""
    },
    {
      title: "Word Wall",
      slug: "wordwall",
      img: ""
    },
    {
      title: "This or That",
      slug: "thisorthat",
      img: ""
    },
    {
      title: "Quiz Trivia",
      slug: "quizland",
      img: ""
    },
    {
      title: "Geografi",
      slug: "geo",
      img: ""
    },
  ]

  return (
    <div className='flex flex-col md:flex-row flex-wrap p-4 gap-5 -z-10'>
      {
        gamesList?.map((game, index) => (
          <Card key={index} title={game.title} img={game.img} slug={game.slug} />
        ))
      }
    </div>
  )
}
