'use server';

import connecttoDB from "./db"
import { User } from "./models"
import { FormState, LoginFormSchema, ScoreState, SignupFormSchema } from '@/lib/definitions';
import { createSession, deleteSession } from '@/lib/stateless-session';
import bcrypt from 'bcrypt';

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
        const user = await User.create({ username, email, point: 100, password: hashedPassword });
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

export const putUserScore = async (userId: string, testName: string, score: number) => {
    try {
        // 1. Connect to the database
        await connecttoDB();

        // 2. Dynamically construct the update object for the score
        const update = { [`scores.${testName}`]: score };
        const filter = { _id: userId };

        // 3. Update the user's score for the specified test
        const result = await User.findByIdAndUpdate(
            filter,
            { $set: update },  // Use $set to correctly update the nested field
            { new: true }  // Return the updated document
        );

        if (!result) {
            throw new Error(`User with ID ${userId} not found`);
        }

        return { message: 'Score updated successfully.' };
    } catch (error) {
        // 5. Handle errors
        console.error('Error updating user score:', error);
        return { message: 'Failed to update score.', error };
    }
};

export const getUserAttempt = async (userId: string) => {
    // Fetch the user from the database by ID
    const user = await User.findById(userId);
    
    // Initialize attempt count if it doesn't exist
    let attempt = user.attempts || 0;
    // Increment the attempt count
    attempt += 1;

    // Update the attempt number in the database
    user.attempts = attempt;
    await user.save();

    console.log(user, user.attempts);
    

    // Return the updated attempt count
    return attempt;
};

