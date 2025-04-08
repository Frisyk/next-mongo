'use server';

import connecttoDB from "../db";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from 'fs/promises';
import { createWriteStream } from 'fs'; // Import createWriteStream
import path from 'path';
import { Bab } from "../models"; // Import model dari models.ts
import { Buffer } from 'buffer'; // Import Buffer secara eksplisit
import { Readable } from 'stream'; // Import Readable

// Helper function untuk upload file menggunakan stream
async function uploadFile(file: File): Promise<string | null> {
  if (!file || file.size === 0) {
    return null;
  }

  const filename = `${Date.now()}-${file.name}`;
  const uploadDir = path.join(process.cwd(), 'public/uploads');
  const filePath = path.join(uploadDir, filename);

  try {
    await mkdir(uploadDir, { recursive: true });

    // Buat stream yang bisa dibaca dari file
    const readableStream = Readable.fromWeb(file.stream() as any); // 'as any' mungkin diperlukan tergantung versi Node/TS
    
    // Buat stream yang bisa ditulis ke file sistem
    const writableStream = createWriteStream(filePath);

    // Salurkan data dari readable ke writable
    await new Promise((resolve, reject) => {
      readableStream.pipe(writableStream);
      readableStream.on('end', resolve);
      readableStream.on('error', reject);
      writableStream.on('error', reject);
    });

    return `/uploads/${filename}`;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
}

// Mendapatkan semua Bab/Tema
export async function getAllBabs() {
  try {
    await connecttoDB();
    
    const babs = await Bab.find({})
      .sort({ urutan: 1, nama: 1 }) // Urutkan berdasarkan urutan, lalu nama
      .lean();
    
    return { success: true, data: babs };
  } catch (error) {
    console.error("Error fetching babs:", error);
    return { success: false, error: "Gagal mengambil data bab/tema" };
  }
}

// Mendapatkan Bab/Tema berdasarkan ID
export async function getBabById(id: string) {
  try {
    await connecttoDB();
    
    const bab = await Bab.findById(id).lean();
    
    if (!bab) {
      return { success: false, error: "Bab/tema tidak ditemukan" };
    }
    
    return { success: true, data: bab };
  } catch (error) {
    console.error("Error fetching bab by id:", error);
    return { success: false, error: "Gagal mengambil data bab/tema" };
  }
}

// Membuat Bab/Tema baru
export async function createBab(formData: FormData) {
  try {
    await connecttoDB();
    
    const nama = formData.get('nama') as string;
    const deskripsi = formData.get('deskripsi') as string;
    const urutanStr = formData.get('urutan') as string;
    const urutan = urutanStr ? parseInt(urutanStr) : 1000;
    const thumbnailFile = formData.get('thumbnail') as File;

    // Upload thumbnail jika ada
    let thumbnailPath: string | null = null;
    if (thumbnailFile) {
        thumbnailPath = await uploadFile(thumbnailFile);
        console.log(thumbnailPath);
        
        if (!thumbnailPath) {
          return { success: false, error: "Gagal mengupload thumbnail" };
        }
    }
    
    // Cek apakah nama sudah ada
    const existing = await Bab.findOne({ nama });
    if (existing) {
      return { success: false, error: "Bab/tema dengan nama tersebut sudah ada" };
    }
    
    // Buat bab baru
    const babData: any = {
      nama,
      deskripsi,
      urutan,
    };
    if (thumbnailPath) {
      babData.thumbnail = thumbnailPath;
    }
    
    const newBab = await Bab.create(babData);
    
    revalidatePath('/admin/bab');
    return { success: true, data: newBab };
  } catch (error) {
    console.error("Error creating bab:", error);
    return { success: false, error: "Gagal membuat bab/tema baru" };
  }
}

// Memperbarui Bab/Tema
export async function updateBab(formData: FormData) {
  try {
    await connecttoDB();
    
    const id = formData.get('id') as string;
    const nama = formData.get('nama') as string;
    const deskripsi = formData.get('deskripsi') as string;
    const urutanStr = formData.get('urutan') as string;
    const urutan = urutanStr ? parseInt(urutanStr) : 1000;
    const active = formData.get('active') === 'true';
    const thumbnailFile = formData.get('thumbnail') as File;

    // Cek apakah nama sudah ada (selain dirinya sendiri)
    const existing = await Bab.findOne({ nama, _id: { $ne: id } });
    if (existing) {
      return { success: false, error: "Bab/tema dengan nama tersebut sudah ada" };
    }
    
    // Persiapkan data update
    const updateData: any = {
        nama,
        deskripsi,
        urutan,
        active
    };

    // Upload thumbnail baru jika ada
    if (thumbnailFile && thumbnailFile.size > 0) {
        const thumbnailPath = await uploadFile(thumbnailFile);
        if (!thumbnailPath) {
          return { success: false, error: "Gagal mengupload thumbnail baru" };
        }
        updateData.thumbnail = thumbnailPath;
        // TODO: Hapus thumbnail lama jika perlu (opsional)
    }
    
    // Update bab
    const updatedBab = await Bab.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    
    if (!updatedBab) {
      return { success: false, error: "Bab/tema tidak ditemukan" };
    }
    
    revalidatePath('/admin/bab');
    return { success: true, data: updatedBab };
  } catch (error) {
    console.error("Error updating bab:", error);
    return { success: false, error: "Gagal memperbarui bab/tema" };
  }
}

// Menghapus Bab/Tema
export async function deleteBab(id: string) {
  try {
    await connecttoDB();
    
    // TODO: Hapus file thumbnail terkait (opsional)
    const deletedBab = await Bab.findByIdAndDelete(id);
    
    if (!deletedBab) {
      return { success: false, error: "Bab/tema tidak ditemukan" };
    }
    
    revalidatePath('/admin/bab');
    return { success: true, message: "Bab/tema berhasil dihapus" };
  } catch (error) {
    console.error("Error deleting bab:", error);
    return { success: false, error: "Gagal menghapus bab/tema" };
  }
} 