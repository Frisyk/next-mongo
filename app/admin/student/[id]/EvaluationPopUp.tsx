// components/EvaluationPopup.tsx
'use client';
import React, { useState, useEffect } from 'react';

interface EvaluationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  evaluationData?: any;
  onUpdateEvaluation: (evaluationId: string, month: string, content: string) => Promise<{ success: boolean; data?: any }>;
  onAddEvaluation: (month: string, content: string) => Promise<{ success: boolean; data?: any }>;
}

const EvaluationPopup: React.FC<EvaluationPopupProps> = ({
  isOpen,
  onClose,
  userId,
  evaluationData,
  onUpdateEvaluation,
  onAddEvaluation
}) => {
  const [month, setMonth] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (evaluationData) {
      setMonth(evaluationData.month);
      setContent(evaluationData.content);
    } else {
      setMonth('');
      setContent('');
    }
  }, [evaluationData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (evaluationData) {
      // Update existing evaluation
      const result = await onUpdateEvaluation(evaluationData._id, month, content);
      if (result.success) {
        alert('Evaluasi berhasil diupdate!');
      } else {
        alert('Gagal mengupdate evaluasi');
      }
    } else {
      // Add new evaluation
      const result = await onAddEvaluation(month, content);
      if (result.success) {
        alert('Evaluasi berhasil ditambahkan!');
      } else {
        alert('Gagal menambahkan evaluasi');
      }
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
          {evaluationData ? 'Update Evaluasi Siswa' : 'Tambah Evaluasi Siswa'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="month" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Bulan
            </label>
            <input
              type="month"
              id="month"
              name="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="mt-1 p-2 border border-slate-300 dark:text-slate-800 dark:border-slate-600 rounded-lg w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Evaluasi
            </label>
            <textarea
              id="content"
              name="content"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 p-2 border border-slate-300 dark:text-slate-800 dark:border-slate-600 rounded-lg w-full"
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-300 hover:bg-slate-400 text-white py-2 px-4 rounded-lg dark:bg-slate-700 dark:hover:bg-slate-600"
            >
              Tutup
            </button>
            <button
              type="submit"
              className="bg-slate-500 hover:bg-slate-700 text-white py-2 px-4 rounded-lg dark:bg-slate-600 dark:hover:bg-slate-500"
            >
              {evaluationData ? 'Update Evaluasi' : 'Kirim Evaluasi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EvaluationPopup;
