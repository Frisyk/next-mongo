'use client';

import React from 'react';
import Image from 'next/image';
import { FaStar, FaEdit, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { FiUser } from 'react-icons/fi';

// Tipe data (sesuaikan dengan data dari server action)
interface UserInfo {
  _id: string;
  username: string;
  uclass: string;
  img?: string;
}
interface EvaluationData {
  _id: string;
  user: UserInfo | null;
  ratingMateri: number;
  ratingMedia: number;
  ratingInteraktivitas: number;
  overallFeedback: string;
  createdAt: string;
  updatedAt: string;
}

interface MediaEvaluationCardProps {
  evaluation: EvaluationData;
  isOwner: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

// Helper untuk format tanggal
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric', 
    // hour: '2-digit', minute: '2-digit'
  });
};

export default function MediaEvaluationCard({ 
  evaluation, 
  isOwner,
  onEdit,
  onDelete
}: MediaEvaluationCardProps) {
  // Ambil field rating baru dan feedback
  const { user, ratingMateri, ratingMedia, ratingInteraktivitas, overallFeedback, createdAt, updatedAt } = evaluation;
  const isEdited = createdAt !== updatedAt;

  // Fungsi untuk mendapatkan inisial
  const getInitials = (name: string | undefined) => {
    if (!name) return '?';
    const names = name.split(' ');
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  // Fungsi untuk merender bintang untuk satu aspek
  const renderSingleRating = (label: string, rating: number) => (
    <div className="flex items-center justify-between text-sm mb-1">
      <span className="text-gray-600 dark:text-gray-400 w-1/2">{label}:</span>
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((index) => (
          <FaStar 
            key={index} 
            size={14} // Ukuran bintang lebih kecil untuk ringkasan
            className={`${index <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
          />
        ))}
        <span className="ml-1.5 font-medium text-gray-700 dark:text-gray-300">({rating})</span>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-slate-700"
    >
      <div className="flex items-start justify-between mb-4">
        {/* Info User */} 
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 dark:from-blue-600 dark:to-indigo-700 flex items-center justify-center text-white font-semibold text-lg">
            {user ? getInitials(user.username) : <FiUser />}
          </div>
          <div>
            <p className="font-semibold text-gray-800 dark:text-white">{user?.username || 'Anonim'}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Kelas {user?.uclass || '-'}</p>
          </div>
        </div>

        {/* Aksi Pemilik */} 
        {isOwner && (
          <div className="flex items-center space-x-2">
            <button onClick={onEdit} className="p-1 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition" title="Edit Evaluasi"><FaEdit size={16}/></button>
            <button onClick={onDelete} className="p-1 text-gray-500 hover:text-red-600 dark:hover:text-red-500 transition" title="Hapus Evaluasi"><FaTrash size={16}/></button>
          </div>
        )}
      </div>

      {/* Ringkasan Rating per Aspek */} 
      <div className="border-t border-b border-gray-200 dark:border-slate-700 my-4 py-3 space-y-2">
        <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Penilaian Aspek:</h4>
        {renderSingleRating("Materi", ratingMateri)}
        {renderSingleRating("Media", ratingMedia)}
        {renderSingleRating("Interaktivitas", ratingInteraktivitas)}
      </div>

      {/* Feedback Umum */} 
      <div>
        <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Masukan Umum:</h4>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">{overallFeedback}</p>
      </div>

      {/* Timestamp */} 
      <div className="text-xs text-gray-400 dark:text-gray-500 mt-5 pt-3 border-t border-gray-100 dark:border-slate-700">
        Dikirim pada {formatDate(createdAt)}
        {isEdited && ` (diedit ${formatDate(updatedAt)})`}
      </div>
    </motion.div>
  );
} 