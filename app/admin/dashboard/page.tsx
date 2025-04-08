import connectToDB from '@/lib/db';
import { User, Material, Quizi } from '@/lib/models';
import { requireAdmin } from '@/lib/auth';
import { Users, BookOpen, ClipboardList } from 'lucide-react';
import Link from 'next/link';

async function getData() {
  await connectToDB();
  
  try {
    // Mengambil jumlah total user, materi, dan kuis
    const userCount = await User.countDocuments();
    const materialCount = await Material.countDocuments();
    const quizCount = await Quizi.countDocuments();
    
    // Mengambil data untuk grafik (jumlah kuis per tag/bab)
    const quizPerTag = await Quizi.aggregate([
      { $group: { _id: "$tag", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Mengambil 5 user terakhir yang mendaftar
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('username email uclass createdAt');
    
    // Mengambil 5 materi terakhir yang dibuat
    const recentMaterials = await Material.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title slug tags createdAt');
    
    return {
      stats: {
        userCount,
        materialCount,
        quizCount
      },
      quizPerTag,
      recentUsers,
      recentMaterials
    };
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error);
    return {
      stats: {
        userCount: 0,
        materialCount: 0,
        quizCount: 0
      },
      quizPerTag: [],
      recentUsers: [],
      recentMaterials: []
    };
  }
}

export default async function AdminDashboard() {
  // Pastikan pengguna adalah admin
  await requireAdmin();
  const data = await getData();
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Admin</h1>
      
      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard 
          title="Total Pengguna" 
          value={data.stats.userCount} 
          icon={<Users className="h-8 w-8 text-blue-500" />}
          href="/admin/student"
        />
        <StatCard 
          title="Total Materi" 
          value={data.stats.materialCount} 
          icon={<BookOpen className="h-8 w-8 text-green-500" />}
          href="/admin/material"
        />
        <StatCard 
          title="Total Kuis" 
          value={data.stats.quizCount} 
          icon={<ClipboardList className="h-8 w-8 text-amber-500" />}
          href="/admin/quiz"
        />
      </div>
      
      {/* Grafik Distribusi Kuis per Bab */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Distribusi Kuis per Bab/Tema</h2>
        <div className="h-64 flex items-center">
          {data.quizPerTag.length > 0 ? (
            <div className="w-full flex items-end h-48 space-x-2">
              {data.quizPerTag.map((item) => (
                <div key={item._id} className="flex flex-col items-center">
                  <div 
                    className="bg-indigo-500 w-12 rounded-t-md"
                    style={{ height: `${(item.count / Math.max(...data.quizPerTag.map(i => i.count))) * 100}%` }}
                  ></div>
                  <span className="text-xs mt-2 text-center">{item._id}</span>
                  <span className="text-xs font-bold">{item.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center w-full">Belum ada data kuis</p>
          )}
        </div>
      </div>
      
      {/* Data Terbaru */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pengguna Terbaru */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Pengguna Terbaru</h2>
            <Link href="/admin/student" className="text-sm text-indigo-600 hover:underline">
              Lihat Semua
            </Link>
          </div>
          
          {data.recentUsers.length > 0 ? (
            <div className="space-y-4">
              {data.recentUsers.map((user) => (
                <div key={user._id} className="flex items-center border-b pb-2">
                  <div className="bg-indigo-100 rounded-full p-2 mr-3">
                    <Users className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium">{user.username}</p>
                    <p className="text-sm text-gray-500">{user.email} • {user.uclass}</p>
                  </div>
                  <p className="ml-auto text-xs text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString('id-ID')}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">Belum ada pengguna</p>
          )}
        </div>
        
        {/* Materi Terbaru */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Materi Terbaru</h2>
            <Link href="/admin/material" className="text-sm text-indigo-600 hover:underline">
              Lihat Semua
            </Link>
          </div>
          
          {data.recentMaterials.length > 0 ? (
            <div className="space-y-4">
              {data.recentMaterials.map((material) => (
                <div key={material._id} className="flex items-center border-b pb-2">
                  <div className="bg-green-100 rounded-full p-2 mr-3">
                    <BookOpen className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">{material.title}</p>
                    <p className="text-sm text-gray-500">
                      Bab: {material.tags?.join(', ') || 'Belum ada tag'}
                    </p>
                  </div>
                  <p className="ml-auto text-xs text-gray-500">
                    {new Date(material.createdAt).toLocaleDateString('id-ID')}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">Belum ada materi</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Komponen Kartu Statistik
interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  href: string;
}

function StatCard({ title, value, icon, href }: StatCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-center">
          <div className="mr-4">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
          </div>
        </div>
      </div>
    </Link>
  );
} 