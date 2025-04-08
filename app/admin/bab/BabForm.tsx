'use client'

import React, { useState, ChangeEvent, useRef } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { createBab, updateBab } from '@/lib/admin/babAdmin';
import Image from 'next/image';

type BabFormProps = {
  initialData?: {
    _id: string;
    nama: string;
    deskripsi: string;
    urutan: number;
    active: boolean;
    thumbnail?: string;
  } | null;
  onClose: () => void;
  onSuccess: () => void;
};

export default function BabForm({ initialData, onClose, onSuccess }: BabFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(initialData?.thumbnail || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(event.currentTarget);
    
    try {
      let response;
      if (initialData) {
        formData.append('id', initialData._id);
        response = await updateBab(formData);
      } else {
        response = await createBab(formData);
      }
      
      if (response.success) {
        toast.success(initialData ? 'Bab berhasil diperbarui' : 'Bab berhasil ditambahkan');
        onSuccess();
      } else {
        toast.error(response.error || 'Terjadi kesalahan');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat menyimpan data');
      console.error("Error saving bab:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFileName("");
      setThumbnailPreview(initialData?.thumbnail || null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">{initialData ? 'Edit' : 'Tambah'} Bab/Tema</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nama" className="block text-sm font-medium mb-1">Nama</label>
          <input
            type="text"
            id="nama"
            name="nama"
            defaultValue={initialData?.nama || ''}
            className="w-full p-2 border dark:bg-slate-700 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="urutan" className="block text-sm font-medium mb-1">Urutan</label>
          <input
            type="number"
            id="urutan"
            name="urutan"
            defaultValue={initialData?.urutan ?? 1000}
            className="w-full p-2 border dark:bg-slate-700 rounded-md"
            min="0"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="deskripsi" className="block text-sm font-medium mb-1">Deskripsi (Opsional)</label>
        <textarea
          id="deskripsi"
          name="deskripsi"
          defaultValue={initialData?.deskripsi || ''}
          className="w-full p-2 border dark:bg-slate-700 rounded-md"
          rows={3}
        />
      </div>
      
      <div>
        <label htmlFor="thumbnail" className="block text-sm font-medium mb-1">Thumbnail (Opsional)</label>
        {thumbnailPreview && (
          <div className="mb-2 w-32 h-32 relative overflow-hidden rounded">
            <Image 
              src={thumbnailPreview} 
              alt="Thumbnail Preview" 
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            id="thumbnail"
            name="thumbnail"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="w-full p-2 border dark:bg-slate-700 rounded-md flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400 truncate">
              {selectedFileName || (initialData?.thumbnail ? "Ganti thumbnail" : "Pilih file gambar...")}
            </span>
            <button 
              type="button" 
              className="bg-blue-500 text-white px-3 py-1 text-sm rounded"
              onClick={() => fileInputRef.current?.click()}
            >
              Browse
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {initialData ? "Kosongkan jika tidak ingin mengganti thumbnail." : "Direkomendasikan ukuran persegi."}
          </p>
        </div>
      </div>
      
      {initialData && (
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="active"
            defaultValue={initialData.active ? 'true' : 'false'}
            className="w-full p-2 border dark:bg-slate-700 rounded-md"
          >
            <option value="true">Aktif</option>
            <option value="false">Nonaktif</option>
          </select>
        </div>
      )}
      
      <div className="flex justify-end gap-3">
        <button 
          type="button" 
          onClick={onClose} 
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md"
          disabled={isLoading}
        >
          <FaTimes className="mr-1 inline"/> Batal
        </button>
        <button 
          type="submit" 
          className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center"
          disabled={isLoading}
        >
          <FaSave className="mr-1"/> {isLoading ? 'Menyimpan...' : (initialData ? 'Simpan Perubahan' : 'Tambah Bab')}
        </button>
      </div>
    </form>
  );
} 