'use server';

import { revalidatePath } from 'next/cache';
import connecttoDB from './db';
import { Material } from './models';
import { deleteFileFromSupabase } from './supabase';

/**
 * Update URL gambar pada materi
 */
export async function updateMaterialImage(materialId: string, imageUrl: string | null) {
  try {
    await connecttoDB();
    
    // Cari materi yang akan diupdate
    const material = await Material.findById(materialId);
    if (!material) {
      return { success: false, error: 'Materi tidak ditemukan' };
    }
    
    // Ambil URL gambar lama untuk dihapus nanti
    const oldImageUrl = material.imageUrl || null;
    
    // Update URL gambar
    material.imageUrl = imageUrl;
    await material.save();
    
    // Hapus gambar lama dari Supabase jika ada
    if (oldImageUrl && oldImageUrl !== imageUrl) {
      await deleteFileFromSupabase(oldImageUrl);
    }
    
    revalidatePath('/dashboard');
    revalidatePath('/admin/material');
    
    return { success: true, imageUrl };
    
  } catch (error) {
    console.error('Error updating material image:', error);
    return { success: false, error: 'Gagal mengupdate gambar materi' };
  }
}

/**
 * Tambahkan gambar ke database sebagai media terpisah
 * Ini bisa digunakan untuk galeri atau bank gambar
 */
export async function saveMedia(imageUrl: string, caption: string = '', tags: string[] = []) {
  try {
    await connecttoDB();
    
    // Tambahkan ke koleksi Media jika dibutuhkan
    // const media = await Media.create({
    //   url: imageUrl,
    //   caption,
    //   tags,
    //   createdAt: new Date()
    // });
    
    // Untuk sementara kita hanya mengembalikan URL
    return { success: true, imageUrl };
    
  } catch (error) {
    console.error('Error saving media:', error);
    return { success: false, error: 'Gagal menyimpan media' };
  }
} 