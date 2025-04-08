'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaPlus, FaSearch, FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import { MdFormatListBulleted, MdGridView } from 'react-icons/md';
import Image from 'next/image';
import { getMaterials, deleteMaterial } from '@/lib/admin/materialAdmin';

type Material = {
  _id: string;
  title: string;
  slug: string;
  thumbnail: string;
  content: string;
  tags: string[];
  viewCount: number;
  createdAt: string;
  isPublished: boolean;
};

export default function MaterialsAdmin() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fungsi untuk memuat data material
  useEffect(() => {
    async function loadMaterials() {
      try {
        setLoading(true);
        const response = await getMaterials();
        
        if (response.success) {
          // Konversi data dari database ke tipe Material
          const typedMaterials: Material[] = response.data?.map((mat: any) => ({
            _id: mat._id.toString(),
            title: mat.title || '',
            slug: mat.slug || '',
            thumbnail: mat.thumbnail || '',
            content: mat.content || '',
            tags: mat.tags || [],
            viewCount: mat.viewCount || 0,
            createdAt: mat.createdAt || new Date().toISOString(),
            isPublished: mat.isPublished || false
          })) || [];
          
          setMaterials(typedMaterials);
        } else {
          setError(response.error || 'Gagal memuat data material');
        }
      } catch (err) {
        setError('Terjadi kesalahan saat memuat data');
        console.error('Error loading materials:', err);
      } finally {
        setLoading(false);
      }
    }
    
    loadMaterials();
  }, []);
  
  // Filter materials berdasarkan pencarian
  const filteredMaterials = materials.filter(material => 
    material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (material.tags && material.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );
  
  // Fungsi untuk menghapus material
  const handleDeleteMaterial = async (id: string) => {
    try {
      setDeleteLoading(true);
      const response = await deleteMaterial(id);
      
      if (response.success) {
        // Hapus material dari state
        setMaterials(prev => prev.filter(material => material._id !== id));
        setConfirmDelete(null);
      } else {
        setError(response.error || 'Gagal menghapus material');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat menghapus material');
      console.error('Error deleting material:', err);
    } finally {
      setDeleteLoading(false);
    }
  };
  
  // Komponen untuk konfirmasi penghapusan
  const DeleteConfirmation = ({ id }: { id: string }) => (
    <div className="fixed w-full inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-slate-800 p-6 rounded-lg max-w-md w-full mx-4"
      >
        <h3 className="text-xl font-bold mb-4">Konfirmasi Penghapusan</h3>
        <p className="mb-6">Apakah Anda yakin ingin menghapus material ini? Tindakan ini tidak dapat dibatalkan.</p>
        <div className="flex justify-end gap-3">
          <button 
            onClick={() => setConfirmDelete(null)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md"
            disabled={deleteLoading}
          >
            Batal
          </button>
          <button 
            onClick={() => handleDeleteMaterial(id)}
            className="px-4 py-2 bg-red-600 text-white rounded-md flex items-center"
            disabled={deleteLoading}
          >
            {deleteLoading ? 'Menghapus...' : 'Hapus'}
          </button>
        </div>
      </motion.div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen w-full p-6 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg">Memuat data material...</p>
        </div>
      </div>
    );
  }

  if (error) {
  return (
      <div className="min-h-screen p-6 w-full">
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-6">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Muat Ulang
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 w-full">
        <div>
          <h1 className="text-2xl font-bold mb-2">Manajemen Material</h1>
          <p className="text-gray-500 dark:text-gray-400">Kelola semua material pembelajaran tentang batik</p>
        </div>
        <div className="flex gap-4">
          <Link href="/admin/bab" className="flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <FaPlus /> Kelola Bab
            </motion.button>
          </Link>
          <Link href="/admin/material/create" className="flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <FaPlus /> Tambah Material
            </motion.button>
          </Link>
        </div>
      </div>
      
      {/* Filter dan Search */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 mb-6 w-full">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari material..."
              className="pl-10 pr-4 py-2 border rounded-md w-full dark:bg-slate-700 dark:border-slate-600"
            />
          </div>
          <div className="flex items-center gap-4 self-end">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {filteredMaterials.length} material
            </span>
            <div className="flex border rounded-md overflow-hidden">
              <button
                onClick={() => setView('grid')}
                className={`p-2 ${view === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-slate-700'}`}
              >
                <MdGridView />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-slate-700'}`}
              >
                <MdFormatListBulleted />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Materials Grid/List */}
      {filteredMaterials.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 text-center w-full">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Tidak ada material yang ditemukan</p>
          <Link href="/admin/material/create">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
              Tambah Material Baru
            </button>
          </Link>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {filteredMaterials.map((material) => (
            <motion.div
              key={material._id}
              whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              className={`bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden ${!material.isPublished ? 'border-l-4 border-gray-400' : ''}`}
            >
              <div className="relative h-48">
                <Image
                  src={material.thumbnail || '/images/placeholder.jpg'}
                  alt={material.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
                {!material.isPublished && (
                  <div className="absolute top-2 right-2 bg-gray-500 text-white px-2 py-1 rounded text-xs">
                    Draft
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h3 className="text-white font-bold text-lg line-clamp-2">{material.title}</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="flex gap-1 mb-3 flex-wrap">
                  {material.tags && material.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(material.createdAt).toLocaleDateString('id-ID')}
                  </span>
                  <div className="flex items-center gap-2">
                    <Link href={`/dashboard/materi/${material.slug}`}>
                      <button className="p-2 text-blue-600 hover:text-blue-800">
                        <FaEye />
                      </button>
                    </Link>
                    <Link href={`/admin/material/edit?id=${material._id}`}>
                      <button className="p-2 text-green-600 hover:text-green-800">
                        <FaEdit />
                      </button>
                    </Link>
                    <button 
                      onClick={() => setConfirmDelete(material._id)}
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden w-full">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-slate-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Judul
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Bab/Tema
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Dilihat
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
                {filteredMaterials.map((material) => (
                  <tr key={material._id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <Image
                            src={material.thumbnail || '/images/placeholder.jpg'}
                            alt={material.title}
                            width={40}
                            height={40}
                            className="rounded-md object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {material.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {material.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {material.isPublished ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Published
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {material.tags && material.tags.length > 0 ? material.tags[0] : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {material.viewCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(material.createdAt).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center gap-2">
                        <Link href={`/dashboard/materi/${material.slug}`}>
                          <button className="p-2 text-blue-600 hover:text-blue-800">
                            <FaEye />
                          </button>
                        </Link>
                        <Link href={`/admin/material/edit?id=${material._id}`}>
                          <button className="p-2 text-green-600 hover:text-green-800">
                            <FaEdit />
                          </button>
                        </Link>
                        <button 
                          onClick={() => setConfirmDelete(material._id)}
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
      
      {/* Confirm Delete Modal */}
      {confirmDelete && <DeleteConfirmation id={confirmDelete} />}
    </div>
  );
}
