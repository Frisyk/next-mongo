'use server';

import connecttoDB from "./db"
import { Post, Quizi, Score, User } from "./models"
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
        
        return { message: 'Score added successfully.' };
    } catch (error) {
        // 5. Handle errors
        console.error('Error updating user score:', error);
        return { message: 'Failed to update score.', error };
    }
};

export const getQuiz = async (quizId: string) => {
    try {
        // Create a new quiz document
        connecttoDB()
        const quiz = await Quizi.find({quizId})

        return quiz
    } catch (error) {
        console.error('Error getting quiz:', error);
    }
};

export const getQuizzesByTag = async (tag: string) => {
  try {
      // Connect to the database
      await connecttoDB();

      // Find all quizzes that match the given tag
      const quizzes = await Quizi.find({ tag });

      // Return the found quizzes
      return quizzes;
  } catch (error) {
      console.error('Error getting quizzes by tag:', error);
      throw new Error('Failed to retrieve quizzes');
  }
};

export const getAllQuizzes = async () => {
    try {
        // Create a new quiz document
        connecttoDB()
        const quiz = await Quizi.find()

        return quiz
    } catch (error) {
        console.error('Error getting quiz:', error);
    }
};

export const addQuiz = async (state: any, formData: FormData) => {
    try {
      // Connect to the database
      await connecttoDB();
  
      // Extract form data
      const tag = formData.get('tag') as string;
      const questionText = formData.get('question') as string;
  
      // Options and correctness
      const optionA = formData.get('option-a') as string;
      const isCorrectA = formData.get('isCorrectA') ? true : false;

      const optionB = formData.get('option-b') as string;
      const isCorrectB = formData.get('isCorrectB') ? true : false;

      const optionC = formData.get('option-c') as string;
      const isCorrectC = formData.get('isCorrectC') ? true : false;

      const optionD = formData.get('option-d') as string;
      const isCorrectD = formData.get('isCorrectD') ? true : false;
  
      // Build the answers array
      const answers = [
        { label: 'A', text: optionA, isCorrect: isCorrectA, isSelected: false },
        { label: 'B', text: optionB, isCorrect: isCorrectB, isSelected: false },
        { label: 'C', text: optionC, isCorrect: isCorrectC, isSelected: false },
        { label: 'D', text: optionD, isCorrect: isCorrectD, isSelected: false },
      ];
  
      // Create a new quiz object
      const newQuiz = new Quizi({
        tag, questionText, answers
      });
  
      // Save the quiz to the database
      const savedQuiz = await newQuiz.save();
  
      // Check if quiz creation was successful
      if (!savedQuiz) {
        return { message: 'An error occurred while adding the quiz.' };
      }
  
      // Return success message
      return { message: 'Quiz added successfully', quiz: savedQuiz };
    } catch (error) {
      console.error('Failed to add quiz:', error);
      return { message: 'Failed to add quiz', error };
    } finally {
        redirect('/admin/quiz')
    }
  };
  
  export const putQuiz = async (state:any, formData: FormData) => {
    
    try {
      // Connect to the database
      await connecttoDB();
  
      const id = formData.get('id')      

      // Extract form data
      const tag = formData.get('tag') as string;
      const questionText = formData.get('question') as string;
  
      // Options and correctness
      const optionA = formData.get('option-a') as string;
      const isCorrectA = formData.get('isCorrectA') ? true : false;
  
      const optionB = formData.get('option-b') as string;
      const isCorrectB = formData.get('isCorrectB') ? true : false;
  
      const optionC = formData.get('option-c') as string;
      const isCorrectC = formData.get('isCorrectC') ? true : false;
  
      const optionD = formData.get('option-d') as string;
      const isCorrectD = formData.get('isCorrectD') ? true : false;
  
      // Build the answers array
      const answers = [
        { label: 'A', text: optionA, isCorrect: isCorrectA, isSelected: false },
        { label: 'B', text: optionB, isCorrect: isCorrectB, isSelected: false },
        { label: 'C', text: optionC, isCorrect: isCorrectC, isSelected: false },
        { label: 'D', text: optionD, isCorrect: isCorrectD, isSelected: false },
      ];
  
      // Update the quiz document
      const updatedQuiz = await Quizi.findByIdAndUpdate(
        id,
        { tag, questionText, answers },
        { new: true, runValidators: true } // `new: true` returns the updated document, `runValidators: true` ensures validation is applied
      );
  
      // Check if the update was successful
      if (!updatedQuiz) {
        return { message: 'An error occurred while updating the quiz.' };
      }
  
      // Return success message
      return { message: 'Quiz updated successfully', quiz: updatedQuiz };
    } catch (error) {
      console.error('Failed to update quiz:', error);
      return { message: 'Failed to update quiz', error };
    } finally {
      // Optionally redirect or perform any cleanup actions
      redirect('/admin/quiz') // Uncomment if using a redirect function
    }
  };
  

// material CRUD

import fs from 'fs';
import path from 'path';

export const addMaterial = async (state: any, formData: FormData) => {
  try {
    // Connect to the database
    await connecttoDB();

    // Get the form data fields
    const title = formData.get('title');
    const short = formData.get('shortStory');
    const desc = formData.get('article');
    const summary = formData.get('summary');
    const image = formData.get('imagePath') as File; // assuming the image is passed as a File object
    const quizId = formData.get('quizPath');
    const slug = formData.get('slug');

    // Define the public directory where images will be stored
    const publicDir = path.join(process.cwd(), 'public', 'images');

    // Ensure the directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Generate a unique file name
    const fileName = `${Date.now()}-${image.name}`;
    const filePath = path.join(publicDir, fileName);

    // Write the file to the public directory
    const fileBuffer = await image.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(fileBuffer));

    // Set the image path relative to the public directory
    const imagePath = `/images/${fileName}`;

    // Create a new material in the database
    const newMaterial = await Post.create({
      title,
      short,
      desc,
      summary,
      img: imagePath,
      quizId,
      slug,
    });

    // If creation failed, return an error message
    if (!newMaterial) {
      return { message: 'An error occurred while adding the material.' };
    }

    // Return the created material
    return { message: 'Add material successfully', material: newMaterial };

  } catch (error) {
    console.error('Failed to add material:', error);
    return { message: 'Failed to add material', error };
  } finally {
    // Redirect after adding the material
    redirect('/admin/material');
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
           // Return the created material
      return {message: 'Add material succesfully'};
  
    } catch (error) {
      console.error('Failed to add material:', error);
      return null;
    } finally {
        redirect('/admin/material')
    }
  };