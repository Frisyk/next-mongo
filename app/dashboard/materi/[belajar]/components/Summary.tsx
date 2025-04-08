import { ResultSummaryProps } from "./interface";

export const ResultSummary: React.FC<ResultSummaryProps> = ({
    examtitle,
    correctAnswer,
    totalQuestions,
    score,
    message,
}) => {
    return (
        <div className="flex justify-center items-center">
            <div className="w-full max-w-lg p-8 rounded-xl transform transition-all duration-500">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-teal-500 animate__animated animate__fadeIn">
                    {examtitle}
                </h2>

                <div className="text-center mb-6">
                    <p className="text-sm uppercase tracking-widest text-gray-500">Jawaban Benar</p>
                    <p className="text-4xl font-extrabold text-teal-600">{correctAnswer}/{totalQuestions}</p>
                </div>

                {message && (
                    <p className="mt-4 text-center text-lg font-medium text-teal-400 animate__animated animate__fadeIn">
                        {message}
                    </p>
                )}

                {score && (
                    <div className="text-center mt-8">
                        <p className="text-sm uppercase tracking-widest text-gray-500">Skor</p>
                        <p className="text-6xl font-extrabold text-teal-500 dark:text-teal-400">
                            {score}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};


