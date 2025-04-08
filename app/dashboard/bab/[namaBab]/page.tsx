import { getMaterialsGroupedByTag, getUser } from "@/lib/dal";
// import Header from "@/app/dashboard/(components)/Header"; // Header tidak lagi dirender di sini
import { Metadata } from "next";
import MaterialList from "./components/MaterialList";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa"; // Untuk tombol kembali

export async function generateMetadata({ params }: { params: { namaBab: string } }): Promise<Metadata> {
    const babName = decodeURIComponent(params.namaBab.replace(/-/g, ' '));
    return {
        title: `Materi Bab: ${babName}`
    };
}

// Komponen ini sekarang hanya merender konten detail
export default async function BabDetailPageContent({ params }: { params: { namaBab: string } }) {
    const groupedMaterials = await getMaterialsGroupedByTag();
    const user = await getUser(); // Ambil data user
    const babSlug = params.namaBab;
    const babName = decodeURIComponent(babSlug.replace(/-/g, ' '));

    const currentBabGroup = groupedMaterials?.find(
        group => group.babInfo.nama.toLowerCase().replace(/\s+/g, '-') === babSlug
    );

    if (!currentBabGroup) {
        // Seharusnya tidak terjadi jika link benar, tapi sebagai fallback
        return <div className="p-4 text-red-500">Bab tidak ditemukan.</div>;
    }

    return (
        <div className="p-4 h-full flex flex-col">
            {/* Tombol kembali (khusus mobile, karena desktop punya master view) */}
            <Link href="/dashboard" className="md:hidden mb-4 flex items-center text-blue-600 hover:underline">
                <FaArrowLeft className="mr-2"/> Kembali ke Daftar Bab
            </Link>
            
            <h1 className="text-2xl font-bold mb-1">{currentBabGroup.babInfo.nama}</h1>
            {currentBabGroup.babInfo.deskripsi && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">{currentBabGroup.babInfo.deskripsi}</p>
            )}

            {/* Daftar Materi & Kuis */}
            <div className="flex-grow overflow-y-auto">
                <MaterialList 
                    materials={JSON.stringify(currentBabGroup.materials)} 
                    quiz={currentBabGroup.quiz ? JSON.stringify(currentBabGroup.quiz) : null} 
                    babName={currentBabGroup.babInfo.nama}
                    completedMaterials={user?.completedMaterials || []}
                    completedQuizzes={user?.completedQuizzes || []}
                />
            </div>
        </div>
    );
}

/* Kode lama Page:
export default async function Page({ params }: { params: { namaBab: string } }) {
    // ... (logika ambil data sama) ...
    return (
        <main className="w-full min-h-screen" role="main">
            <Header link={'dashboard'} user={JSON.stringify(user)} />
            <div className="px-4 md:px-10 py-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{currentBabGroup.babInfo.nama}</h1>
                {currentBabGroup.babInfo.deskripsi && (
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{currentBabGroup.babInfo.deskripsi}</p>
                )}
                <MaterialList 
                    materials={JSON.stringify(currentBabGroup.materials)} 
                    quiz={currentBabGroup.quiz ? JSON.stringify(currentBabGroup.quiz) : null} 
                    babName={currentBabGroup.babInfo.nama}
                />
                <div className="mt-8">
                    <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        &larr; Kembali ke Daftar Bab
                    </Link>
                </div>
            </div>
        </main>
    );
}
*/ 