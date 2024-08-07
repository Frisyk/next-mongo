import 'server-only';
import { cache } from 'react';
import { verifySession } from '@/lib/stateless-session';
import { User } from './models';
import connecttoDB from './db';

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    connecttoDB()
    const user = await User.findOne({
      _id: session.userId
    });      
    console.log(user?._point);
    
    return user;
  } catch (error) {
    console.log('Failed to fetch user');
    return null;
  }
});
