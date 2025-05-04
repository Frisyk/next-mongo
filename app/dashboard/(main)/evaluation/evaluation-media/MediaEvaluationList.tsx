'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MediaEvaluationCard from './MediaEvaluationCard';
import MediaEvaluationForm from './MediaEvaluationForm';
import { deleteMediaEvaluation } from '@/lib/actions/mediaEvaluationActions';

// Tipe data yang diterima dari page.tsx (hasil server action)
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
export interface UserEvaluationData {
  _id: string;
  user: string;
  ratingMateri: number;
  ratingMedia: number;
  ratingInteraktivitas: number;
  overallFeedback: string;
  createdAt: string;
  updatedAt: string;
}

interface MediaEvaluationListProps {
  initialEvaluations: EvaluationData[];
  initialUserEvaluation: UserEvaluationData | null;
  currentUserId: string | null;
}

export default function MediaEvaluationList({ 
  initialEvaluations, 
  initialUserEvaluation, 
  currentUserId 
}: MediaEvaluationListProps) {
  const [evaluations, setEvaluations] = useState(initialEvaluations);
  const [userEvaluation, setUserEvaluation] = useState<UserEvaluationData | null>(initialUserEvaluation);
  const [showForm, setShowForm] = useState(false);
  const [editingEvaluation, setEditingEvaluation] = useState<UserEvaluationData | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Handler saat tombol Tambah di klik
  const handleAddClick = () => {
    if (userEvaluation) {
      toast.info("Anda sudah mengirim evaluasi. Edit evaluasi Anda jika perlu.");
    } else {
      setEditingEvaluation(null); // Pastikan tidak ada data lama
      setShowForm(true);
    }
  };

  // Handler saat tombol Edit di klik
  const handleEditClick = () => {
    if (userEvaluation) {
      setEditingEvaluation(userEvaluation);
      setShowForm(true);
    } else {
      toast.error("Evaluasi tidak ditemukan untuk diedit.");
    }
  };

  // Menampilkan konfirmasi hapus
  const handleDeleteConfirm = (id: string) => {
    setConfirmDelete(id);
  };

  // Menghapus evaluasi
  const handleDelete = async () => {
    if (!confirmDelete) return;
    setIsDeleting(true);
    try {
      const result = await deleteMediaEvaluation(confirmDelete);
      if (result.success) {
        // Hapus dari state daftar evaluasi
        setEvaluations(prev => prev.filter(ev => ev._id !== confirmDelete));
        // Reset state evaluasi user jika yang dihapus adalah miliknya
        if (userEvaluation?._id === confirmDelete) {
          setUserEvaluation(null);
        }
        setConfirmDelete(null);
        toast.success("Evaluasi berhasil dihapus.");
      } else {
        toast.error(result.error || "Gagal menghapus evaluasi.");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus evaluasi.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Handler setelah form berhasil disubmit (Create atau Update)
  const handleFormSuccess = (newOrUpdatedEvaluation: UserEvaluationData) => {
    setUserEvaluation(newOrUpdatedEvaluation);
    setShowForm(false);
    setEditingEvaluation(null);
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      <ToastContainer position="top-center" theme="colored" autoClose={3000} />
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Evaluasi Aplikasi</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Bagikan pendapat Anda tentang aplikasi pembelajaran ini. Masukan Anda sangat berharga!
      </p>

      {/* Tombol Aksi */} 
      <div className="flex justify-start mb-6">
        {!userEvaluation ? (
          <button
            onClick={handleAddClick}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300 flex items-center gap-2"
          >
            <FaPlus /> Tambah Evaluasi Anda
          </button>
        ) : (
          <button
            onClick={handleEditClick}
            className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition duration-300 flex items-center gap-2"
          >
            <FaEdit /> Edit Evaluasi Anda
          </button>
        )}
      </div>

      {/* Modal Form */} 
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              onClick={(e) => e.stopPropagation()}
            >
              <MediaEvaluationForm 
                initialData={editingEvaluation}
                onClose={() => setShowForm(false)}
                onSuccess={handleFormSuccess}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Daftar Evaluasi */} 
      <div className="space-y-6">
        <AnimatePresence>
          {evaluations.length === 0 ? (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 dark:text-gray-400 py-10"
            >
              Belum ada evaluasi yang dikirim.
            </motion.p>
          ) : (
            evaluations.map((evaluation, index) => {
              // Tentukan apakah user saat ini adalah pemilik evaluasi ini
              const isCurrentUserOwner = currentUserId === evaluation.user?._id;
              return (
                <motion.div
                  key={evaluation._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <MediaEvaluationCard 
                    evaluation={evaluation}
                    isOwner={isCurrentUserOwner}
                    onDelete={() => handleDeleteConfirm(evaluation._id)}
                    onEdit={isCurrentUserOwner ? handleEditClick : () => {}}
                  />
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Modal Konfirmasi Delete */} 
      <AnimatePresence>
        {confirmDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[60] p-4 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-lg max-w-md w-full mx-4 shadow-xl"
            >
              <h3 className="text-xl font-bold mb-4">Konfirmasi Penghapusan</h3>
              <p className="mb-6 text-gray-600 dark:text-gray-300">Apakah Anda yakin ingin menghapus evaluasi ini?</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  disabled={isDeleting}
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md flex items-center justify-center hover:bg-red-700 transition min-w-[100px]"
                  disabled={isDeleting}
                >
                  {isDeleting ? <span className="animate-spin">⟳</span> : <FaTrash />}
                  <span className="ml-2">{isDeleting ? 'Menghapus' : 'Hapus'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
} 