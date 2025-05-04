'use client';

import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

// Inisialisasi Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Validasi konfigurasi
if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL dan Anon Key harus diatur dalam variabel lingkungan');
}

// Buat client Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Upload file ke Supabase Storage
 * @param file File yang akan diunggah
 * @param folder Folder di bucket (default: 'images')
 * @returns Object berisi status, URL, dan error (jika ada)
 */
export const uploadToSupabase = async (
  file: File,
  folder: string = 'images'
): Promise<{ success: boolean; url?: string; error?: string }> => {
  try {
    // Validasi apakah file ada
    if (!file) {
      return { success: false, error: 'File tidak ditemukan' };
    }

    // Buat nama file yang unik dengan UUID
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    // Upload file ke Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('batik-assets')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    // Dapatkan URL publik dari file yang terupload
    const { data } = supabase.storage
      .from('batik-assets')
      .getPublicUrl(filePath);

    return {
      success: true,
      url: data.publicUrl,
    };
  } catch (error: any) {
    console.error('Error uploading to Supabase:', error);
    return {
      success: false,
      error: error.message || 'Gagal mengunggah file ke Supabase',
    };
  }
};

/**
 * Hapus file dari Supabase Storage
 * @param url URL publik dari file yang akan dihapus
 * @returns Boolean yang menunjukkan keberhasilan
 */
export const deleteFileFromSupabase = async (
  url: string
): Promise<boolean> => {
  try {
    // Ekstrak path file dari URL publik
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const bucketName = pathParts[1]; // Biasanya 'batik-assets'
    const filePath = pathParts.slice(2).join('/');

    if (!bucketName || !filePath) {
      throw new Error('URL file tidak valid');
    }

    // Hapus file dari Supabase Storage
    const { error } = await supabase.storage
      .from(bucketName)
      .remove([filePath]);

    if (error) {
      throw new Error(error.message);
    }

    return true;
  } catch (error: any) {
    console.error('Error deleting file from Supabase:', error);
    return false;
  }
};

export default supabase; 