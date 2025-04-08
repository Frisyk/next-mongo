'use client';

import React from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import MaterialList from "./MaterialList"; // Pastikan MaterialList ada di folder yang sama

// Interface (salin dari page.tsx jika perlu, pastikan konsisten)
interface IBabInfo { nama: string; deskripsi?: string; }
interface IMaterial { _id: string; title: string; slug: string; thumbnail: string; tags: string[]; createdAt: string; isCompleted?: boolean;}
interface IQuiz { _id: string; title: string; tag: string; isCompleted?: boolean; }
interface IUserProgress { completedMaterials?: string[]; completedQuizzes?: string[]; }

interface BabDetailContentProps {
    babInfo: IBabInfo;
    materials: IMaterial[];
    quiz: IQuiz | null;
    userProgress: IUserProgress;
}

export default function BabDetailContent({
    babInfo,
    materials,
    quiz,
    userProgress
}: BabDetailContentProps) {

    if (!babInfo) {
        return null; // Tampilan default di handle parent
    }

    return (
        // Padding konten diatur di sini
        <div className="p-4 md:p-6 lg:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800 dark:text-white">{babInfo.nama}</h1>
            {babInfo.deskripsi && (
                <p className="text-base text-gray-600 dark:text-gray-400 mb-6 md:mb-8">{babInfo.deskripsi}</p>
            )}

            {/* MaterialList akan mengelola scroll internalnya jika perlu */}
            <MaterialList 
                materials={JSON.stringify(materials)} 
                quiz={quiz ? JSON.stringify(quiz) : null} 
                babName={babInfo.nama}
                completedMaterials={userProgress?.completedMaterials}
                completedQuizzes={userProgress?.completedQuizzes}
            />
        </div>
    );
} 