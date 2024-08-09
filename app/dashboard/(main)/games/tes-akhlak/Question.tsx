'use client'
import React, { useState } from 'react';

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
    date: string;
    totalQuestions: number;
    score: number;
    message: string;
}

const ResultSummary: React.FC<ResultSummaryProps> = ({ date, totalQuestions, score, message }) => {
    return (
        <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Hasil Exam</h2>
            <p className="text-sm mb-2">Tanggal Ujian: {date}</p>
            <div className="flex justify-between mb-2">
                <div>
                    <p>Total soal</p>
                    <p className="text-4xl font-bold">{totalQuestions}</p>
                </div>
                <div>
                    <p>Score</p>
                    <p className="text-4xl font-bold">{score}</p>
                </div>
            </div>
            <p className="mt-4">{message}</p>
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
            <h2 className="text-xl font-semibold mb-4">Kategori: {category}</h2>
            <p className="mb-4">{questionText}</p>
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
}

const NavigationComponent: React.FC<NavigationComponentProps> = ({ currentQuestion, totalQuestions, onPrevious, onNext, onSubmit }) => {
    return (
        <div className="flex justify-between items-center mt-6">
            <button onClick={onPrevious} className="flex items-center px-4 py-2 rounded-lg bg-gray-800 text-white">
                Sebelumnya
            </button>
            <div className="flex space-x-2">
                {[...Array(totalQuestions)].map((_, i) => (
                    <div 
                        key={i} 
                        className={`w-8 h-8 flex items-center justify-center rounded-lg ${i + 1 === currentQuestion ? 'bg-teal-400 text-gray-900' : 'bg-gray-800 text-white'}`}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>
            <button onClick={onNext} className="flex items-center px-4 py-2 rounded-lg bg-gray-800 text-white">
                Selanjutnya
            </button>
            {currentQuestion === totalQuestions && (
                <button onClick={onSubmit} className="flex items-center px-4 py-2 rounded-lg bg-teal-500 text-white">
                    Submit
                </button>
            )}
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
    const [isAnswered, setIsAnswered] = useState<boolean>(false);
    const [finalScore, setFinalScore] = useState<number | null>(null);
    const totalQuestions = exampleQuestions.length;
    const date = "09 Agt 2024 pukul 20:49:22"; 
    const message = "Selamat! Anda telah lulus dari ujian ini.";

    const handleAnswerClick = (label: string) => {
        if (!isAnswered) {
            setSelectedAnswers(prev => ({ ...prev, [currentQuestion]: label })); // Save answer
            setIsAnswered(true);
        }
    };

    const handleNext = () => {
        if (currentQuestion < totalQuestions) {
            setCurrentQuestion(prev => prev + 1);
            setIsAnswered(false); // Reset answer status
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 1) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const handleSubmit = () => {
        if (currentQuestion === totalQuestions) {
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
        }
    };

    const currentQuestionData = exampleQuestions[currentQuestion - 1];

    return (
        <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg">
            <ResultSummary 
                date={date} 
                totalQuestions={totalQuestions} 
                score={finalScore !== null ? finalScore : 0} 
                message={message} 
            />
            <QuestionComponent 
                category={currentQuestionData.category} 
                questionText={currentQuestionData.questionText} 
                answers={currentQuestionData.answers} 
                selectedAnswer={selectedAnswers[currentQuestion] || null} // Pass the current selected answer
                onAnswerClick={handleAnswerClick}
            />
            <NavigationComponent 
                currentQuestion={currentQuestion} 
                totalQuestions={totalQuestions} 
                onPrevious={handlePrevious} 
                onNext={handleNext} 
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default App;
