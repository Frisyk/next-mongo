import { QuestionComponentProps } from "./interface";

export const QuestionComponent: React.FC<QuestionComponentProps> = ({ category, questionText, answers, selectedAnswer, onAnswerClick }) => {
    return (
        <div className="px-6 pb-10 rounded-lg mt-4">
            {/* <h2 className="text-md py-3">Kategori: {category}</h2> */}
            <p className="pb-10 leading-relaxed font-semibold md:text-3xl">{questionText}</p>
            <div className="space-y-4">
                {answers.map((answer) => (
                    <div 
                        key={answer.label}
                        onClick={() => onAnswerClick(answer.label)}
                        className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${selectedAnswer === answer.label ? 'bg-gray-800 dark:bg-gray-700 text-white' : ''}`}
                    >
                        <div className={`w-6 h-6 flex  items-center text-lg justify-center rounded-full font-bold`}>
                            <span>{answer.label}.</span>
                        </div>
                        <p className="md:text-xl md:max-w-lg">{answer.text}</p>
                        <hr className="border-gray-300 dark:border-slate-700 my-2" />
                    </div>
                ))}
            </div>
        </div>
    );
};