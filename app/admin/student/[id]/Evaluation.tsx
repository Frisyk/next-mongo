'use client'
import { updateEvaluation } from '@/lib/admin/students';
import React, { useState } from 'react';
import EvaluationPopup from './EvaluationPopUp';

export default function EvaluationTable({ userId, Ievaluations }: { userId: string; Ievaluations: any }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState<any>(null);
  const evaluations = JSON.parse(Ievaluations)

  const openPopup = (evaluation: any = null) => {
    setSelectedEvaluation(evaluation);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedEvaluation(null); // Reset selected evaluation
  };

  const handleUpdateEvaluation = async (evaluationId: string, month: string, content: string) => {
    const result = await updateEvaluation(evaluationId, month, content);
    if (result.success) {
      // Update the evaluations array with the updated evaluation
      const updatedEvaluations = evaluations.map((evalItem: any) =>
        evalItem._id === evaluationId ? result.data : evalItem
      );
      // Optionally update the state or re-fetch the evaluations from the server
    } else {
      console.log('Failed to update evaluation');
    }
  };

  return (
    <div className="shadow-lg bg-slate-50 dark:bg-slate-900 rounded-lg p-2 w-full text-center md:w-4/5 mx-auto">
      <div className="flex justify-between items-center my-5">
        <h1 className="text-2xl font-bold text-left">Evaluasi Siswa</h1>
        <button onClick={() => openPopup()} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Evaluation
        </button>
      </div>

      <EvaluationPopup
        userId={userId}
        isOpen={isPopupOpen}
        onClose={closePopup}
        evaluationData={selectedEvaluation}
        onUpdateEvaluation={handleUpdateEvaluation}
      />

      <table className="min-w-full border text-sm border-slate-300">
        <thead>
          <tr>
            <th className="py-3 px-4 border">No</th>
            <th className="py-3 px-4 border">Evaluasi</th>
            <th className="py-3 px-4 border">Waktu</th>
            <th className="py-3 px-4 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {evaluations.map((item: any, index: number) => (
            <tr key={item._id} className="w-full">
              <td className="py-4 px-6 border border-gray-300 text-center">{index + 1}</td>
              <td className="py-4 px-6 border border-gray-300 font-semibold">{item.content}</td>
              <td className="py-4 px-6 border border-gray-300 text-center">{item.month}</td>
              <td className="py-4 px-6 border border-gray-300 text-center">
                <button
                  onClick={() => openPopup(item)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
