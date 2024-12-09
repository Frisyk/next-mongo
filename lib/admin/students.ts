'use server';

import { cache } from "react";
import connecttoDB from "../db"
import { Evaluation, Score, TestScore, User } from "../models"
import { Student } from "@/app/admin/student/page";

export const putUserScore = async (userId: string, quiztitle: string, score: number) => {
    try {
        await connecttoDB();
        const result = await Score.create({userId, quiztitle, score})


        if (!result) {
            throw new Error(`User with ID ${userId} not found`);
        }
        
        return { message: 'Score added successfully.' };
    } catch (error) {
        console.error('Error updating user score:', error);
        return { message: 'Failed to update score.', error };
    }
};

export const getUserScore = async (userId?: string) => {
    try {
        await connecttoDB();
        const result = await Score.find({userId: userId})
        if (!result) {
            throw new Error(`User with ID ${userId} not found`);
        }
        
        return result;
    } catch (error) {
        console.error('Error updating user score:', error);
        return { message: 'Failed to update score.', error };
    }
}

export const getAllStudents = cache(async (): Promise<Student[]> => {
  try {
    await connecttoDB(); // Ensure the database connection is established
    const users = await User.find({ isAdmin: { $ne: true } })
    return users.map(user => ({
      id: user._id,
      username: user.username,
      uclass: user.uclass,
      uas: user.uas,
      uts: user.uts,
    })); // Transform the data to match the Student interface
  } catch (error) {
    console.log('Failed to fetch users:', error);
    throw new Error('Failed to fetch users');
  }
});

  export const getDetailsStudent = cache(async (studentId: string) => {
  
    try {
      connecttoDB()
      const user = await User.findOne({
        _id: studentId
      });
      return user;
    } catch (error) {
      console.log('Failed to fetch user');
      return error;
    }
  });
  

  export const addEvaluation = async (userId: string, month: string, content: string): Promise<{ success: boolean; data?: any; message?: string }> => {
    try {
      await connecttoDB();
      const evaluation = new Evaluation({
        user: userId,
        month,
        content,
      });
      await evaluation.save();
  
      const savedEvaluation = await Evaluation.findById(evaluation._id).lean().exec();
  
      return { success: true, data: savedEvaluation };
    } catch (error) {
      console.log('Error adding evaluation:', error);
      return { success: false, message: 'Failed to add evaluation' };
    }
  };

export const updateEvaluation = async (evaluationId: string, month: string, content: string) => {
  try {
    const updatedEvaluation = await Evaluation.findByIdAndUpdate(
      evaluationId,
      { month, content },
      { new: true } // Return the updated document
    );
    return { success: true, data: updatedEvaluation };
  } catch (error) {
    console.log('Error updating evaluation:', error);
    return { success: false, message: 'Failed to update evaluation' };
  }
};

export const saveTestScore = async (userId: string, testName: string, score: number, testTime: Date) => {
  try {
    // Create a new test score
    const testScore = new TestScore({
      user: userId,
      testName: testName,
      score: score,
      testTime: testTime,
    });

    // Save the test score to the database
    await testScore.save();

    return { success: true, message: 'Test score saved successfully!' };
  } catch (error) {
    console.log('Error saving test score:', error);
    return { success: false, message: 'Failed to save test score' };
  }
};

export const getEvaluationsForUser = async (userId: string) => {
  try {
    // Retrieve all evaluations for the user
    const evaluations = await Evaluation.find({ user: userId }).exec();

    return { success: true, data: evaluations };
  } catch (error) {
    console.log('Error fetching evaluations:', error);
    return { success: false, message: 'Failed to fetch evaluations' };
  }
};

export const getTestScoresForUser = async (userId: string) => {
  try {
    // Retrieve all test scores for the user
    const testScores = await TestScore.find({ user: userId }).exec();

    return { success: true, data: testScores };
  } catch (error) {
    console.log('Error fetching test scores:', error);
    return { success: false, message: 'Failed to fetch test scores' };
  }
};
