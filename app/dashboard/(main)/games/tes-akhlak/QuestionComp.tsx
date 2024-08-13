import { QuestionComponentProps } from "./interface";

export const QuestionComponent: React.FC<QuestionComponentProps> = ({ category, questionText, answers, selectedAnswer, onAnswerClick }) => {
    return (
        <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg mt-4">
            <h2 className="text-xl mb-4">Kategori: {category}</h2>
            <p className="mb-4 font-semibold text-2xl">{questionText}</p>
            <div className="space-y-4">
                {answers.map((answer) => (
                    <div 
                        key={answer.label}
                        onClick={() => onAnswerClick(answer.label)}
                        className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${selectedAnswer === answer.label ? 'bg-green-100 text-gray-900' : 'bg-gray-800 text-white'}`}
                    >
                        <div className={`w-6 h-6 flex items-center justify-center rounded-full ${selectedAnswer === answer.label ? 'bg-teal-500' : 'bg-gray-700'}`}>
                            <span>{answer.label}</span>
                        </div>
                        <p>{answer.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};