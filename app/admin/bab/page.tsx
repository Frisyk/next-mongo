'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaPlus, FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaCheck, FaTimes } from 'react-icons/fa';
import { deleteBab, getAllBabs } from '@/lib/admin/babAdmin';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BabForm from './BabForm';
import Image from 'next/image';

type Bab = {
  _id: string;
  nama: string;
  deskripsi: string;
  urutan: number;
  active: boolean;
  thumbnail?: string;
  createdAt: string;
};

export default function BabPage() {
  const [babs, setBabs] = useState<Bab[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingBab, setEditingBab] = useState<Bab | null>(null);

  // Load data babs
  useEffect(() => {
    loadBabs();
  }, []);

  async function loadBabs() {
    try {
      setIsLoading(true);
      const response = await getAllBabs();
      if (response.success && response.data) {
        setBabs(response.data as Bab[]);
      } else if (response.success && !response.data) {
        setBabs([]);
      } else {
        toast.error(response.error || 'Gagal memuat data');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat memuat data');
    } finally {
      setIsLoading(false);
    }
  }

  // Handle hapus bab
  const handleDelete = async (id: string) => {
    try {
      const response = await deleteBab(id);
      if (response.success) {
        setBabs(prevBabs => prevBabs.filter(bab => bab._id !== id));
        toast.success('Bab berhasil dihapus');
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat menghapus data');
    } finally {
      setConfirmDelete(null);
    }
  };

  // Edit bab
  const handleEdit = (bab: Bab) => {
    setEditingBab(bab);
    setShowForm(true);
  };

  // Format tanggal
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Modal konfirmasi delete
  const DeleteConfirmation = ({ id }: { id: string }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-slate-800 p-6 rounded-lg max-w-md w-full mx-4"
      >
        <h3 className="text-xl font-bold mb-4">Konfirmasi Penghapusan</h3>
        <p className="mb-6">Apakah Anda yakin ingin menghapus bab/tema ini? Tindakan ini tidak dapat dibatalkan.</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setConfirmDelete(null)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md"
          >
            Batal
          </button>
          <button
            onClick={() => handleDelete(id)}
            className="px-4 py-2 bg-red-600 text-white rounded-md flex items-center"
          >
            Hapus
          </button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen p-6 w-full">
      <ToastContainer position="top-center" theme="colored" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 w-full">
        <div>
          <h1 className="text-2xl font-bold mb-2">Manajemen Bab/Tema</h1>
          <p className="text-gray-500 dark:text-gray-400">Kelola semua bab/tema untuk materi pembelajaran</p>
        </div>
        <button
          onClick={() => {
            setEditingBab(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus /> Tambah Bab/Tema
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-6 bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 w-full">
          <BabForm
            initialData={editingBab}
            onClose={() => {
              setShowForm(false);
              setEditingBab(null);
            }}
            onSuccess={() => {
              setShowForm(false);
              setEditingBab(null);
              loadBabs();
            }}
          />
        </div>
      )}

      {/* Daftar Babs */}
      {isLoading ? (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md w-full">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      ) : babs.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md text-center w-full">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Belum ada bab/tema yang dibuat</p>
          <button
            onClick={() => {
              setEditingBab(null);
              setShowForm(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 mx-auto"
          >
            <FaPlus /> Tambah Bab/Tema Pertama
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden w-full">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-slate-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Urutan
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Thumbnail
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Nama
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Deskripsi
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Tanggal Dibuat
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
                {babs.map((bab) => (
                  <tr key={bab._id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {bab.urutan}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex-shrink-0 h-10 w-10">
                        <Image 
                          src={bab.thumbnail || '/images/placeholder.jpg'} 
                          alt={`Thumbnail ${bab.nama}`}
                          width={40}
                          height={40}
                          className="rounded object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {bab.nama}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
                        {bab.deskripsi || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {bab.active ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 flex items-center w-fit">
                          <FaCheck className="mr-1" /> Aktif
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 flex items-center w-fit">
                          <FaTimes className="mr-1" /> Nonaktif
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(bab.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center gap-2">
                        <button
                          onClick={() => handleEdit(bab)}
                          className="p-2 text-green-600 hover:text-green-800"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => setConfirmDelete(bab._id)}
                          className="p-2 text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Link kembali */}
      <div className="mt-6">
        <Link href="/admin/material" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          &larr; Kembali ke manajemen materi
        </Link>
      </div>

      {/* Confirm Delete Modal */}
      {confirmDelete && <DeleteConfirmation id={confirmDelete} />}
    </div>
  );
} 