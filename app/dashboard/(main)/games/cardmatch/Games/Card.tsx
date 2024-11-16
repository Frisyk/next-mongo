import Image from "next/image";
import { Card } from "./type";

interface CardComponentProps {
    card: Card;
    handleClick: (card: Card) => void;
    choiceOne: Card | null;
    choiceTwo: Card | null;
    matched: boolean;
  }
  
  const CardComponent: React.FC<CardComponentProps> = ({ card, handleClick, choiceOne, choiceTwo, matched }) => (
    <div className={card === choiceOne || card === choiceTwo || card.matched ? "card flipped w-full cursor-pointer lg:w-52 " : "card w-full cursor-pointer lg:w-52"} onClick={() => handleClick(card)}>
        <Image className="lg:min-w-52 w-20 max-h-40 object-contain front" src={card.src} alt="card front" />
        <div className="w-full lg:min-w-52 h-40 bg-blue-500 back flex items-center justify-center text-xl text-blue-200 rounded-2xl">ShalatYUK</div>
    </div>
  );
  
  export default CardComponent;
  