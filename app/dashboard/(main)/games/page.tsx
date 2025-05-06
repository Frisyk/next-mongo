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
    <main className='p-4'>
      <h1 className='text-4xl pb-2 ml-4 font-bold'>Game Seru</h1>
      <p className='text-gray-500 ml-4'>Pilih game yang ingin kamu mainkan </p>
        <div className='flex flex-col py-4 md:flex-row flex-wrap gap-5 -z-10'>
        {
        gamesList?.map((game, index) => (
          <Card key={index} title={game.title} img={game.img} slug={game.slug} />
        ))
      }
    </div>
    </main>
  )
}
