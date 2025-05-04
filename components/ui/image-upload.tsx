'use client';

import React, { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { FiUpload, FiX } from 'react-icons/fi';
import { uploadToSupabase, deleteFileFromSupabase } from '@/lib/supabase';
import { toast } from 'react-toastify';

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  onUploading?: (isUploading: boolean) => void;
  folder?: string;
  maxSizeMB?: number;
  className?: string;
  acceptTypes?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onUploading,
  folder = 'images',
  maxSizeMB = 5,
  className = 'h-40',
  acceptTypes = 'image/jpeg, image/png, image/webp'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const maxSizeBytes = maxSizeMB * 1024 * 1024; // Convert MB to bytes

  const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi ukuran file
    if (file.size > maxSizeBytes) {
      setError(`Ukuran file melebihi batas maksimum (${maxSizeMB}MB)`);
      toast.error(`Ukuran file melebihi batas maksimum (${maxSizeMB}MB)`);
      return;
    }

    // Reset error
    setError(null);
    setUploading(true);
    if (onUploading) onUploading(true);

    try {
      // Hapus file lama jika ada
      if (value) {
        await deleteFileFromSupabase(value);
      }

      // Upload file baru
      const result = await uploadToSupabase(file, folder);
      console.log(result);
      
      if (result.success && result.url) {
        onChange(result.url);
        toast.success('Gambar berhasil diunggah');
      } else {
        throw new Error(result.error || 'Gagal mengunggah gambar');
      }
    } catch (error: any) {
      console.error('Error uploading image:', error);
      setError(error.message || 'Gagal mengunggah gambar');
      toast.error(error.message || 'Gagal mengunggah gambar');
    } finally {
      setUploading(false);
      if (onUploading) onUploading(false);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [value, onChange, onUploading, maxSizeBytes, maxSizeMB, folder]);

  const handleRemove = useCallback(async () => {
    if (!value) return;
    
    setUploading(true);
    if (onUploading) onUploading(true);
    
    try {
      const deleted = await deleteFileFromSupabase(value);
      if (deleted) {
        onChange(null);
        toast.success('Gambar berhasil dihapus');
      } else {
        throw new Error('Gagal menghapus gambar');
      }
    } catch (error: any) {
      console.error('Error removing image:', error);
      toast.error(error.message || 'Gagal menghapus gambar');
    } finally {
      setUploading(false);
      if (onUploading) onUploading(false);
    }
  }, [value, onChange, onUploading]);

  return (
    <div className={`relative overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 ${className}`}>
      {value ? (
        <div className="relative w-full h-full group">
          <Image
            src={value}
            alt="Uploaded image"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              disabled={uploading}
            >
              <FiX size={18} />
            </button>
          </div>
        </div>
      ) : (
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center">
            <FiUpload className="w-8 h-8 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">
              {uploading ? 'Mengunggah...' : 'Klik untuk mengunggah gambar'}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Maksimal {maxSizeMB}MB
            </p>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>
          <input
            id="image-upload"
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={acceptTypes}
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
};

export default ImageUpload; 