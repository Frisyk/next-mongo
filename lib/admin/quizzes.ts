'use server';

import { revalidatePath } from "next/cache";
import connecttoDB from "../db"
import { Quizi } from "../models"
import { redirect } from "next/navigation";

export const getQuiz = async (quizId: string) => {
    try {
        // Create a new quiz document
        connecttoDB()
        const quiz = await Quizi.findById(quizId)      

        return quiz
    } catch (error) {
        console.error('Error getting quiz:', error);
    }
};

export const deleteQuiz = async(id:string)=> {
  try {
      await connecttoDB()
      await Quizi.findByIdAndDelete(id);
      revalidatePath('/admin/quiz')

  } catch (error) {
      console.error('Failed to remove material:', error);
  }
}

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