'use client'

import React, { useEffect, useState } from 'react';
import { NavigationComponentProps, Question, QuestionComponentProps, ResultSummaryProps } from './interface';
import { ResultSummary } from './Summary';
import { QuestionComponent } from './QuestionComp';
import { NavigationComponent } from './Navigation';
import { getUserAttempt, putUserScore } from '@/lib/auth';

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


export default function App ({user}: {user:string}) {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string | null }>({});
    const [finalScore, setFinalScore] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes = 600 seconds
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [timerActive, setTimerActive] = useState(false); // Tracks whether the timer is active
    const totalQuestions = exampleQuestions.length;
    // const message = "Selamat! Anda telah lulus dari ujian ini.";
    

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
        // setTimeLeft(600)
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

    const handleSubmit = async() => {
        const calculateScore = async() => {
            let score = 0;
            exampleQuestions.forEach((question, index) => {
                const userAnswer = selectedAnswers[index + 1];
                const correctAnswer = question.answers.find(answer => answer.isCorrect);
                if (userAnswer === correctAnswer?.label) {
                    score += 10;
                }
            });
            const attempt = await getUserAttempt(user)            
            const testTitle = 'tes'
            const testName = `${testTitle} ${attempt}`;
            await putUserScore(user, testName, score)
            return score;
        };

        const score = await calculateScore()
        
        setFinalScore(score);
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
        <div className="p-4 bg-gray-900 text-white rounded-lg shadow-lg w-full md:w-1/2 mx-auto">
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
            <ResultSummary
                examtitle={'UJIAN 1'}
                currentQuestion={currentQuestion}
                totalQuestions={totalQuestions}
                score={finalScore !== null ? finalScore : 0}
                message={''}
            />
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