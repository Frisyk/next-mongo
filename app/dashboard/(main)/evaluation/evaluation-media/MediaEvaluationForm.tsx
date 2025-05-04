'use client';

import React, { useState, useEffect } from 'react';
import { FaStar, FaSave, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { createMediaEvaluation, updateMediaEvaluation } from '@/lib/actions/mediaEvaluationActions';
import { UserEvaluationData } from './MediaEvaluationList'; // Impor tipe data

// Komponen reusable untuk input rating bintang
const RatingInput = ({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) => {
  const [hoverValue, setHoverValue] = useState(0);
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div 
        className="flex items-center space-x-1" 
        onMouseLeave={() => setHoverValue(0)}
      >
        {[1, 2, 3, 4, 5].map((index) => (
          <FaStar
            key={index}
            size={24} // Sedikit lebih kecil untuk multiple rating
            className={`cursor-pointer transition-colors ${ 
              (hoverValue >= index || value >= index) 
              ? 'text-yellow-400' 
              : 'text-gray-300 dark:text-gray-600 hover:text-yellow-300'
            }`}
            onClick={() => onChange(index)}
            onMouseEnter={() => setHoverValue(index)}
          />
        ))}
        {value > 0 && <span className="ml-3 text-base font-semibold text-yellow-500">{value}/5</span>}
      </div>
    </div>
  );
};

interface MediaEvaluationFormProps {
  initialData?: UserEvaluationData | null;
  onClose: () => void;
  onSuccess: (data: UserEvaluationData) => void;
}

export default function MediaEvaluationForm({ initialData, onClose, onSuccess }: MediaEvaluationFormProps) {
  // State untuk setiap aspek rating
  const [ratingMateri, setRatingMateri] = useState(initialData?.ratingMateri || 0);
  const [ratingMedia, setRatingMedia] = useState(initialData?.ratingMedia || 0);
  const [ratingInteraktivitas, setRatingInteraktivitas] = useState(initialData?.ratingInteraktivitas || 0);
  const [overallFeedback, setOverallFeedback] = useState(initialData?.overallFeedback || '');
  const [isLoading, setIsLoading] = useState(false);

  // Update state jika initialData berubah (untuk mode edit)
  useEffect(() => {
    if (initialData) {
      setRatingMateri(initialData.ratingMateri);
      setRatingMedia(initialData.ratingMedia);
      setRatingInteraktivitas(initialData.ratingInteraktivitas);
      setOverallFeedback(initialData.overallFeedback);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validasi semua rating dan feedback
    if (ratingMateri === 0 || ratingMedia === 0 || ratingInteraktivitas === 0 || !overallFeedback) {
      toast.error("Semua rating aspek (1-5) dan feedback wajib diisi.");
      return;
    }
    setIsLoading(true);

    const formData = new FormData();
    // Append semua rating dan feedback
    formData.append('ratingMateri', ratingMateri.toString());
    formData.append('ratingMedia', ratingMedia.toString());
    formData.append('ratingInteraktivitas', ratingInteraktivitas.toString());
    formData.append('overallFeedback', overallFeedback);

    try {
      let result;
      if (initialData?._id) {
        formData.append('evaluationId', initialData._id);
        result = await updateMediaEvaluation(formData);
      } else {
        result = await createMediaEvaluation(formData);
      }

      if (result.success) {
        toast.success(result.message || (initialData ? "Evaluasi diperbarui!" : "Evaluasi dikirim!"));
        // Buat objek data baru untuk callback onSuccess
        const updatedData: UserEvaluationData = {
          _id: initialData?._id || 'newly_created', // Perlu ID asli
          user: initialData?.user || 'current_user', // Perlu ID user asli
          ratingMateri,
          ratingMedia,
          ratingInteraktivitas,
          overallFeedback,
          createdAt: initialData?.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        onSuccess(updatedData);
      } else {
        toast.error(result.error || "Terjadi kesalahan.");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat mengirim data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 md:p-8 w-full max-w-lg mx-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {initialData ? 'Edit Evaluasi Anda' : 'Beri Evaluasi'}
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <FaTimes size={20}/>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating Input untuk setiap aspek */} 
        <RatingInput label="Kualitas Materi Pembelajaran" value={ratingMateri} onChange={setRatingMateri} />
        <RatingInput label="Tampilan Media (Visual, Audio, dll.)" value={ratingMedia} onChange={setRatingMedia} />
        <RatingInput label="Interaktivitas dan Kemudahan Penggunaan" value={ratingInteraktivitas} onChange={setRatingInteraktivitas} />
        
        {/* Feedback Input */} 
        <div>
          <label htmlFor="overallFeedback" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Apa saran atau masukan umum Anda?
          </label>
          <textarea
            id="overallFeedback"
            name="overallFeedback"
            value={overallFeedback}
            onChange={(e) => setOverallFeedback(e.target.value)}
            rows={5}
            className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="Tuliskan pendapat Anda di sini..."
            required
          />
        </div>

        {/* Tombol Aksi */} 
        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            disabled={isLoading}
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition min-w-[150px]"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="animate-spin mr-2">⟳</span>
            ) : (
              <FaSave className="mr-1.5" />
            )}
            {isLoading ? 'Mengirim...' : (initialData ? 'Simpan Perubahan' : 'Kirim Evaluasi')}
          </button>
        </div>
      </form>
    </motion.div>
  );
} 