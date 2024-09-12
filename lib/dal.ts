import 'server-only';
import { cache } from 'react';
import { verifySession } from './stateless-session';
import { Post, User, Game, Story } from './models';
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
    return null;
  }
});

export const getMateri = cache(async () => {

  try {
    connecttoDB()
    const materi = await Post.find();          
    return materi;
  } catch (error) {
    console.log('Failed to fetch materi');
    return null;
  }
});

export const getDetailsM = cache(async (slug: string) => {

  try {
    connecttoDB()
    const materi = await Post.findOne({slug});          
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
    const materi = await Game.find();          
    return materi;
  } catch (error) {
    console.log('Failed to fetch materi');
    return null;
  }
});