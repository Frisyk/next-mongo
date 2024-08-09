import 'server-only';
import { cache } from 'react';
import { verifySession } from '@/lib/stateless-session';
import { Post, User, Game } from './models';
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
  const session = await verifySession();
  if (!session) return alert('login dulu yaa!');

  try {
    connecttoDB()
    const materi = await Post.find();          
    return materi;
  } catch (error) {
    console.log('Failed to fetch materi');
    return null;
  }
});

export const getGamesList = cache(async () => {
  const session = await verifySession();
  if (!session) return alert('login dulu yaa!');

  try {
    connecttoDB()
    const materi = await Game.find();          
    return materi;
  } catch (error) {
    console.log('Failed to fetch materi');
    return null;
  }
});
