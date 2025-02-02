'use client'

import React, { useEffect, useState } from 'react';
import { ResultSummary } from '../components/Summary';
import { QuestionComponent } from '../components/QuestionComp';
import { NavigationComponent } from '../components/Navigation';
import { putUserScore } from '@/lib/admin/students';
import 'react-toastify/dist/ReactToastify.css';
import { useConfirmEndTest } from '../components/Dialog';
import { Question } from '../components/interface';
import Header from '../components/Header-Layout';
import { PiTimer } from 'react-icons/pi';
import Modal from '../components/Modals';
import { useRouter } from 'next/navigation';

interface AppProps {
    user: string;
    quizM: string;
    title: string;
    link: string;
}

interface SelectedAnswers {
    [key: number]: string;
}

export default function App({ user, quizM, title, link }: AppProps) {
    const DURATION = 300;
    const [currentQuestion, setCurrentQuestion] = useState<number>(1);
    const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});
    const [finalScore, setFinalScore] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(DURATION);
    const [isTimeUp, setIsTimeUp] = useState<boolean>(false);
    const [timerActive, setTimerActive] = useState<boolean>(false);
    const [showStartModal, setShowStartModal] = useState<boolean>(true);
    const [showResultModal, setShowResultModal] = useState<boolean>(false);
    const [answers, setAnswers] = useState(0)
    const router = useRouter()
    
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
        setShowStartModal(false);
    };

    const handleAnswerClick = (label: string) => {
        if (timerActive && !isTimeUp) {
            setSelectedAnswers(prev => ({ ...prev, [currentQuestion]: label }));
        }
    };

    let score = 0;
    const handleSubmit = async () => {
        quiz.forEach((question, index) => {
            const userAnswer = selectedAnswers[index + 1];
            const correctAnswer = question.answers.find(answer => answer.isCorrect);
            if (userAnswer === correctAnswer?.label) {
                score += 10;
                setAnswers(prevAnswers => prevAnswers + 1)
            }
        });
        await putUserScore(user, title, score);
        setFinalScore(score);
        setIsTimeUp(true);
        setTimerActive(false);
        setShowResultModal(true);
    };
    
    const handleReset = () => {
        setShowResultModal(false);
        setTimerActive(false);
        setTimeLeft(DURATION);
        setCurrentQuestion(1);
        setSelectedAnswers({});
        setFinalScore(null);
        setIsTimeUp(false);
        
        setTimeout(() => {
            setShowStartModal(true);
        }, 100);
    };

    const currentQuestionData = quiz[currentQuestion - 1];
    const { confirmEndTest, modal } = useConfirmEndTest(handleSubmit);
    
    return (
        <div className="mx-auto">
            <Header title={title} link={link} />
            <div className="p-4 md:w-4/5 mx-auto mt-4 flex flex-col gap-4 md:gap-5">
                <Modal isOpen={showStartModal} onClose={() => router.back()}>
                    <h2 className="text-xl font-bold">Mulai Quiz</h2>
                    <p>Klik tombol di bawah untuk memulai Quiz.</p>
                    <button onClick={handleStart} className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg">
                        Mulai Quiz
                    </button>
                </Modal>

                {timerActive && (
                    <section className="w-full mx-auto">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xl flex items-center gap-1 font-bold">
                                <PiTimer className='text-2xl'/> {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
                            </span>
                            <button onClick={confirmEndTest} className="bg-red-500 text-white p-2 rounded">
                            Akhiri Ujian
                            </button>
                            {modal}
                        </div>
                    </section>
                )}

                {timerActive && (
                    <section className="mx-auto w-full flex flex-col">
                        <QuestionComponent
                            category={currentQuestionData.category}
                            questionText={currentQuestionData.questionText}
                            answers={currentQuestionData.answers}
                            selectedAnswer={selectedAnswers[currentQuestion] || null}
                            onAnswerClick={handleAnswerClick}
                        />
                        <NavigationComponent
                            onSelect={setCurrentQuestion}
                            currentQuestion={currentQuestion}
                            totalQuestions={totalQuestions}
                            onPrevious={() => setCurrentQuestion(prev => Math.max(1, prev - 1))}
                            onNext={() => setCurrentQuestion(prev => Math.min(totalQuestions, prev + 1))}
                            onSubmit={handleSubmit}
                        />
                    </section>
                )}

                <Modal isOpen={showResultModal} onClose={() => router.back()}>
                    <ResultSummary
                        correctAnswer={answers}
                        message="Hasil ujian Anda"
                        examtitle={title}
                        totalQuestions={totalQuestions}
                        score={finalScore}
                    />
                    <button onClick={handleReset} className="mt-4 mx-auto w-full transition-all duration-500 hover:bg-orange-300 bg-orange-400 text-gray-900 px-4 py-2 rounded-lg">
                        Ulangi Ujian
                    </button>
                </Modal>
            </div>
        </div>
    );
};