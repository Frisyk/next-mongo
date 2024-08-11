"use client";

import React, { useState } from 'react';

// Define types for story scenes and options
interface Option {
  text: string;
  nextScene: number;
}

interface Scene {
  title: string;
  text: string;
  options: Option[];
}

// Define the story scenes and options
const story: Scene[] = [
  {
    title: 'Memulai Perjalanan Islam',
    text: 'Kamu ingin mempelajari agama Islam. Apa yang ingin kamu lakukan?',
    options: [
      { text: 'Mempelajari Rukun Islam', nextScene: 1 },
      { text: 'Mempelajari Syahadat', nextScene: 2 },
      { text: 'Menjaga Etika Sehari-hari', nextScene: 10 },
    ],
  },
  {
    title: 'Mempelajari Rukun Islam',
    text: 'Rukun Islam adalah lima pilar utama agama Islam. Apa yang ingin kamu pelajari?',
    options: [
      { text: 'Syahadat', nextScene: 3 },
      { text: 'Sholat', nextScene: 4 },
      { text: 'Zakat', nextScene: 5 },
      { text: 'Puasa', nextScene: 6 },
      { text: 'Haji', nextScene: 7 },
    ],
  },
  {
    title: 'Mempelajari Syahadat',
    text: 'Syahadat adalah pernyataan iman dalam Islam. Ini adalah fondasi dari keyakinan Islam.',
    options: [
      { text: 'Kembali ke Menu Utama', nextScene: 0 },
      { text: 'Lanjutkan ke Rukun Islam', nextScene: 1 },
    ],
  },
  {
    title: 'Sholat',
    text: 'Sholat adalah ibadah wajib yang dilakukan lima kali sehari. Ini adalah cara untuk menjaga hubungan dengan Allah.',
    options: [
      { text: 'Kembali ke Rukun Islam', nextScene: 1 },
      { text: 'Lanjutkan ke Etika Sehari-hari', nextScene: 10 },
    ],
  },
  {
    title: 'Zakat',
    text: 'Zakat adalah kewajiban memberikan sebagian harta kepada yang membutuhkan. Ini adalah cara untuk membersihkan harta dan membantu sesama.',
    options: [
      { text: 'Kembali ke Rukun Islam', nextScene: 1 },
      { text: 'Lanjutkan ke Etika Sehari-hari', nextScene: 10 },
    ],
  },
  {
    title: 'Puasa',
    text: 'Puasa adalah ibadah menahan diri dari makan dan minum selama bulan Ramadan. Ini adalah waktu untuk refleksi dan mendekatkan diri kepada Allah.',
    options: [
      { text: 'Kembali ke Rukun Islam', nextScene: 1 },
      { text: 'Lanjutkan ke Etika Sehari-hari', nextScene: 10 },
    ],
  },
  {
    title: 'Haji',
    text: 'Haji adalah perjalanan spiritual ke Mekkah yang wajib dilakukan oleh umat Islam yang mampu. Ini adalah bentuk pengabdian dan taqwa kepada Allah.',
    options: [
      { text: 'Kembali ke Rukun Islam', nextScene: 1 },
      { text: 'Lanjutkan ke Etika Sehari-hari', nextScene: 10 },
    ],
  },
  {
    title: 'Menjaga Etika Sehari-hari',
    text: 'Etika dalam Islam mencakup berbagai aspek kehidupan sehari-hari. Ini meliputi bagaimana kamu berperilaku terhadap orang lain, berbicara, dan bertindak.',
    options: [
      { text: 'Berbicara dengan Baik', nextScene: 11 },
      { text: 'Bersikap Jujur', nextScene: 12 },
      { text: 'Bantu Sesama', nextScene: 13 },
    ],
  },
  {
    title: 'Berbicara dengan Baik',
    text: 'Dalam Islam, berbicara dengan baik adalah penting. Hindari kata-kata kasar dan pilihlah kata-kata yang membangun.',
    options: [
      { text: 'Kembali ke Etika Sehari-hari', nextScene: 10 },
      { text: 'Lanjutkan ke Bersikap Jujur', nextScene: 12 },
    ],
  },
  {
    title: 'Bersikap Jujur',
    text: 'Kejujuran adalah nilai penting dalam Islam. Selalu berkata benar dan jangan pernah berbohong.',
    options: [
      { text: 'Kembali ke Etika Sehari-hari', nextScene: 10 },
      { text: 'Lanjutkan ke Bantu Sesama', nextScene: 13 },
    ],
  },
  {
    title: 'Bantu Sesama',
    text: 'Membantu sesama adalah amal baik yang dianjurkan dalam Islam. Selalu siap membantu dan memberikan dukungan kepada yang membutuhkan.',
    options: [
      { text: 'Kembali ke Etika Sehari-hari', nextScene: 10 },
      { text: 'Kembali ke Menu Utama', nextScene: 0 },
    ],
  },
];

const SceneComponent: React.FC<{ scene: Scene; onOptionClick: (nextScene: number) => void }> = ({ scene, onOptionClick }) => (
  <div className="p-6 bg-white shadow-md rounded-md max-w-md mx-auto">
    <h2 className="text-2xl font-bold mb-4">{scene.title}</h2>
    <p className="mb-4">{scene.text}</p>
    <ul className="space-y-2">
      {scene.options.map((option) => (
        <li key={option.text}>
          <button
            onClick={() => onOptionClick(option.nextScene)}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            {option.text}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

const PerjalananIslam: React.FC = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [rukunIslam, setRukunIslam] = useState(0);

  const handleOptionClick = (nextScene: number) => {
    setCurrentScene(nextScene);

    // Update rukunIslam count based on scene
    if (nextScene >= 3 && nextScene <= 7) {
      setRukunIslam((prev) => prev + 1);
    }
  };

  const scene = story[currentScene];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold mb-6">Perjalanan Islam</h1>
        <SceneComponent scene={scene} onOptionClick={handleOptionClick} />
        {rukunIslam >= 5 && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-md shadow-md">
            Selamat! Kamu telah mempelajari semua Rukun Islam!
          </div>
        )}
      </div>
    </div>
  );
};

export default PerjalananIslam;
