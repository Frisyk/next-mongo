import 'server-only';
import { cache } from 'react';
import { verifySession } from './stateless-session';
import { Materi, User, Game, Story, Score, Material, Quizi, Bab } from './models';
import connecttoDB from './db';

// Interface untuk Material
interface IMaterial {
  _id: string;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  tags: string[];
  viewCount: number;
  createdAt: string;
  isPublished: boolean;
}

// Interface untuk Quiz
interface IQuiz {
  _id: string;
  title: string;
  tag: string;
}

// Interface untuk Navigation
interface INavigation {
  prev: {
    title: string;
    slug: string;
  } | null;
  next: {
    title: string;
    slug: string;
  } | null;
  quiz: {
    id: string;
    title: string;
  } | null;
}

// Interface untuk Material dengan Navigation
interface IMaterialWithNavigation extends IMaterial {
  navigation: INavigation;
}

// Interface untuk Bab (digunakan di grouping)
interface IBab {
  _id: string;
  nama: string;
  deskripsi?: string;
  thumbnail?: string;
  urutan: number;
  active: boolean;
}

// Interface untuk grup materi
interface MaterialGroup {
  babInfo: IBab; // Ganti title dengan info Bab lengkap
  materials: IMaterial[]; // Gunakan IMaterial
  quiz: IQuiz | null; // Gunakan IQuiz
}

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;
  console.log(session);
  
  try {
    connecttoDB()
    const user = await User.findOne({
      _id: session.userId
    });
    return user;
  } catch (error) {
    console.log('Failed to fetch user');
    return error;
  }
});

export const getMateri = cache(async () => {
  try {
    connecttoDB()
    const materi = await Materi.find();          
    return materi;
  } catch (error) {
    console.log('Failed to fetch materi');
    return null;
  }
});

// Fungsi untuk mendapatkan materi modern yang dikelompokkan berdasarkan bab/tema
export const getMaterialsGroupedByTag = cache(async (): Promise<MaterialGroup[] | null> => {
  try {
    await connecttoDB();
    
    // Dapatkan semua Bab aktif yang sudah diurutkan
    const babs = await Bab.find({ active: true })
      .sort({ urutan: 1, nama: 1 })
      .lean() as IBab[];

    // Jika tidak ada Bab, kembalikan array kosong
    if (!babs || babs.length === 0) {
      return [];
    }

    // Dapatkan semua materi yang diterbitkan
    const materials = await Material.find({ isPublished: true })
      .sort({ createdAt: 1 })
      .lean() as IMaterial[];
    
    // Dapatkan semua kuis
    const quizzes = await Quizi.find()
      .sort({ tag: 1 })
      .lean() as IQuiz[];
    
    // Buat Map untuk kuis berdasarkan tag
    const quizMap = new Map<string, IQuiz>();
    quizzes.forEach(quiz => quizMap.set(quiz.tag, quiz));

    // Buat Map untuk materi berdasarkan tag
    const materialsByTag = new Map<string, IMaterial[]>();
    materials.forEach(material => {
      if (material.tags && material.tags.length > 0) {
        const primaryTag = material.tags[0];
        if (!materialsByTag.has(primaryTag)) {
          materialsByTag.set(primaryTag, []);
        }
        materialsByTag.get(primaryTag)?.push(material);
      }
    });

    // Buat hasil akhir berdasarkan urutan Bab
    const groupedResult: MaterialGroup[] = babs.map(bab => {
      const materialsForBab = materialsByTag.get(bab.nama) || [];
      const quizForBab = quizMap.get(bab.nama) || null;
      
      return {
        babInfo: bab,
        materials: materialsForBab,
        quiz: quizForBab
      };
    });
    
    return groupedResult;
  } catch (error) {
    console.error("Error fetching grouped materials:", error);
    return null;
  }
});

export const getDetailsM = cache(async (slug: string) => {

  try {
    connecttoDB()
    const materi = await Materi.findOne({slug});          
    return materi;
  } catch (error) {
    console.log('Failed to fetch materi');
    return null;
  }
});

// Mendapatkan detail dari Material (model baru) berdasarkan slug
export const getMaterialDetails = cache(async (slug: string): Promise<IMaterialWithNavigation | null> => {
  try {
    await connecttoDB();
    const material = await Material.findOne({slug}).lean() as IMaterial | null;
    
    if (!material) {
      return null;
    }
    
    // Tingkatkan jumlah view
    await Material.updateOne(
      { _id: material._id },
      { $inc: { viewCount: 1 } }
    );
    
    // Dapatkan semua materi dalam bab yang sama
    const materialsInSameBab = await Material.find({
      tags: material.tags[0], // Gunakan tag pertama sebagai bab
      isPublished: true
    })
    .sort({ createdAt: 1 })
    .lean() as IMaterial[];
    
    // Dapatkan indeks materi saat ini
    const currentIndex = materialsInSameBab.findIndex(m => m._id === material._id);
    
    // Dapatkan materi sebelumnya dan selanjutnya
    const prevMaterial = currentIndex > 0 ? materialsInSameBab[currentIndex - 1] : null;
    const nextMaterial = currentIndex < materialsInSameBab.length - 1 ? materialsInSameBab[currentIndex + 1] : null;
    
    // Dapatkan kuis untuk bab ini
    const quiz = await Quizi.findOne({ tag: material.tags[0] }).lean() as IQuiz | null;
    
    return {
      ...material,
      navigation: {
        prev: prevMaterial ? {
          title: prevMaterial.title,
          slug: prevMaterial.slug
        } : null,
        next: nextMaterial ? {
          title: nextMaterial.title,
          slug: nextMaterial.slug
        } : null,
        quiz: quiz ? {
          id: quiz._id,
          title: quiz.title
        } : null
      }
    };
  } catch (error) {
    console.log('Failed to fetch material details');
    return null;
  }
});

export const getStory = cache(async () => {
  
  try {
    connecttoDB()
    const articles = await Story.find();          
    return articles;
  } catch (error) {
    console.log('Failed to fetch materi');
    return null;
  }
});


export const getStoryDetails = cache(async (slug: string) => {
  try {
    connecttoDB()
    const materi = await Story.findOne({slug});          
    return materi;
  } catch (error) {
    console.log('Failed to fetch materi');
    return null;
  }
});


export const getGamesList = cache(async () => {

  try {
    connecttoDB()
    const game = await Game.find();          
    return game;
  } catch (error) {
    console.log('Failed to fetch game');
    return null;
  }
});

export const getUserScoresWithNames = async () => {
  try {
    const userScores = await Score.aggregate([
      {
        $set: {
          userId: { $toObjectId: "$userId" } // Ubah userId jadi ObjectId
        }
      },
      {
        $group: {
          _id: "$userId",
          totalScore: { $sum: "$score" },
          quizCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id", // Gunakan _id setelah $group
          foreignField: "_id",
          as: "userInfo"
        }
      },
      { $unwind: "$userInfo" }, // Pastikan userInfo tidak dalam array
      {
        $project: {
          _id: 0, // Sembunyikan _id jika tidak diperlukan
          totalScore: 1,
          quizCount: 1,
          class: "$userInfo.uclass",
          username: "$userInfo.username"
        }
      }
    ]);
    return userScores;
  } catch (error) {
    console.error("Error fetching user scores:", error);
  }
};

