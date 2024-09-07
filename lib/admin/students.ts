'use server';

import connecttoDB from "../db"
import { Score, User } from "../models"

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