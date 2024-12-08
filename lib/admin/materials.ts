'use server';

import connecttoDB from "../db"
import { Materi } from "../models"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
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
    const newMaterial = await Materi.create({
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

export const putMaterial = async (state: any, formData: FormData) => {
  try {
    // Connect to the database
    await connecttoDB();

    // Get the form data fields
    const id = formData.get('id');
    const title = formData.get('title');
    const short = formData.get('shortStory');
    const desc = formData.get('article');
    const summary = formData.get('summary');
    let image = formData.get('imagePath') as File; // assuming the image is passed as a File object
    const quizId = formData.get('quizPath');
    const slug = formData.get('slug');

    // Fetch the existing material from the database
    const existingMaterial = await Materi.findById(id);

    if (!existingMaterial) {
      return { message: 'Material not found.' };
    }

    // Define the public directory where images will be stored
    const publicDir = path.join(process.cwd(), 'public', 'images');

    // Ensure the directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    let imagePath = existingMaterial.img; // Keep existing image path if no new image is provided

    // If a new image is provided, handle the file upload
    if (image) {
      // Generate a unique file name
      const fileName = `${Date.now()}-${image.name}`;
      const filePath = path.join(publicDir, fileName);

      // Write the file to the public directory
      const fileBuffer = await image.arrayBuffer();
      fs.writeFileSync(filePath, Buffer.from(fileBuffer));

      // Set the new image path relative to the public directory
      imagePath = `/images/${fileName}`;
    }

    // Update the material in the database
    const updatedMaterial = await Materi.findByIdAndUpdate(id, {
      title,
      short,
      desc,
      summary,
      img: imagePath,
      quizId,
      slug,
    }, { new: true });

    // If update failed, return an error message
    if (!updatedMaterial) {
      return { message: 'An error occurred while updating the material.' };
    }

    // Return the updated material
    return { message: 'Material updated successfully', material: updatedMaterial };

  } catch (error) {
    console.error('Failed to update material:', error);
    return { message: 'Failed to update material', error };
  } finally {
    // Redirect after updating the material
    redirect('/admin/material');
  }
};


export const deleteMaterial = async(id:string)=> {
    try {
        await connecttoDB()
        await Materi.findByIdAndDelete(id);
        revalidatePath('/admin/material')

    } catch (error) {
        console.error('Failed to remove material:', error);
    }
}
