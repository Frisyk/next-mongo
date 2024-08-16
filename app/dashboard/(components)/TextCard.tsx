'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TextCard = ({ text }: { text: any }) => {
  return (
    <div className="p-10 bg-gradient-to-br from-purple-800 via-blue-700 to-purple-400 min-h-40 text-white rounded-lg shadow-md flex-shrink-0">
      <div className="flex items-center justify-between">
        <div
          className="text-3xl leading-relaxed font-bold"
          dangerouslySetInnerHTML={{ __html: text }}
        ></div>
        <button className="bg-orange-400 p-2 rounded-full self-start">
          {/* Add button content here if needed */}
        </button>
      </div>
      <p>by: Your name</p>
    </div>
  );
};

const Carousel = () => {
  const cards = [
    "3 Kata Ajaib: <br/> Maaf, Tolong, Terima Kasih",
    "3 Kata Ajaib: <br/> Maaf, Tolong, Terima Kasih",
    "3 Kata Ajaib: <br/> Maaf, Tolong, Terima Kasih",
    "3 Kata Ajaib: <br/> Maaf, Tolong, Terima Kasih",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  return (
    <div className="relative w-full rounded overflow-hidden">
      <motion.div
        className="flex gap-4"
        initial={{ x: 0 }}
        animate={{ x: `-${currentIndex * 100}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {cards.concat(cards).map((text, index) => (
          <TextCard key={index} text={text} />
        ))}
      </motion.div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={handlePrevious}
      >
        &#8249;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={handleNext}
      >
        &#8250;
      </button>
    </div>
  );
};

export default Carousel;
