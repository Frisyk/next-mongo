import 'server-only';
import { cache } from 'react';
import { verifySession } from './stateless-session';
import { Materi, User, Game, Story, Score } from './models';
import connecttoDB from './db';

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

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
          username: "$userInfo.username"
        }
      }
    ]);
    return userScores;
  } catch (error) {
    console.error("Error fetching user scores:", error);
  }
};

