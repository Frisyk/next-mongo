import { NavigationComponentProps } from "./interface";

export const NavigationComponent: React.FC<NavigationComponentProps> = ({ currentQuestion, totalQuestions, onPrevious, onNext, onSubmit, onSelect }) => {
    return (
        <div className="flex justify-between items-center mt-6">
            <button 
                onClick={onPrevious} 
                className={`flex items-center px-4 py-2 rounded-lg ${currentQuestion === 1 ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-800 text-white cursor-pointer'}`}
                disabled={currentQuestion === 1} // Disable button when currentQuestion is 1
            >
                Sebelumnya
            </button>
            <div className="flex space-x-2">
                {[...Array(totalQuestions)].map((_, i) => (
                    <div 
                        key={i} 
                        onClick={() => onSelect(i + 1)}
                        className={`w-8 h-8 flex cursor-pointer items-center justify-center rounded-lg ${i + 1 === currentQuestion ? 'bg-teal-400 text-gray-900' : 'bg-gray-800 text-white'}`}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>
            
            <button 
                onClick={onNext} 
                className={`flex items-center px-4 py-2 rounded-lg ${currentQuestion === totalQuestions ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-800 text-white cursor-pointer'}`}
                disabled={currentQuestion === totalQuestions} // Disable button when currentQuestion is the last one
            >
                Selanjutnya
            </button>
        </div>
    );
};