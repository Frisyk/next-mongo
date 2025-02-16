"use client";
import { useState, useEffect } from "react";

// Fungsi untuk membersihkan teks dari Markdown (*, #, dll.)
const cleanText = (text?: string) => {
  if (!text) return ""; // Jika teks undefined/null, kembalikan string kosong
  return text.replace(/[*#_`]/g, "").trim();
};

// Fungsi untuk membagi teks panjang menjadi bagian kecil (kalimat)
const splitText = (text: string, maxLength: number = 200) => {
  const sentences = text.match(/[^.!?]+[.!?]/g) || [text]; // Pisah berdasarkan titik, tanda seru, tanda tanya
  const chunks = [];
  let currentChunk = "";

  for (let sentence of sentences) {
    if (currentChunk.length + sentence.length > maxLength) {
      chunks.push(currentChunk);
      currentChunk = sentence;
    } else {
      currentChunk += " " + sentence;
    }
  }
  if (currentChunk) chunks.push(currentChunk);

  return chunks;
};

const TTSButton = ({ text }: { text: string }) => {
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
  const [utterances, setUtterances] = useState<SpeechSynthesisUtterance[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if ("speechSynthesis" in window) {
      const synthesis = window.speechSynthesis;
      setSynth(synthesis);
    } else {
      console.error("Browser tidak mendukung Web Speech API");
      alert("Maaf, browser Anda tidak mendukung fitur audio.");
    }
  }, []);

  useEffect(() => {
    if (synth) {
      const cleanedText = cleanText(text);
      const utteranceList = splitText(cleanedText).map((chunk) => {
        const utter = new SpeechSynthesisUtterance(chunk);
        utter.lang = "id-ID";
        utter.rate = 0.9;
        utter.pitch = 1;

        utter.onend = () => {
          setCurrentIndex((prev) => prev + 1);
        };
        utter.onerror = (event) => {
          console.error("Error dalam pemutaran audio:", event);
          setIsPlaying(false);
          alert("Terjadi kesalahan saat memutar audio.");
        };

        return utter;
      });

      setUtterances(utteranceList);
    }
  }, [text, synth]);

  const playAudio = () => {
    if (!synth || utterances.length === 0) return;

    setCurrentIndex(0);
    setIsPlaying(true);
    
    synth.cancel(); // Hentikan jika masih ada suara yang berjalan
    setTimeout(() => {
      synth.speak(utterances[0]); // Tunggu sebelum memulai ulang
    }, 500);
  };

  useEffect(() => {
    if (synth && isPlaying && currentIndex < utterances.length) {
      synth.speak(utterances[currentIndex]);
    } else if (currentIndex >= utterances.length) {
      setIsPlaying(false);
    }
  }, [currentIndex]);

  const stopAudio = () => {
    if (synth) {
      synth.cancel();
      setIsPlaying(false);
      setCurrentIndex(0);
    }
  };

  return (
    <button
      onClick={isPlaying ? stopAudio : playAudio}
      className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg text-white flex items-center gap-2 ${
        isPlaying ? "bg-red-500" : "bg-blue-500"
      }`}
    >
      <span className="text-xl">{isPlaying ? "⏹️" : "🔊"}</span>
      {isPlaying ? "Hentikan" : "Dengarkan"}
    </button>
  );
};

export default TTSButton;
