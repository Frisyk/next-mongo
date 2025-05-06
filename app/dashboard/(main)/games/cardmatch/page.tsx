'use client'
import { useState } from "react";
import LevelList from "./Games/ListLevel";
import { Info } from "lucide-react";

export default function CardSortPage() {
  const levels = ["Gerakan Shalat", "Bacaan Shalat", "Waktu Shalat"];
  const [showGameplay, setShowGameplay] = useState(false);

  const handleShowGameplay = () => {
    setShowGameplay(!showGameplay);
  };

  return (
    <main className="level-list text-center relative">
      <h1 className="bg-blue-500 text-4xl font-bold text-white px-4 py-2 rounded-md w-fit mx-auto">Card Match</h1>
      <button
        className="border-2 border-blue-500 mx-auto my-4 text-md dark:text-white px-4 py-2 rounded-md flex items-center"
        onClick={handleShowGameplay}
      >
        <Info className="w-4 h-4 mr-2" />
        Cara bermain
      </button>
      <h1 className="my-6 text-2xl font-bold">Pilih Level yang ingin kamu mainkan✨</h1>
      {showGameplay && <Gameplay onClose={handleShowGameplay} />}
      <LevelList levels={levels} />
    </main>
  );
}

function Gameplay({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-lg w-11/12 max-w-xl shadow-lg relative text-left">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-black dark:hover:text-white"
        >
          ✕
        </button>
        <h1 className="text-2xl font-bold mb-4">Cara bermain 🎮</h1>
        <ul className="list-disc list-inside space-y-2 text-base font-normal">
          <li>Pilih level yang ingin kamu mainkan</li>
          <li>Klik tombol Ayo Mulai, timer akan berjalan</li>
          <li>Mulai bermain dengan memilih kartu</li>
          <li>Cari dan pasangkan kartu yang sama</li>
          <li>Jika semua kartu telah cocok, maka kamu akan menang</li>
        </ul>
      </div>
    </div>
  );
}
