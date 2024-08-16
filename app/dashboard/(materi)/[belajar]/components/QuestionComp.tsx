import { QuestionComponentProps } from "./interface";

export const QuestionComponent: React.FC<QuestionComponentProps> = ({ category, questionText, answers, selectedAnswer, onAnswerClick }) => {
    return (
        <div className="px-6 pb-10 bg-gray-900 text-white rounded-lg shadow-lg mt-4">
            <h2 className="text-md py-3">Kategori: {category}</h2>
            <p className="pb-10 leading-relaxed font-semibold text-3xl">{questionText}</p>
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