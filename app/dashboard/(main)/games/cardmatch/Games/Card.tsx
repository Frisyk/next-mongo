import Image from "next/image";
import { Card } from "./type";

interface CardComponentProps {
    card: Card;
    handleClick: (card: Card) => void;
    choiceOne: Card | null;
    choiceTwo: Card | null;
    matched: boolean;
    index: number;
  }
  
  const CardComponent: React.FC<CardComponentProps> = ({ card, index, handleClick, choiceOne, choiceTwo, matched }) => (
    <div
      className={`card aspect-square w-full max-w-[180px] rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-transform duration-300 ease-in-out ${
        card === choiceOne || card === choiceTwo || card.matched
          ? "flipped scale-105"
          : "hover:scale-95"
      }`}
      onClick={() => handleClick(card)}
    >
      <Image
        className="w-full h-full object-contain front"
        width={180}
        height={180}
        src={card.src}
        alt="card front"
    />

      <div
        className={`absolute top-0 left-0 w-full h-full back flex items-center justify-center text-white font-bold text-lg lg:text-2xl rounded-2xl ${
          index % 2 === 0
            ? "bg-blue-500 dark:bg-blue-700"
            : "bg-teal-700 dark:bg-teal-900"
        } ${card.matched ? "matched" : ""}`}
      >
        Batika
      </div>
    </div>

  );
  
  export default CardComponent;
  