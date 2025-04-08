export interface AnswerOption {
    label: string;
    text: string;
    isCorrect: boolean;
    isSelected: boolean;
}

export interface Question {
    category: string;
    questionText: string;
    answers: AnswerOption[];
}

export interface ResultSummaryProps {
    examtitle: string;
    totalQuestions: number;
    score: number|null;
    message: string;
    correctAnswer: number;
}

export interface QuestionComponentProps {
    category: string;
    questionText: string;
    answers: AnswerOption[];
    selectedAnswer: string | null;
    onAnswerClick: (label: string) => void;
}

export interface NavigationComponentProps {
    currentQuestion: number;
    totalQuestions: number;
    onPrevious: () => void;
    onNext: () => void;
    onSubmit: () => void;
    onSelect: (questionNumber: number) => void;
}