'use client'

import React, { useEffect, useState } from 'react';
import { NavigationComponentProps, Question, QuestionComponentProps, ResultSummaryProps } from './interface';
import { ResultSummary } from './Summary';
import { QuestionComponent } from './QuestionComp';
import { NavigationComponent } from './Navigation';

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
  
    return (
        <h1>OKee</h1>
    );
};