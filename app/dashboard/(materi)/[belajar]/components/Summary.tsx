import { ResultSummaryProps } from "./interface";
export const ResultSummary: React.FC<ResultSummaryProps> = ({ examtitle, currentQuestion, totalQuestions, score, message }) => {
    return (
        <div className=" border flex justify-center rounded-lg shadow-md">
            <div className="p-6 flex gap-5 items-center justify-between">
                <h2 className="text-lg md:text-2xl font-bold mb-4 text-center">{examtitle}</h2>
                <div className="text-center">
                    <p className="text-sm uppercase tracking-wide text-gray-400">Soal</p>
                    <p className="text-3xl font-extrabold">{currentQuestion}/{totalQuestions}</p>
                </div>
                {
                    score && (
                        <div className="text-center">
                            <p className="text-sm uppercase tracking-wide text-gray-400">Score</p>
                            <p className="text-5xl font-extrabold dark:text-teal-400">{score}</p>
                        </div>
                    )
                }
                
            </div>
            
            {message && <p className="mt-4 text-center text-lg font-medium text-teal-400">{message}</p>}
        </div>
    );
};
