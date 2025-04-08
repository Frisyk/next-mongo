"use client"

import { marked } from 'marked';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaTag, FaEye, FaCalendar, FaArrowLeft, FaArrowRight, FaQuestionCircle } from 'react-icons/fa';

type MaterialDetailProps = {
    material: string;
};

export default function MaterialDetail({ material }: MaterialDetailProps) {
    const [isClient, setIsClient] = useState(false);
    const data = JSON.parse(material);
    
    useEffect(() => {
        setIsClient(true);
    }, []);
    
    if (!isClient) {
        return <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-96 rounded-lg mx-4 md:mx-20"></div>;
    }
    
    const renderHTML = (content: string) => {
        return { __html: marked(content) };
    };
    
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric', 
            month: 'long', 
            year: 'numeric'
        });
    };
    
    return (
        <div className="px-4 md:px-20 pb-20">
            {/* Thumbnails dan metadata */}
            <div className="mb-8 overflow-hidden rounded-lg shadow-md">
                <div className="relative h-64 md:h-96 w-full">
                    <Image 
                        src={data.thumbnail || '/images/placeholder.jpg'} 
                        alt={data.title}
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                </div>
                
                {/* Metadata */}
                <div className="bg-white dark:bg-slate-800 p-4 flex flex-wrap justify-between items-center">
                    <div className="flex items-center space-x-4 mb-2 md:mb-0">
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <FaCalendar className="mr-2" />
                            <span>{formatDate(data.createdAt)}</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <FaEye className="mr-2" />
                            <span>{data.viewCount || 0} kali dilihat</span>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                        {data.tags && data.tags.map((tag: string, index: number) => (
                            <span 
                                key={index} 
                                className="flex items-center bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full text-sm"
                            >
                                <FaTag className="mr-1 h-3 w-3" />
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Konten */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 md:p-8 mb-8">
                <article 
                    className="prose prose-sm md:prose-base lg:prose-lg max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={renderHTML(data.content)} 
                />
            </div>
            
            {/* Navigasi */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Tombol Sebelumnya */}
                    {data.navigation?.prev && (
                        <Link 
                            href={`/dashboard/materi/${data.navigation.prev.slug}`}
                            className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            <FaArrowLeft className="mr-2" />
                            <div className="text-right">
                                <div className="text-sm text-gray-500 dark:text-gray-400">Sebelumnya</div>
                                <div className="font-medium">{data.navigation.prev.title}</div>
                            </div>
                        </Link>
                    )}
                    
                    {/* Tombol Selanjutnya atau Kuis */}
                    {data.navigation?.next ? (
                        <Link 
                            href={`/dashboard/materi/${data.navigation.next.slug}`}
                            className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            <div className="text-left">
                                <div className="text-sm text-gray-500 dark:text-gray-400">Selanjutnya</div>
                                <div className="font-medium">{data.navigation.next.title}</div>
                            </div>
                            <FaArrowRight className="ml-2" />
                        </Link>
                    ) : data.navigation?.quiz ? (
                        <Link 
                            href={`/dashboard/kuis/${data.navigation.quiz.id}`}
                            className="flex items-center bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg transition-colors"
                        >
                            <div className="text-left">
                                <div className="text-sm text-amber-100">Selanjutnya</div>
                                <div className="font-medium flex items-center">
                                    <FaQuestionCircle className="mr-2" />
                                    {data.navigation.quiz.title}
                                </div>
                            </div>
                            <FaArrowRight className="ml-2" />
                        </Link>
                    ) : null}
                </div>
            </div>
        </div>
    );
} 