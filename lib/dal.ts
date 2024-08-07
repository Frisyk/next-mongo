import 'server-only';
import { cache } from 'react';
import { verifySession } from '@/lib/stateless-session';
import { User } from './models';

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const user = await User.findOne({
      _id: session.userId
    });    
    return user;
  } catch (error) {
    console.log('Failed to fetch user');
    return null;
  }
});
