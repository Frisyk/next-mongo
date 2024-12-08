'use server';

import connecttoDB from "../db"
import { Story, Materi } from "../models"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import fs from 'fs';
import path from 'path';

export const addStory = async (state: any, formData: FormData) => {
  try {
    // Connect to the database
    await connecttoDB();

    // Get the form data fields
    const title = formData.get('title');
    const keypoints = formData.get('keypoints');
    const content = formData.get('story');
    let image = formData.get('imagePath') as File; // assuming the image is passed as a File object
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
    const imagePath = `/story/${fileName}`;

    // Create a new material in the database
    const newStory = await Materi.create({
        title,
        keypoints,
        content,
        img: imagePath,
        slug,
      });

    // If creation failed, return an error message
    if (!newStory) {
      return { message: 'An error occurred while adding the Story.' };
    }

    // Return the created Story
    return { message: 'Add Story successfully', Story: newStory };

  } catch (error) {
    console.error('Failed to add Story:', error);
    return { message: 'Failed to add Story', error };
  } finally {
    // Redirect after adding the Story
    redirect('/admin/story');
  }
};

export const putStory = async (state: any, formData: FormData) => {
  try {
    // Connect to the database
    await connecttoDB();

    // Get the form data fields
    const id = formData.get('id');
    const title = formData.get('title');
    const keypoints = formData.get('keypoints');
    const content = formData.get('story');
    let image = formData.get('imagePath') as File; // assuming the image is passed as a File object
    const slug = formData.get('slug');

    // Fetch the existing material from the database
    const existingMaterial = await Story.findById(id);

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
      imagePath = `/story/${fileName}`;
    }

    // Update the material in the database
    const updatedStory = await Materi.findByIdAndUpdate(id, {
      title,
      keypoints,
      content,
      img: imagePath,
      slug,
    }, { new: true });

    // If update failed, return an error message
    if (!updatedStory) {
      return { message: 'An error occurred while updating the material.' };
    }

    // Return the updated material
    return { message: 'Material updated successfully', material: updatedStory };

  } catch (error) {
    console.error('Failed to update material:', error);
    return { message: 'Failed to update material', error };
  } finally {
    // Redirect after updating the material
    redirect('/admin/story');
  }
};


export const deleteStory = async(id:string)=> {
    try {
        await connecttoDB()
        await Story.findByIdAndDelete(id);
        revalidatePath('/admin/story')

    } catch (error) {
        console.error('Failed to remove material:', error);
    }
}
