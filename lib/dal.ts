import 'server-only';
import { cache } from 'react';
import { updateSession, verifySession } from '@/lib/stateless-session';
import { Post, User, Game } from './models';
import connecttoDB from './db';
import { ScoreState } from './definitions';

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

export const getDetailsM = cache(async (id: string) => {

  try {
    connecttoDB()
    const materi = await Post.findById(id);          
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