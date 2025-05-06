'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card } from './type';
import CardComponent from './Card';
import ModalComponent from './Modal';
import { Nav } from './Nav';
import { GameResources } from '@/lib/data';
import { Volume2, VolumeX } from 'lucide-react';


function formatTime(seconds: number) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

export default function GamesCard({ level, back }: { level?: string; back: string }) {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const [timer, setTimer] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const allMatched = cards.length > 0 && cards.every(card => card.matched);

  // Timer countdown
  useEffect(() => {
    if (!gameStarted || timer <= 0) return;

    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [gameStarted, timer]);

  useEffect(() => {
    if (timer === 0 && gameStarted) {
      toast.error('Waktu Habis!');
      setGameStarted(false);
    }
  }, [timer, gameStarted]);

  // Check if all cards matched
  useEffect(() => {
    if (allMatched && cards.length > 0) {
      toast.success('Selamat! Kamu menyelesaikan permainan!');
      setShowModal(true);
      setGameStarted(false);
    }
  }, [allMatched, cards.length]);

  // Compare 2 cards
  useEffect(() => {
    if (!choiceOne || !choiceTwo) return;

    const isMatch = choiceOne.name === choiceTwo.name;

    setTimeout(() => {
      if (isMatch) {
        // toast.success('Kartu Cocok!');
        setCards(prev =>
          prev.map(card =>
            card.name === choiceOne.name ? { ...card, matched: true } : card
          )
        );
      } else {
        // toast.warn('Kartu Tidak Cocok');
      }
      resetChoices();
    }, 1000);
  }, [choiceOne, choiceTwo]);

  // Musik kontrol
  useEffect(() => {
    if (gameStarted && isMusicPlaying && audioRef.current) {
      audioRef.current.play();
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [gameStarted, isMusicPlaying]);

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  const resetChoices = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prev => prev + 1);
  };

  const handleClick = (card: Card) => {
    if (!gameStarted || card === choiceOne || card === choiceTwo || card.matched) return;
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const startGame = () => {
    const selectedLevel = GameResources.find(gr => gr.level === level);
    if (!selectedLevel) return;

    const shuffled = [...selectedLevel.cards]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, matched: false }));

    setCards(shuffled);
    setTimer(120);
    setTurns(0);
    setGameStarted(true);
    setChoiceOne(null);
    setChoiceTwo(null);
    setShowModal(false);

    toast.info('Game Dimulai! Cari pasangan kartu yang sama!');
  };

  const nextGame = () => {
    const currentIndex = GameResources.findIndex(gr => gr.level === level);
    const nextIndex = (currentIndex + 1) % GameResources.length;
    const nextLevel = GameResources[nextIndex].level;
    router.push(`/dashboard/games/cardmatch/${nextLevel}`);
  };

  return (
    <div className="text-center text-blue-800 dark:text-blue-200 min-h-screen">
      <Nav title={level} link={back} timer={timer} isMusicPlaying={isMusicPlaying} toggleMusic={toggleMusic} />

      <div className="flex justify-center items-center gap-4 mb-4">
        {!gameStarted && (
          <button
            onClick={startGame}
            className="text-md md:text-2xl font-bold bg-blue-200 dark:bg-blue-700 px-4 py-2 rounded-xl hover:bg-blue-300 dark:hover:bg-blue-600 transition-all"
          >
            Ayo Mulai
          </button>
        )}
        
        
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-5 py-10 max-w-6xl mx-auto justify-items-center items-center">
        {cards.map((card, i) => (
          <CardComponent
            key={card.cardId}
            index={i}
            card={card}
            handleClick={handleClick}
            choiceOne={choiceOne}
            choiceTwo={choiceTwo}
            matched={allMatched}
          />
        ))}
      </div>

      {/* Audio element */}
      <audio 
        ref={audioRef} 
        src="/sounds/game-music.mp3" 
        loop 
      />

      <ToastContainer 
        position="top-center" 
        theme="colored" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ModalComponent showModal={showModal} nextGame={nextGame} />
    </div>
  );
}
