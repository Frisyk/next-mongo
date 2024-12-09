// components/EvaluationTable.tsx
'use client';
import { updateEvaluation, addEvaluation, deleteEvaluation } from '@/lib/admin/students'; // Ensure the path is correct
import React, { useState } from 'react';
import EvaluationPopup from './EvaluationPopUp';

interface Evaluation {
  _id: string;
  month: string;
  content: string;
}

interface EvaluationTableProps {
  userId: string;
  Ievaluations: string; // JSON string of evaluations
}

const EvaluationTable: React.FC<EvaluationTableProps> = ({ userId, Ievaluations }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState<Evaluation | null>(null);
  const [evaluations, setEvaluations] = useState<Evaluation[]>(JSON.parse(Ievaluations));

  const openPopup = (evaluation: Evaluation | null = null) => {
    setSelectedEvaluation(evaluation);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedEvaluation(null);
  };

  const handleUpdateEvaluation = async (evaluationId: string, month: string, content: string) => {
    try {
      const result = await updateEvaluation(evaluationId, month, content);
  
      if (result.success) {
        // Update evaluasi di state (evaluations)
        const updatedEvaluations = evaluations.map((evalItem: any) =>
          evalItem._id === evaluationId ? result.data : evalItem
        );
        // Perbarui state evaluations
        setEvaluations(updatedEvaluations);
  
        return { success: true, data: result.data };
      } else {
        console.error('Failed to update evaluation');
        return { success: false };
      }
    } catch (error) {
      console.error('Error updating evaluation:', error);
      return { success: false };
    }
  };  

  const handleAddEvaluation = async (month: string, content: string) => {
    try {
      const result = await addEvaluation(userId, month, content);
  
      if (result.success) {
        // Tambahkan evaluasi baru ke state
        setEvaluations([...evaluations, result.data]);
  
        return { success: true, data: result.data };
      } else {
        console.error('Failed to add evaluation');
        return { success: false };
      }
    } catch (error) {
      console.error('Error adding evaluation:', error);
      return { success: false };
    }
  };
  
  const handleDeleteEvaluation = async (evaluationId: string) => {
    try {
      const result = await deleteEvaluation(evaluationId);
  
      if (result.success) {
        // Hapus evaluasi dari state
        const updatedEvaluations = evaluations.filter((evals) => evals._id !== evaluationId);
        setEvaluations(updatedEvaluations);
  
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error deleting evaluation:', error);
      alert('An error occurred while deleting evaluation.');
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
        onAddEvaluation={handleAddEvaluation}
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
          {evaluations.map((item, index) => (
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
                <button
                  onClick={() => handleDeleteEvaluation(item._id)}
                  className="text-red-600 ml-2 hover:text-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EvaluationTable;
