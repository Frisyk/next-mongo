"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const allQuestions = [
  { question: "Siapakah nabi terakhir dalam Islam?", options: ["Nabi Musa", "Nabi Isa", "Nabi Muhammad", "Nabi Ibrahim"], answer: "Nabi Muhammad" },
  { question: "Apa kitab suci umat Islam?", options: ["Taurat", "Zabur", "Injil", "Al-Qur'an"], answer: "Al-Qur'an" },
  { question: "Berapa jumlah rakaat dalam shalat Maghrib?", options: ["2", "3", "4", "5"], answer: "3" },
  { question: "Apa rukun Islam yang pertama?", options: ["Shalat", "Zakat", "Syahadat", "Puasa"], answer: "Syahadat" },
  { question: "Di kota mana Ka'bah berada?", options: ["Madinah", "Yerusalem", "Makkah", "Baghdad"], answer: "Makkah" },
  { question: "Siapakah malaikat yang mencatat amal manusia?", options: ["Jibril", "Israfil", "Mikail", "Raqib & Atid"], answer: "Raqib & Atid" },
  { question: "Berapa jumlah bulan dalam kalender Hijriyah?", options: ["10", "11", "12", "13"], answer: "12" },
];

export default function IslamicQuiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0) {
      handleNextQuestion();
    }
  }, [timeLeft, gameStarted]);

  function shuffleArray(array: Question[]): Question[] {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function startGame() {
    setQuestions(shuffleArray(allQuestions).slice(0, 5));
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameStarted(true);
    setTimeLeft(10);
  }

  function handleAnswer(option: string) {
    if (!selectedAnswer) {
      setSelectedAnswer(option);
      if (option === questions[currentIndex].answer) {
        setScore(score + 1);
      }
      setTimeout(handleNextQuestion, 1000);
    }
  }

  function handleNextQuestion() {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setTimeLeft(10);
    } else {
      setShowResult(true);
    }
  }

  return (
    <div className="mt-10 flex flex-col items-center justify-center p-4">
      {!gameStarted ? (
        <motion.button
          onClick={startGame}
          className="px-6 py-3 text-lg font-bold text-white bg-green-500 rounded-lg shadow-lg hover:bg-green-600 transition"
          whileHover={{ scale: 1.1 }}
        >
          🎮 Mulai Quiz
        </motion.button>
      ) : showResult ? (
        <div className="p-6 rounded-lg shadow-lg max-w-md w-full text-center  border-2 border-green-500">
          <h2 className="text-2xl font-bold">🎉 Hasil Quiz</h2>
          <p className="text-lg">Skor Anda: {score} / {questions.length}</p>
          <button
            onClick={startGame}
            className="mt-4 px-6 py-3 text-lg font-bold text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 transition"
          >
            🔄 Ulangi Quiz
          </button>
        </div>
      ) : (
        <div className="p-6 rounded-lg shadow-lg max-w-md w-full text-center bg-yellow-100 border-2 border-yellow-500">
          <div className="mb-2 h-4 bg-gray-300 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-red-500"
              animate={{ width: `${(timeLeft / 10) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">{questions[currentIndex]?.question}</h2>
          <div className="mt-4 space-y-2">
            {questions[currentIndex]?.options.map((option, idx) => (
              <motion.button
                key={idx}
                onClick={() => handleAnswer(option)}
                className={`block w-full px-4 py-2 rounded-lg text-lg font-semibold transition-all shadow-lg ${
                  selectedAnswer === option
                    ? option === questions[currentIndex].answer
                      ? "bg-green-400"
                      : "bg-red-400"
                    : "bg-blue-400 hover:bg-blue-500"
                }`}
                disabled={selectedAnswer !== null}
                whileHover={{ scale: 1.05 }}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
