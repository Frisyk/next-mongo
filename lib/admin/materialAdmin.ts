'use server';

import connecttoDB from "../db";
import { Material } from "../models";
import { redirect } from "next/navigation";
import fs from 'fs';
import path from 'path';
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir, unlink } from 'fs/promises';
import { Buffer } from 'buffer';

// Fungsi untuk mendapatkan semua material
export async function getMaterials() {
  try {
    await connecttoDB();
    
    const materials = await Material.find({})
      .sort({ createdAt: -1 }) // Urutkan dari yang terbaru
      .lean();
    
    return { success: true, data: materials };
  } catch (error) {
    console.error("Error fetching materials:", error);
    return { success: false, error: "Gagal mengambil data material" };
  }
}

// Fungsi untuk mendapatkan material berdasarkan slug
export async function getMaterialBySlug(slug: string) {
  try {
    await connecttoDB();
    
    const material = await Material.findOne({ slug }).lean();
    
    if (!material) {
      return { success: false, error: "Material tidak ditemukan" };
    }
    
    return { success: true, data: material };
  } catch (error) {
    console.error("Error fetching material by slug:", error);
    return { success: false, error: "Gagal mengambil data material" };
  }
}

// Fungsi baru: Mendapatkan Material berdasarkan ID
export async function getMaterialById(id: string) {
  try {
    await connecttoDB();
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return { success: false, error: "ID material tidak valid" };
    }
    const material = await Material.findById(id).lean();
    if (!material) {
      return { success: false, error: "Material tidak ditemukan" };
    }
    return { success: true, data: material };
  } catch (error) {
    console.error("Error fetching material by ID:", error);
    return { success: false, error: "Gagal mengambil data material" };
  }
}

// Fungsi untuk menambahkan material baru
export const addNewMaterial = async (state: any, formData: FormData) => {
  try {
    await connecttoDB();

    // Ambil data dari form
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const slug = formData.get('slug') as string;
    const quizId = formData.get('quizPath') as string;
    const tags = (formData.get('tags') as string || '').split(',').map(tag => tag.trim());
    const image = formData.get('imagePath') as File;

    // Validasi data
    if (!title || !content || !slug || !image) {
      return { success: false, error: "Semua field wajib diisi" };
    }

    // Directory untuk menyimpan gambar
    const publicDir = path.join(process.cwd(), 'public', 'images', 'materials');

    // Buat directory jika belum ada
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Generate nama file unik
    const fileName = `${Date.now()}-${image.name.replace(/\s+/g, '-')}`;
    const filePath = path.join(publicDir, fileName);

    // Simpan file 
    const fileBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(new Uint8Array(fileBuffer));
    fs.writeFileSync(filePath, buffer);

    // Path gambar relatif terhadap public directory
    const thumbnailPath = `/images/materials/${fileName}`;

    // Buat material baru
    const newMaterial = await Material.create({
      title,
      content,
      slug,
      quizId,
      thumbnail: thumbnailPath,
      tags,
      viewCount: 0,
      isPublished: true
    });

    if (!newMaterial) {
      return { success: false, error: "Gagal membuat material baru" };
    }

    return { 
      success: true, 
      message: "Material berhasil ditambahkan", 
      data: newMaterial 
    };
  } catch (error) {
    console.error("Error adding new material:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Terjadi kesalahan saat menambahkan material" 
    };
  } finally {
    redirect('/admin/material');
  }
};

// Fungsi untuk memperbarui material
export const updateMaterial = async (state: any, formData: FormData) => {
  try {
    await connecttoDB();

    // Ambil ID material
    const id = formData.get('id') as string;
    
    // Cek apakah material ada
    const existingMaterial = await Material.findById(id);
    
    if (!existingMaterial) {
      return { success: false, error: "Material tidak ditemukan" };
    }

    // Ambil data dari form
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const slug = formData.get('slug') as string;
    const quizId = formData.get('quizPath') as string;
    const tags = (formData.get('tags') as string || '').split(',').map(tag => tag.trim());
    const isPublished = formData.get('isPublished') === 'true';
    const image = formData.get('imagePath') as File;

    // Update objek untuk material
    const updateData: any = {
      title,
      content,
      slug,
      quizId,
      tags,
      isPublished
    };

    // Handle image jika ada
    if (image && image.name) {
      // Directory untuk menyimpan gambar
      const publicDir = path.join(process.cwd(), 'public', 'images', 'materials');

      // Buat directory jika belum ada
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }

      // Generate nama file unik
      const fileName = `${Date.now()}-${image.name.replace(/\s+/g, '-')}`;
      const filePath = path.join(publicDir, fileName);

      // Simpan file 
      const fileBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(new Uint8Array(fileBuffer));
      fs.writeFileSync(filePath, buffer);

      // Path gambar relatif terhadap public directory
      updateData.thumbnail = `/images/materials/${fileName}`;
    }

    // Update material
    const updatedMaterial = await Material.findByIdAndUpdate(
      id, 
      updateData,
      { new: true }
    );

    if (!updatedMaterial) {
      return { success: false, error: "Gagal memperbarui material" };
    }

    return { 
      success: true, 
      message: "Material berhasil diperbarui", 
      data: updatedMaterial 
    };
  } catch (error) {
    console.error("Error updating material:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Terjadi kesalahan saat memperbarui material" 
    };
  } finally {
    redirect('/admin/material');
  }
};

// Fungsi untuk menghapus material
export const deleteMaterial = async (id: string) => {
  try {
    await connecttoDB();
    
    const deletedMaterial = await Material.findByIdAndDelete(id);
    
    if (!deletedMaterial) {
      return { success: false, error: "Material tidak ditemukan" };
    }
    
    // Hapus file thumbnail jika ada
    if (deletedMaterial.thumbnail) {
      const imagePath = path.join(
        process.cwd(), 
        'public', 
        deletedMaterial.thumbnail.replace(/^\//, '')
      );
      
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    return { 
      success: true, 
      message: "Material berhasil dihapus" 
    };
  } catch (error) {
    console.error("Error deleting material:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Terjadi kesalahan saat menghapus material" 
    };
  }
}; 