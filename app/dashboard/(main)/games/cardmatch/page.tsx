'use client'
import LevelList from "./Games/ListLevel";


export default function CardSortPage() {

  const levels = ["Gerakan Shalat", "Bacaan Shalat", "Waktu Shalat"];

    return (
      <main className="level-list font-bold text-2xl text-center">
        <h1 className="my-10">Belajar Sambil Bermain Yuk✨</h1>
        <LevelList levels={levels}/>
      </main>
    )
  }
  