'use server';

import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import type { SessionPayload } from '@/lib/definitions';
import connectToDB from './db';
import { Session } from './models';

const secretKey = process.env.SECRET;
const key = new TextEncoder().encode(secretKey);

export const encrypt = async (payload: SessionPayload) => {

    return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1hr')
      .sign(key);
  
};

export const decrypt = async (session: string | undefined = '') => {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.error('Failed to verify session:', error);
    return null;
  }
};

export const createSession = async (id: number) => {
    await connectToDB();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 1 week

    // Create a session in the database
    const session = await Session.create({ userId: id, expiresAt });

    // Encrypt the session ID
    // const token = await encrypt({ userId: id.toString, expiresAt });

    // Store the session in cookies for optimistic auth checks
    // cookies().set('session', token, {
    //   httpOnly: true,
    //   secure: true,
    //   expires: expiresAt,
    //   sameSite: 'lax',
    //   path: '/',
    // });

    return session;
  
};
