'use server';

import { Quizi } from "@/app/dashboard/(materi)/[belajar]/components/interface";
import connecttoDB from "./db"
import { Post, Quiz, Score, User } from "./models"
import { FormState, LoginFormSchema, ScoreState, SignupFormSchema } from '@/lib/definitions';
import { createSession, deleteSession } from '@/lib/stateless-session';
import bcrypt from 'bcrypt';
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const signup = async (state: FormState, formData: FormData): Promise<FormState> => {
        connecttoDB();

        // 1. Validate form fields
        const validatedFields = SignupFormSchema.safeParse({
            username: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
        });

        if (!validatedFields.success) {
            return { errors: validatedFields.error.flatten().fieldErrors };
        }

        const { username, email, password } = validatedFields.data;

        // 2. Check if the user's email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return { message: 'Email already exists, please use a different email or login.' };
        }

        // 3. Hash the user's password
        const hashedPassword = await bcrypt.hash(password, 10);
        

        // 4. Insert the user into the database
        const user = await User.create({ username, email, point: 0, password: hashedPassword });
        if (!user) {
            return { message: 'An error occurred while creating your account.' };
        }

        // 5. Create a session for the user
        await createSession(user._id.toString());
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
        await createSession(user._id.toString());
        return { message: 'Login successful.' };
    
}

export const logout = async () => {
        await deleteSession();
        return { message: 'Logout successful.' };
}

export const putUserScore = async (userId: string, quiztitle: string, score: number) => {
    try {
        await connecttoDB();
        // 3. Update the user's score for the specified test
        const result = await Score.create({userId, quiztitle, score})


        if (!result) {
            throw new Error(`User with ID ${userId} not found`);
        }

        console.log(result);
        
        return { message: 'Score added successfully.' };
    } catch (error) {
        // 5. Handle errors
        console.error('Error updating user score:', error);
        return { message: 'Failed to update score.', error };
    }
};

export const seedQuiz = async (quiz : Quizi) => {
    try {
        // Create a new quiz document
        connecttoDB()
        const quizzes = new Quiz(quiz)

        // Save the quiz document to the database
        await quizzes.save();
        console.log('Quiz saved successfully!');
    } catch (error) {
        console.error('Error saving quiz:', error);
    }
};

export const getQuiz = async (quizId: string) => {
    try {
        // Create a new quiz document
        connecttoDB()
        const quiz = await Quiz.findById(quizId)

        return quiz
    } catch (error) {
        console.error('Error getting quiz:', error);
    }
};

// material CRUD

export const addMaterial = async (state: any, formData: FormData) => {
    try {
      // Connect to the database
      await connecttoDB();     
        const title = formData.get('title')
        const short=formData.get('shortStory')
        const desc=formData.get('article')
        const summary=formData.get('summary')
        const img=formData.get('imagePath')
        const quizId=formData.get('quizPath')
        const slug=formData.get('slug')      
      
      // Create a new material in the database
      const newMaterial = await Post.create({title, short, desc, summary, img, quizId, slug});
      // If creation failed, return an error message
      if (!newMaterial) {
        return { message: 'An error occurred while adding the material.' };
      }      // Return the created material
      return {message: 'Add material succesfully'};
  
    } catch (error) {
      console.error('Failed to add material:', error);
      return null;
    } finally {
        redirect('/admin/material')
    }
  };

export const deleteMaterial = async(id:string)=> {
    try {
        await connecttoDB()
        await Post.findByIdAndDelete(id);
        revalidatePath('/admin/material')

    } catch (error) {
        console.error('Failed to remove material:', error);
    }
}

export const putMaterial = async (
    state: any,
    formData: FormData
  ) => {
    console.log(formData);
    
    try {
      // Connect to the database
      await connecttoDB();     
        const id = formData.get('id')
        const title = formData.get('title')
        const short=formData.get('shortStory')
        const desc=formData.get('article')
        const summary=formData.get('summary')
        const img=formData.get('imagePath')
        const quizId=formData.get('quizPath')
        const slug=formData.get('slug')      
      
      // Create a new material in the database
      const newMaterial = await Post.findByIdAndUpdate(id, {title, short, desc, summary, img, quizId, slug});
      // If creation failed, return an error message
      if (!newMaterial) {
        return { message: 'An error occurred while adding the material.' };
      } 
      console.log(newMaterial);
           // Return the created material
      return {message: 'Add material succesfully'};
  
    } catch (error) {
      console.error('Failed to add material:', error);
      return null;
    } finally {
        redirect('/admin/material')
    }
  };