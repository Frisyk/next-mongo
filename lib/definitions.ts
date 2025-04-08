import { JWTPayload } from 'jose';
import { z } from 'zod';

// NextAuth types
import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    isAdmin: boolean;
    point: number;
    class: string;
  }

  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    isAdmin: boolean;
    point: number;
    class: string;
  }
}

export const SignupFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  uclass: z.string({ message: 'Please select your right class.' }).trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
});

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Password field must not be empty.' }),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

  export type ScoreState =
  | {
      errors?: {
        userId?: string[];
        test?: string[];
        score?: number[];
      };
      message?: string;
    }
  | undefined;

  export interface SessionPayload extends JWTPayload {
    userId: string;
    isAdmin: boolean;
    expiresAt: Date;
  }