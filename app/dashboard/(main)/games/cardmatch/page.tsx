'use client'
import { redirect } from "next/navigation";
import LevelList from "./Games/ListLevel";


export default function CardSortPage() {

  if (status === "unauthenticated") {
    const rec = redirect('/redirect')    
    return rec
  }

  const levels = ["Gerakan Shalat", "Bacaan Shalat", "Waktu Shalat"];

    return (
      <main className="level-list font-bold text-2xl text-center text-blue-800">
        <h1 className="my-10">Belajar Sambil Bermain Yuk✨</h1>
        <LevelList levels={levels}/>
      </main>
    )
  }
  