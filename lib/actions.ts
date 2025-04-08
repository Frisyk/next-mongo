'use server'

import { getMaterialsGroupedByTag, getUser as getUserFromDal } from './dal';
import connecttoDB from './db';
import { User } from './models';
import { revalidatePath } from 'next/cache';
// import { Score } from './models'; // Import jika model Score ada

// Server Action untuk mengambil data dashboard utama
export async function getDashboardData() {
    try {
        const [babData, userData] = await Promise.all([
          getMaterialsGroupedByTag(),
          getUserFromDal()
        ]);
        
        // Pastikan data aman dikirim ke client (serialize jika perlu)
        const serializedUserData = userData ? JSON.parse(JSON.stringify(userData)) : null;
        const serializedBabData = babData ? JSON.parse(JSON.stringify(babData)) : null;

        return { success: true, data: { babData: serializedBabData, userData: serializedUserData } };
    } catch (error) {
        console.error("Error fetching dashboard data via action:", error);
        // Kirim pesan error yang lebih spesifik jika memungkinkan
        const errorMessage = error instanceof Error ? error.message : "Gagal memuat data dashboard";
        return { success: false, error: errorMessage };
    }
}

// Server action untuk menandai materi selesai 
export async function markMaterialAsCompleted(userId: string, materialIdOrSlug: string) {
    if (!userId || !materialIdOrSlug) {
        return { success: false, error: 'User ID dan Material ID diperlukan' };
    }
    try {
        await connecttoDB();
        const result = await User.updateOne(
            { _id: userId },
            { $addToSet: { completedMaterials: materialIdOrSlug } } 
        );
        
        if (result.matchedCount === 0) {
             return { success: false, error: 'User tidak ditemukan' };
        }
        if (result.modifiedCount === 1) {
             console.log(`Material ${materialIdOrSlug} ditandai selesai untuk user ${userId}`);
             revalidatePath('/dashboard', 'layout'); 
        } 
        // Tidak perlu return error jika sudah selesai sebelumnya
        return { success: true };
    } catch (error) {
        console.error("Error marking material complete:", error);
        return { success: false, error: 'Gagal menyimpan progress materi' };
    }
}

// Server action untuk submit kuis & menambah poin 
export async function submitQuizAndUpdateProgress(userId: string, quizId: string, score: number, pointsToAdd: number = 10) {
     if (!userId || !quizId) {
        return { success: false, error: 'User ID dan Quiz ID diperlukan' };
    }
     if (typeof score !== 'number') {
         return { success: false, error: 'Skor tidak valid' };
     }

    try {
        await connecttoDB();
        
        // 1. Simpan skor (Sesuaikan dengan model Score Anda)
        // await Score.create({ userId, quizId, score, submissionDate: new Date() });
        console.log(`Placeholder: Simpan skor ${score} untuk kuis ${quizId}, user ${userId}`);
        
        // 2. Update poin user dan tandai kuis selesai
        const result = await User.updateOne(
            { _id: userId },
            {
                $inc: { points: pointsToAdd },
                $addToSet: { completedQuizzes: quizId }
            }
        );

        if (result.matchedCount === 0) {
            return { success: false, error: 'User tidak ditemukan' };
        }

        if (result.modifiedCount === 1) {
             console.log(`Progress kuis ${quizId} diupdate, poin ${pointsToAdd} ditambahkan untuk user ${userId}`);
             revalidatePath('/dashboard', 'layout');
             revalidatePath('/dashboard/leaderboard');
        } 
        // Tidak perlu return error jika sudah selesai sebelumnya
        return { success: true, pointsAdded: pointsToAdd };

    } catch (error) {
        console.error("Error submitting quiz:", error);
        return { success: false, error: 'Gagal menyimpan skor/progress kuis' };
    }
} 