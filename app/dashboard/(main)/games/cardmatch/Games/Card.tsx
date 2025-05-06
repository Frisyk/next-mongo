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
      className={`card w-full cursor-pointer lg:w-52 transition-all duration-500 transform ${
        card === choiceOne || card === choiceTwo || card.matched 
          ? "flipped scale-105" 
          : "hover:scale-95"
      }`} 
      onClick={() => handleClick(card)}
    >
        <Image className="lg:min-w-52 w-20 max-h-40 front animate-pulse" src={card.src} alt="card front" />
        <div className={`w-full lg:min-w-52 h-40 ${
          index % 2 === 0 
            ? "bg-blue-500 dark:bg-blue-700" 
            : "bg-teal-700 dark:bg-teal-900"
          } back flex items-center justify-center text-white font-bold text-2xl rounded-2xl ${
            card.matched ? "matched animate-bounce" : ""
          }`
        }>
          Batika
        </div>
    </div>
  );
  
  export default CardComponent;
  