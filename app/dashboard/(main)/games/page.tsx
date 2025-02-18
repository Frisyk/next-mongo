import React from 'react'
import Card from './Card'
import { getGamesList } from '@/lib/dal'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Game Seru',
};

export default async function Games() {
  const gamesList = [
    {
      title: "Card Match",
      slug: "cardmatch",
      img: "/icons/game.svg"
    },
    {
      title: "Rukun iman",
      slug: "rukun-iman",
      img: "/icons/game1.svg"
    },
    // {
    //   title: "This or That",
    //   slug: "thisorthat",
    //   img: ""
    // },
    // {
    //   title: "Quiz Trivia",
    //   slug: "quizland",
    //   img: ""
    // },
    // {
    //   title: "Geografi",
    //   slug: "geo",
    //   img: ""
    // },
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
