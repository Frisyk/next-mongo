'use client'
import { useState } from 'react';
import Modal from './Modals';

export const useConfirmEndTest = (handleSubmit: () => Promise<void>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const confirmEndTest = () => {
    setIsModalOpen(true);
  };

  const onConfirm = async () => {
    await handleSubmit();
    setIsModalOpen(false);
  };

  const onCancel = () => {
    setIsModalOpen(false);
  };

  return {
    confirmEndTest,
    modal: (
      <Modal isOpen={isModalOpen} onClose={onCancel}>
        <div className="text-center p-3">
          <h2 className="text-xl font-bold py-4">Apakah Anda yakin?</h2>
          <p className="text-sm text-gray-500">
            Apakah Anda yakin ingin mengakhiri ujian?
          </p>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={onCancel}
            className="bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium  text-gray-300 rounded-lg hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
          >
            Tunggu Dulu ...
          </button>
          <button
            onClick={onConfirm}
            className="bg-green-400 hover:bg-green-500 px-5 py-2 text-sm shadow-sm font-medium text-white rounded-lg transition ease-in duration-300"
          >
            Ya, Saya Yakin!
          </button>
        </div>
      </Modal>
    ),
  };
};
