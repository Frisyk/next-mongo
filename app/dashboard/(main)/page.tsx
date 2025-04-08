// Kembalikan menjadi Server Component
import { getMaterialsGroupedByTag, getUser } from '@/lib/dal';
import { Metadata } from 'next';
import BabList from '../(components)/BabList'; // Pastikan BabList ada
import { GetTime } from '../(components)/Header'; // Pastikan Header ada

// export const metadata: Metadata = {
//   title: 'Dashboard Belajar'
// };

export default async function Page() {
  // Ambil data langsung di Server Component
  const groupedMaterials = await getMaterialsGroupedByTag();
  const user = await getUser();

  return (
    <div className="grid gap-4 md:gap-8 md:mx-10 py-6 pb-20">
      <header className='flex flex-col md:flex-row items-stretch gap-4 mb-4'>
        <div className='flex-1 rounded-xl p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg dark:from-green-600 dark:to-green-700 flex flex-col justify-center'>
          <p className='text-lg opacity-90'>Selamat Datang Kembali,</p>
          <h1 className='text-3xl font-bold mt-1'>{user?.username || 'User'} 👋🏻</h1>
        </div>
        <GetTime /> 
      </header>
      
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Materi Pembelajaran</h2>

      {/* Tampilkan BabList */} 
      {groupedMaterials && groupedMaterials.length > 0 ? 
        <BabList groupedMaterials={JSON.stringify(groupedMaterials)} /> 
        : groupedMaterials && groupedMaterials.length === 0 ?
        <p className="text-center py-10 text-gray-500 dark:text-gray-400">Belum ada materi tersedia.</p>
        : <p className="text-center py-10 text-red-500">Gagal memuat materi.</p>
      }
    </div>
  );
}
