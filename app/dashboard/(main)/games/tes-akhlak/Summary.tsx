import { ResultSummaryProps } from "./interface";

export const ResultSummary: React.FC<ResultSummaryProps> = ({ examtitle, currentQuestion, totalQuestions, score, message }) => {
    return (
        <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">{examtitle}</h2>
            <div className="flex justify-between mb-2">
                <div>
                    <p>Soal</p>
                    <p className="text-4xl font-bold">{currentQuestion}/{totalQuestions}</p>
                </div>
                <div>
                    <p>Score</p>
                    <p className="text-4xl font-bold">{score}</p>
                </div>
            </div>
            {/* <p className="mt-4">{message}</p> */}
        </div>
    );
};
