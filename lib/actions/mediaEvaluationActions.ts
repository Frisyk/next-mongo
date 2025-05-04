'use server';

import connecttoDB from "../db";
import { MediaEvaluation } from "../models"; // Gunakan model MediaEvaluation
import { verifySession } from "../stateless-session";
import { revalidatePath } from "next/cache";
import mongoose, { Types } from "mongoose";

// Definisikan interface untuk hasil populate yang lebih spesifik
interface PopulatedUser {
  _id: mongoose.Types.ObjectId; // Tetap ObjectId dari DB
  username: string;
  uclass: string;
  img?: string;
}
interface RawEvaluation {
  _id: mongoose.Types.ObjectId;
  user: PopulatedUser | mongoose.Types.ObjectId; // Bisa populated object atau hanya ID
  ratingMateri: number;
  ratingMedia: number;
  ratingInteraktivitas: number;
  overallFeedback: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mendapatkan semua evaluasi media dengan data user
export async function getAllMediaEvaluations() {
  try {
    const session = await verifySession();
    if (!session) return { success: false, error: "Unauthorized" };

    await connecttoDB();
    const evaluations = await MediaEvaluation.find({})
      .populate<{ user: PopulatedUser }>('user', 'username uclass img') // Tetap populate
      .sort({ createdAt: -1 })
      .lean<RawEvaluation[]>(); // Lean dengan tipe RawEvaluation
      
    // Serialize data dengan aman
    const serializedEvaluations = evaluations.map((ev: any) => {
      // Cek apakah user adalah objek hasil populate atau hanya ID
      const userData = ev.user && typeof ev.user === 'object' && '_id' in ev.user ? {
        _id: ev.user._id.toString(),
        username: ev.user.username,
        uclass: ev.user.uclass,
        img: ev.user.img
      } : null;

      return {
        _id: ev._id.toString(),
        user: userData, // Hasil serialize user
        ratingMateri: ev.ratingMateri,
        ratingMedia: ev.ratingMedia,
        ratingInteraktivitas: ev.ratingInteraktivitas,
        overallFeedback: ev.overallFeedback,
        createdAt: ev.createdAt.toISOString(),
        updatedAt: ev.updatedAt.toISOString(),
      };
    });

    return { success: true, data: serializedEvaluations };
  } catch (error) {
    console.error("Error fetching media evaluations:", error);
    return { success: false, error: "Gagal mengambil data evaluasi media" };
  }
}

// Mendapatkan evaluasi media dari user yang sedang login
export async function getUserMediaEvaluation() {
  try {
    const session = await verifySession();
    if (!session) return { success: false, error: "Unauthorized" };

    await connecttoDB();
    // Lean dengan tipe RawEvaluation
    const evaluation = await MediaEvaluation.findOne({ user: session.userId })
                                             .lean<RawEvaluation>(); 

    if (!evaluation) {
      return { success: true, data: null };
    }
    
    // Serialize data
    const serializedEvaluation = {
        _id: evaluation._id.toString(),
        // user di sini hanya ID, bukan objek hasil populate
        user: evaluation.user.toString(), 
        ratingMateri: evaluation.ratingMateri,
        ratingMedia: evaluation.ratingMedia,
        ratingInteraktivitas: evaluation.ratingInteraktivitas,
        overallFeedback: evaluation.overallFeedback,
        createdAt: evaluation.createdAt.toISOString(),
        updatedAt: evaluation.updatedAt.toISOString(),
    }

    // Kembalikan tipe yang sesuai (UserEvaluationData)
    return { success: true, data: serializedEvaluation }; 
  } catch (error) {
    console.error("Error fetching user media evaluation:", error);
    return { success: false, error: "Gagal mengambil evaluasi media Anda" };
  }
}

// Membuat evaluasi media baru
export async function createMediaEvaluation(formData: FormData) {
  try {
    const session = await verifySession();
    if (!session) return { success: false, error: "Unauthorized" };

    // Ambil semua rating dan feedback DENGAN NAMA YANG BENAR
    const ratingMateri = parseInt(formData.get('ratingMateri') as string);
    const ratingMedia = parseInt(formData.get('ratingMedia') as string);
    const ratingInteraktivitas = parseInt(formData.get('ratingInteraktivitas') as string);
    const overallFeedback = formData.get('overallFeedback') as string;

    console.log('Received data:', { ratingMateri, ratingMedia, ratingInteraktivitas, overallFeedback }); // Logging untuk debug

    // Validasi semua field
    if (
      !Number.isInteger(ratingMateri) || ratingMateri < 1 || ratingMateri > 5 || 
      !Number.isInteger(ratingMedia) || ratingMedia < 1 || ratingMedia > 5 || 
      !Number.isInteger(ratingInteraktivitas) || ratingInteraktivitas < 1 || ratingInteraktivitas > 5 || 
      !overallFeedback
    ) {
      console.error('Validation failed:', { ratingMateri, ratingMedia, ratingInteraktivitas, overallFeedback });
      return { success: false, error: "Semua rating (1-5) dan feedback wajib diisi" };
    }

    await connecttoDB();
    console.log('Database connected');

    // Cek existing evaluation
    const existingEvaluation = await MediaEvaluation.findOne({ user: session.userId });
    if (existingEvaluation) {
      console.log('User already submitted evaluation');
      return { success: false, error: "Anda sudah pernah mengirim evaluasi untuk media ini" };
    }

    // Data yang akan disimpan, pastikan key sesuai dengan SKEMA TERBARU
    const evaluationData = {
      user: session.userId,
      ratingMateri: ratingMateri,
      ratingMedia: ratingMedia,
      ratingInteraktivitas: ratingInteraktivitas,
      overallFeedback: overallFeedback, // Key HARUS overallFeedback
    };

    console.log('Attempting to create with data:', evaluationData);

    // Buat evaluasi baru dengan field yang sesuai
    await MediaEvaluation.create(evaluationData);
    console.log('MediaEvaluation created successfully');

    revalidatePath('/dashboard/evaluation-media'); 
    return { success: true, message: "Evaluasi media berhasil dikirim!" };
  } catch (error) {
    // Log error lebih detail
    console.error("Error creating media evaluation:", error instanceof Error ? error.message : error);
    if (error instanceof mongoose.Error.ValidationError) {
        console.error("Validation Errors:", error.errors);
        return { success: false, error: "Data tidak valid: " + Object.values(error.errors).map(e => e.message).join(', ') };
    }
    return { success: false, error: "Gagal mengirim evaluasi media" };
  }
}

// Memperbarui evaluasi media
export async function updateMediaEvaluation(formData: FormData) {
  try {
    const session = await verifySession();
    if (!session) return { success: false, error: "Unauthorized" };

    const evaluationId = formData.get('evaluationId') as string;
    // Ambil semua rating dan feedback
    const ratingMateri = parseInt(formData.get('ratingMateri') as string);
    const ratingMedia = parseInt(formData.get('ratingMedia') as string);
    const ratingInteraktivitas = parseInt(formData.get('ratingInteraktivitas') as string);
    const overallFeedback = formData.get('overallFeedback') as string;

    // Validasi semua field
    if (!evaluationId || !ratingMateri || ratingMateri < 1 || ratingMateri > 5 || 
        !ratingMedia || ratingMedia < 1 || ratingMedia > 5 || 
        !ratingInteraktivitas || ratingInteraktivitas < 1 || ratingInteraktivitas > 5 || 
        !overallFeedback) {
      return { success: false, error: "ID, Semua rating (1-5), dan feedback wajib diisi" };
    }

    if (!mongoose.Types.ObjectId.isValid(evaluationId)) {
      return { success: false, error: "ID Evaluasi Media tidak valid" };
    }

    await connecttoDB();

    // Cari evaluasi dan pastikan milik user yg login
    const evaluation = await MediaEvaluation.findById(evaluationId);
    if (!evaluation) {
      return { success: false, error: "Evaluasi media tidak ditemukan" };
    }
    if (evaluation.user.toString() !== session.userId) {
      return { success: false, error: "Anda tidak berhak mengubah evaluasi media ini" };
    }

    // Update evaluasi media dengan field baru
    evaluation.ratingMateri = ratingMateri;
    evaluation.ratingMedia = ratingMedia;
    evaluation.ratingInteraktivitas = ratingInteraktivitas;
    evaluation.overallFeedback = overallFeedback;
    await evaluation.save();

    revalidatePath('/dashboard/evaluation-media');
    return { success: true, message: "Evaluasi media berhasil diperbarui!" };
  } catch (error) {
    console.error("Error updating media evaluation:", error);
    return { success: false, error: "Gagal memperbarui evaluasi media" };
  }
}

// Menghapus evaluasi media
export async function deleteMediaEvaluation(evaluationId: string) {
  try {
    const session = await verifySession();
    if (!session) return { success: false, error: "Unauthorized" };

    if (!evaluationId || !mongoose.Types.ObjectId.isValid(evaluationId)) {
      return { success: false, error: "ID Evaluasi Media tidak valid" };
    }

    await connecttoDB();

    // Cari evaluasi media dan pastikan milik user yg login
    const evaluation = await MediaEvaluation.findById(evaluationId);
    if (!evaluation) {
      return { success: false, error: "Evaluasi media tidak ditemukan" };
    }
    if (evaluation.user.toString() !== session.userId) {
      return { success: false, error: "Anda tidak berhak menghapus evaluasi media ini" };
    }

    // Hapus evaluasi media
    await MediaEvaluation.findByIdAndDelete(evaluationId);

    revalidatePath('/dashboard/evaluation-media'); // Sesuaikan path jika perlu
    return { success: true, message: "Evaluasi media berhasil dihapus!" };
  } catch (error) {
    console.error("Error deleting media evaluation:", error);
    return { success: false, error: "Gagal menghapus evaluasi media" };
  }
} 