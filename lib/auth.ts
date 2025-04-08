'use server';

import connecttoDB from "./db"
import { User } from "./models"
import { FormState, LoginFormSchema, SignupFormSchema } from '@/lib/definitions';
import { createSession, deleteSession } from '@/lib/stateless-session';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getAuthSession, requireAuthVerify } from '@/lib/stateless-next-auth';

export const signup = async (state: FormState, formData: FormData): Promise<FormState> => {
        connecttoDB();

        const validatedFields = SignupFormSchema.safeParse({
            username: formData.get('name'),
            uclass: formData.get('class'),
            email: formData.get('email'),
            password: formData.get('password'),
        });

        if (!validatedFields.success) {
            return { errors: validatedFields.error.flatten().fieldErrors };
        }

        const { username, uclass, email, password } = validatedFields.data;

        // 2. Check if the user's email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return { message: 'Email already exists, please use a different email or login.' };
        }

        // 3. Hash the user's password
        const hashedPassword = await bcrypt.hash(password, 10);
        

        // 4. Insert the user into the database
        
        const user = await User.create({ username, uclass, email, point: 0, password: hashedPassword });
        if (!user) {
            return { message: 'An error occurred while creating your account.' };
        }

        // 5. Create a session for the user
        await createSession(user._id.toString(), user.isAdmin);
        return { message: 'Account created successfully.' };
    
}

export const login = async (state: FormState, formData: FormData): Promise<FormState> => {
        connecttoDB();

        // 1. Validate form fields
        const validatedFields = LoginFormSchema.safeParse({
            email: formData.get('email'),
            password: formData.get('password'),
        });
        const errorMessage = { message: 'Invalid login credentials.' };

        if (!validatedFields.success) {
            return { errors: validatedFields.error.flatten().fieldErrors };
        }

        // 2. Query the database for the user with the given email
        const user = await User.findOne({ email: validatedFields.data.email });

        if (!user) {
            return errorMessage;
        }

        // 3. Compare the user's password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(validatedFields.data.password, user.password);

        if (!passwordMatch) {
            return errorMessage;
        }

        // 4. If login successful, create a session for the user
        await createSession(user._id.toString(), user.isAdmin);
        return { message: 'Login successful.' };
    
}

export const logout = async () => {
        await deleteSession();
        return { message: 'Logout successful.' };
}

// Fungsi untuk memeriksa sesi pengguna dari server side 
// dengan dukungan untuk NextAuth dan stateless session
export async function getSessionUser() {
  try {
    // Coba dapatkan session dari NextAuth dan stateless
    const { isAuth, userId, isAdmin } = await getAuthSession();
    
    if (!isAuth || !userId) {
      console.log("[Auth] No valid session found");
      return null;
    }
    
    // Jika autentikasi berhasil, ambil data user dari database
    await connecttoDB();
    const user = await User.findById(userId);
    
    if (!user) {
      console.log("[Auth] User not found in database despite valid session");
      return null;
    }
    
    console.log("[Auth] User session verified:", {
      id: user._id.toString(),
      username: user.username,
      isAdmin: user.isAdmin || false
    });
    
    return {
      id: user._id.toString(),
      name: user.username,
      email: user.email,
      image: user.img,
      isAdmin: user.isAdmin || false,
      point: user.point || 0,
      class: user.uclass || ""
    };
  } catch (error) {
    console.error("[Auth] Error getting session user:", error);
    return null;
  }
}

// Fungsi untuk memastikan pengguna terautentikasi
export async function requireAuth() {
  try {
    // Gunakan fungsi baru dari stateless-next-auth.ts
    const { userId, isAdmin } = await requireAuthVerify();
    
    // Jika user ID valid, ambil data lengkap user dari DB
    await connecttoDB();
    const user = await User.findById(userId);
    
    if (!user) {
      console.log("[Auth] User not found in database despite valid session");
      redirect('/login');
    }
    
    return {
      id: user._id.toString(),
      name: user.username,
      email: user.email,
      image: user.img,
      isAdmin: user.isAdmin || false,
      point: user.point || 0,
      class: user.uclass || ""
    };
  } catch (error) {
    console.error("[Auth] Error in requireAuth:", error);
    redirect('/login');
  }
}

// Fungsi untuk memastikan pengguna adalah admin
export async function requireAdmin() {
  const user = await requireAuth();
  
  if (!user.isAdmin) {
    console.log("[Auth] Non-admin user attempted to access admin area");
    redirect('/dashboard');
  }
  
  return user;
}

// Fungsi logout yang menghapus semua cookie sesi
export async function logoutAll() {
  console.log("[Auth] Logging out user and clearing all session cookies");
  
  // Hapus semua cookie terkait sesi
  cookies().delete('session');
  cookies().delete('next-auth.session-token');
  cookies().delete('next-auth.csrf-token');
  cookies().delete('next-auth.callback-url');
  
  console.log("[Auth] All session cookies cleared");
  redirect('/login');
}

  
