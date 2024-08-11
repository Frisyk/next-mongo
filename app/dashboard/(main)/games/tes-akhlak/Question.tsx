'use client'
import React, { useEffect, useState } from 'react';

// Define the types for answers and questions
interface AnswerOption {
    label: string;
    text: string;
    isCorrect: boolean;
    isSelected: boolean;
}

interface Question {
    category: string;
    questionText: string;
    answers: AnswerOption[];
}

interface ResultSummaryProps {
    examtitle: string;
    currentQuestion: number;
    totalQuestions: number;
    score: number;
    message: string;
}

const ResultSummary: React.FC<ResultSummaryProps> = ({ examtitle, currentQuestion, totalQuestions, score, message }) => {
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

interface QuestionComponentProps {
    category: string;
    questionText: string;
    answers: AnswerOption[];
    selectedAnswer: string | null;
    onAnswerClick: (label: string) => void;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({ category, questionText, answers, selectedAnswer, onAnswerClick }) => {
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

interface NavigationComponentProps {
    currentQuestion: number;
    totalQuestions: number;
    onPrevious: () => void;
    onNext: () => void;
    onSubmit: () => void;
    onSelect: (questionNumber: number) => void;
}

const NavigationComponent: React.FC<NavigationComponentProps> = ({ currentQuestion, totalQuestions, onPrevious, onNext, onSubmit, onSelect }) => {
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

const exampleQuestions: Question[] = [
    {
        category: 'Etika',
        questionText: 'Apa prinsip utama dalam etika utilitarianisme?',
        answers: [
            { label: 'A', text: 'Mengutamakan hasil yang membawa kebahagiaan terbesar bagi jumlah terbesar', isCorrect: true, isSelected: false },
            { label: 'B', text: 'Mengutamakan hak individu tanpa memperhatikan hasil akhir', isCorrect: false, isSelected: false },
            { label: 'C', text: 'Mengutamakan kewajiban moral yang diterima secara universal', isCorrect: false, isSelected: false },
            { label: 'D', text: 'Mengutamakan tindakan yang sesuai dengan norma budaya setempat', isCorrect: false, isSelected: false },
        ],
    },
    {
        category: 'Moralitas',
        questionText: 'Menurut teori deontologi, apa yang harus diperhatikan dalam pengambilan keputusan etis?',
        answers: [
            { label: 'A', text: 'Konsekuensi dari tindakan tersebut', isCorrect: false, isSelected: false },
            { label: 'B', text: 'Kepatuhan terhadap aturan dan kewajiban moral', isCorrect: true, isSelected: false },
            { label: 'C', text: 'Apakah tindakan tersebut membuat lebih banyak orang bahagia', isCorrect: false, isSelected: false },
            { label: 'D', text: 'Apakah tindakan tersebut diterima oleh mayoritas masyarakat', isCorrect: false, isSelected: false },
        ],
    },
    {
        category: 'Integritas',
        questionText: 'Apa yang dimaksud dengan integritas dalam konteks etika profesional?',
        answers: [
            { label: 'A', text: 'Kemampuan untuk mematuhi kode etik dan berperilaku jujur dalam semua situasi', isCorrect: true, isSelected: false },
            { label: 'B', text: 'Mengutamakan keuntungan pribadi di atas kepentingan umum', isCorrect: false, isSelected: false },
            { label: 'C', text: 'Menyesuaikan perilaku dengan harapan orang lain', isCorrect: false, isSelected: false },
            { label: 'D', text: 'Berperilaku sesuai dengan norma yang berlaku di tempat kerja', isCorrect: false, isSelected: false },
        ],
    },
    {
        category: 'Etika Sosial',
        questionText: 'Apa prinsip dasar dari etika sosial dalam masyarakat?',
        answers: [
            { label: 'A', text: 'Mengutamakan kepentingan individu di atas kepentingan sosial', isCorrect: false, isSelected: false },
            { label: 'B', text: 'Berperilaku adil dan mengutamakan kesejahteraan bersama', isCorrect: true, isSelected: false },
            { label: 'C', text: 'Mematuhi norma-norma yang berlaku tanpa mempertimbangkan dampak sosial', isCorrect: false, isSelected: false },
            { label: 'D', text: 'Mengejar kekuasaan dan status untuk meningkatkan pengaruh sosial', isCorrect: false, isSelected: false },
        ],
    },
    {
        category: 'Etika Bisnis',
        questionText: 'Apa yang dimaksud dengan etika bisnis dalam konteks perusahaan?',
        answers: [
            { label: 'A', text: 'Prinsip moral yang diterapkan untuk meningkatkan profit tanpa memperhatikan dampak sosial', isCorrect: false, isSelected: false },
            { label: 'B', text: 'Kepatuhan terhadap hukum dan peraturan perusahaan', isCorrect: false, isSelected: false },
            { label: 'C', text: 'Prinsip moral yang mengatur bagaimana perusahaan harus berperilaku secara adil dan bertanggung jawab terhadap semua pihak yang terlibat', isCorrect: true, isSelected: false },
            { label: 'D', text: 'Fokus pada strategi pemasaran untuk meningkatkan daya saing', isCorrect: false, isSelected: false },
        ],
    },
    // Add more questions as needed
];


const App: React.FC = () => {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string | null }>({});
    const [finalScore, setFinalScore] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes = 600 seconds
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [timerActive, setTimerActive] = useState(false); // Tracks whether the timer is active
    const totalQuestions = exampleQuestions.length;
    const message = "Selamat! Anda telah lulus dari ujian ini.";

    useEffect(() => {
        if (timerActive && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setIsTimeUp(true);
            handleSubmit();
        }
    }, [timerActive, timeLeft]);

    const handleStart = () => {
        setTimerActive(true);
    };

    const handleAnswerClick = (label: string) => {
        if (timerActive && !isTimeUp) {
            setSelectedAnswers(prev => ({ ...prev, [currentQuestion]: label })); // Save answer
        }
    };

    const handleNext = () => {
        if (timerActive && currentQuestion < totalQuestions) {
            setCurrentQuestion(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (timerActive && currentQuestion > 1) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const handleSubmit = () => {
        const calculateScore = () => {
            let score = 0;
            exampleQuestions.forEach((question, index) => {
                const userAnswer = selectedAnswers[index + 1];
                const correctAnswer = question.answers.find(answer => answer.isCorrect);
                if (userAnswer === correctAnswer?.label) {
                    score += 10;
                }
            });
            return score;
        };

        setFinalScore(calculateScore());
        setIsTimeUp(true);
        setTimerActive(false);
        setTimeLeft(600); // Reset the timer to 10 minutes
    };

    const handleSelect = (questionNumber: number) => {
        if (timerActive && !isTimeUp) {
            setCurrentQuestion(questionNumber);
        }
    };

    const handleReset = () => {
        setTimerActive(false);
        setTimeLeft(600);
        setCurrentQuestion(1);
        setSelectedAnswers({});
        setFinalScore(null);
        setIsTimeUp(false);
    };

    const currentQuestionData = exampleQuestions[currentQuestion - 1];

    return (
        <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg">
            <ResultSummary
                examtitle={'UJIAN 1'}
                currentQuestion={currentQuestion}
                totalQuestions={totalQuestions}
                score={finalScore !== null ? finalScore : 0}
                message={message}
            />
            <div className="flex justify-between items-center mb-4">
                <span>Waktu tersisa: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</span>
                {!timerActive && !isTimeUp && (
                    <button onClick={handleStart} className="bg-teal-400 text-gray-900 px-4 py-2 rounded-lg">
                        Mulai Ujian
                    </button>
                )}
                {timerActive && (
                    <button onClick={handleSubmit} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                        Selesai
                    </button>
                )}
            </div>
            <QuestionComponent
                category={currentQuestionData.category}
                questionText={currentQuestionData.questionText}
                answers={currentQuestionData.answers}
                selectedAnswer={selectedAnswers[currentQuestion] || null}
                onAnswerClick={handleAnswerClick}
            />
            <NavigationComponent
                onSelect={handleSelect}
                currentQuestion={currentQuestion}
                totalQuestions={totalQuestions}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSubmit={handleSubmit}
            />
            {isTimeUp && (
                <button onClick={handleReset} className="bg-teal-400 text-gray-900 px-4 py-2 rounded-lg mt-4">
                    Ulangi Ujian
                </button>
            )}
        </div>
    );
};

export default App;