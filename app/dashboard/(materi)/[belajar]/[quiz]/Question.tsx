'use client'

import React, { useEffect, useState } from 'react';
import { ResultSummary } from '../components/Summary';
import { QuestionComponent } from '../components/QuestionComp';
import { NavigationComponent } from '../components/Navigation';
import { putUserScore } from '@/lib/action';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmEndTest } from '../components/Dialog';
import { Question } from '../components/interface';
import Header from '../components/Header-Layout';

export default function App({ user, quizM, title, link }: { user: string, quizM: string, title: string, link: string }) {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string | null }>({});
    const [finalScore, setFinalScore] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes = 600 seconds
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [timerActive, setTimerActive] = useState(false); // Tracks whether the timer is active
    
    const quiz: Question[] = JSON.parse(quizM);
    const totalQuestions = quiz.length;

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

    const handleSubmit = async () => {
        const calculateScore = async () => {
            let score = 0;
            quiz.forEach((question: Question, index: number) => {
                const userAnswer = selectedAnswers[index + 1];
                const correctAnswer = question.answers.find(answer => answer.isCorrect);
                if (userAnswer === correctAnswer?.label) {
                    score += 10;
                }
            });
            await putUserScore(user, title, score);
            return score;
        };

        const score = await calculateScore();
        
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

    const currentQuestionData = quiz[currentQuestion - 1];

    return (
        <div className="md:h-screen mx-auto">
            <Header title={title} link={link} />
            <div className="p-4 rounded-lg shadow-lg md:mx-32 mt-4 flex flex-col md:flex-row gap-4 md:gap-5">
                <section className="md:w-1/3 w-full mx-auto">
                    <div className="flex justify-between items-center mb-10">
                        <span className="text-xl font-bold">
                            Waktu tersisa: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
                        </span>
                        {isTimeUp ? (
                            <button onClick={handleReset} className="bg-orange-400 text-gray-900 px-4 py-2 rounded-lg">
                                Ulangi Ujian
                            </button>
                        ) : !timerActive ? (
                            <button onClick={handleStart} className="bg-teal-400 text-gray-900 px-4 py-2 rounded-lg">
                                Mulai Ujian
                            </button>
                        ) : (
                            <button onClick={() => confirmEndTest(handleSubmit)} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                                Selesai
                            </button>
                        )}
                    </div>
                    <ResultSummary
                        message=''
                        examtitle={title}
                        currentQuestion={currentQuestion}
                        totalQuestions={totalQuestions}
                        score={finalScore ?? 0}
                    />
                </section>
                <ToastContainer closeButton={false} />
                <section className="mx-auto w-full flex flex-1 flex-col-reverse md:flex-col">
                    <div className="md:flex mx-auto space-x-2 hidden">
                        {[...Array(totalQuestions)].map((_, i) => (
                            <div 
                                key={i} 
                                onClick={() => handleSelect(i + 1)}
                                className={`w-8 h-8 flex cursor-pointer items-center justify-center rounded-lg ${i + 1 === currentQuestion ? 'bg-teal-400 text-gray-900' : 'bg-gray-800 text-white'}`}
                            >
                                {i + 1}
                            </div>
                        ))}
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
                </section>
            </div>
        </div>
    );
};
