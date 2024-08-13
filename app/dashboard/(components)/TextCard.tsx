'use client'
import React from 'react';
import { motion } from 'framer-motion';

const TextCard = ({ text }: {text: any}) => {
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

  return (
    <div className="overflow-hidden relative w-full rounded">
      <motion.div
        className="flex gap-4"
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 10,
          ease: "linear"
        }}
      >
        {cards.concat(cards).map((text, index) => (
          <TextCard key={index} text={text} />
        ))}
      </motion.div>
    </div>
  );
};

export default Carousel;
