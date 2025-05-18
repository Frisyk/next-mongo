import { FaBackward } from "react-icons/fa";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { NavigationComponentProps } from "./interface";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

export const NavigationComponent: React.FC<NavigationComponentProps> = ({ currentQuestion, totalQuestions, onPrevious, onNext, onSubmit, onSelect }) => {
    return (
        <div className="flex justify-between items-center overflow-hidden m-3">
            <button 
                onClick={onPrevious} 
                className={`flex items-center px-2 py-2 rounded-lg ${currentQuestion === 1 ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'dark:bg-gray-800 outline-1 outline dark:outline-none cursor-pointer'}`}
                disabled={currentQuestion === 1} // Disable button when currentQuestion is 1
            >
                <MdNavigateBefore className="w-6 h-6 mx-2" /><span className="hidden md:block">Sebelumnya</span>
            </button>
            <div className="flex space-x-2 overflow-x-scroll">
                {[...Array(totalQuestions)].map((_, i) => (
                    <div 
                        key={i} 
                        onClick={() => onSelect(i + 1)}
                        className={`w-10 h-10 flex cursor-pointer items-center justify-center rounded-lg ${i + 1 === currentQuestion ? 'bg-teal-400 text-gray-900' : 'dark:bg-gray-800 outline-1 outline dark:outline-none'}`}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>
            
            <button 
                onClick={onNext} 
                className={`flex items-center px-2 py-2 rounded-lg ${currentQuestion === totalQuestions ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'dark:bg-gray-800 outline-1 outline dark:outline-none cursor-pointer'}`}
                disabled={currentQuestion === totalQuestions} // Disable button when currentQuestion is the last one
            >
                <span className="hidden md:block">Selanjutnya</span><MdNavigateNext className="w-6 h-6 mx-2" />
            </button>
        </div>
    );
};