'use server';

import connecttoDB from "../db"
import { Materi } from "../models"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import fs from 'fs';
import path from 'path';

// export const addMaterial = async (state: any, formData: FormData) => {
//   try {
//     // Connect to the database
//     await connecttoDB();

//     // Get the form data fields
//     const title = formData.get('title');
//     const short = formData.get('shortStory');
//     const desc = formData.get('article');
//     const summary = formData.get('summary');
//     const image = formData.get('imagePath') as File; // assuming the image is passed as a File object
//     const quizId = formData.get('quizPath');
//     const slug = formData.get('slug');

//     // Define the public directory where images will be stored
//     const publicDir = path.join(process.cwd(), 'public', 'images');

//     // Ensure the directory exists
//     if (!fs.existsSync(publicDir)) {
//       fs.mkdirSync(publicDir, { recursive: true });
//     }

//     // Generate a unique file name
//     const fileName = `${Date.now()}-${image.name}`;
//     const filePath = path.join(publicDir, fileName);

//     // Write the file to the public directory
//     const fileBuffer = await image.arrayBuffer();
//     fs.writeFileSync(filePath, Buffer.from(fileBuffer));

//     // Set the image path relative to the public directory
//     const imagePath = `/images/${fileName}`;

//     // Create a new material in the database
//     const newMaterial = await Materi.create({
//       title,
//       short,
//       desc,
//       summary,
//       img: imagePath,
//       quizId,
//       slug,
//     });

//     // If creation failed, return an error message
//     if (!newMaterial) {
//       return { message: 'An error occurred while adding the material.' };
//     }

//     // Return the created material
//     return { message: 'Add material successfully', material: newMaterial };

//   } catch (error) {
//     console.error('Failed to add material:', error);
//     return { message: 'Failed to add material', error };
//   } finally {
//     // Redirect after adding the material
//     redirect('/admin/material');
//   }
// };

// export const putMaterial = async (state: any, formData: FormData) => {
//   try {
//     // Connect to the database
//     await connecttoDB();

//     // Get the form data fields
//     const id = formData.get('id') as string;
//     const title = formData.get('title') as string;
//     const short = formData.get('shortStory') as string;
//     const desc = formData.get('article') as string;
//     const summary = formData.get('summary') as string;
//     const image = formData.get('imagePath') as File | null; // File can be null
//     const quizId = formData.get('quizPath') as string;
//     const slug = formData.get('slug') as string;

//     // Fetch the existing material from the database
//     const existingMaterial = await Materi.findById(id);

//     if (!existingMaterial) {
//       return { message: 'Material not found.' };
//     }

//     // Define the public directory where images will be stored
//     const publicDir = path.join(process.cwd(), 'public', 'images');

//     // Ensure the directory exists
//     if (!fs.existsSync(publicDir)) {
//       fs.mkdirSync(publicDir, { recursive: true });
//     }

//     let imagePath = existingMaterial.img;
//     console.log(imagePath);
    
//     if (image && image.name) {
//       // Generate a unique file name
//       const fileName = `${Date.now()}-${image.name}`;
//       const filePath = path.join(publicDir, fileName);
    
//       // Write the file to the public directory
//       const fileBuffer = await image.arrayBuffer();
//       fs.writeFileSync(filePath, Buffer.from(fileBuffer));
    
//       // Set the new image path relative to the public directory
//       imagePath = `/images/${fileName}`;
//     }
    

//     // Update the material in the database
//     const updatedMaterial = await Materi.findByIdAndUpdate(
//       id,
//       {
//         title,
//         short,
//         desc,
//         summary,
//         img: imagePath,
//         quizId,
//         slug,
//       },
//       { new: true }
//     );

//     if (!updatedMaterial) {
//       return { message: 'An error occurred while updating the material.' };
//     }

//     // Return the updated material
//     return { message: 'Material updated successfully', material: updatedMaterial };
//   } catch (error) {
//     console.error('Failed to update material:', error);
//     return { message: 'Failed to update material', error };
//   } finally {
//     // Redirect after updating the material
//     redirect('/admin/material');
//   }
// };

export const addMaterial = async (state: any, formData: FormData) => {
  try {
    // Connect to the database
    await connecttoDB();

    // Get the form data fields
    const title = formData.get('title');
    const content = formData.get('content');
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
      understanding: content,
      arguments: '',
      forms: '',
      values: '',
      prevents: '',
      traits: '',
      examples: '',
      img: imagePath,
      quizId,
      slug,
    });

    // If creation failed, return an error message
    if (!newMaterial) {
      return { message: 'Terjadi kesalahan saat menambahkan materi.' };
    }

    // Return the created material
    return { message: 'Materi berhasil ditambahkan', material: newMaterial };

  } catch (error) {
    console.error('Failed to add material:', error);
    return { message: 'Gagal menambahkan materi', error };
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
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const understanding = formData.get('understanding') as string;
    const argumentsField = formData.get('arguments') as string;
    const forms = formData.get('forms') as string;
    const values = formData.get('values') as string;
    const prevents = formData.get('prevents') as string;
    const traits = formData.get('traits') as string;
    const examples = formData.get('examples') as string;
    const image = formData.get('imagePath') as File | null; // File can be null
    const quizId = formData.get('quizPath') as string;
    const slug = formData.get('slug') as string;    

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

    let imagePath = existingMaterial.img;

    if (image && image.name) {
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
    const updatedMaterial = await Materi.findByIdAndUpdate(
      id,
      {
        title,
        understanding,
        arguments: argumentsField,
        forms,
        values,
        prevents,
        traits,
        examples,
        img: imagePath,
        quizId,
        slug,
      },
      { new: true }
    );

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
