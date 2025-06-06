'use client'
import { addMaterial } from '@/lib/admin/materials';
import { useFormState } from 'react-dom';
export default function AddMaterial() {
  const [state, action] = useFormState(addMaterial, undefined);

  return (
    <div className="min-h-screen p-6 flex items-center w-full justify-center">
      <div className=" shadow-md rounded-lg p-6 w-full">
        <h1 className="text-2xl font-bold mb-6 text-blue-600">Add New Material</h1>
        <form action={action}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Title</label>
            <input
              type="text"
              name="title"
              className="w-full p-2 border dark:bg-slate-800 rounded-lg"
              placeholder="Enter title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Pengertian</label>
            <textarea
              name="understanding"
              className="w-full p-2 border dark:bg-slate-800 rounded-lg"
              placeholder="Enter short story"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Dalil Naqli</label>
            <textarea
              name="arguments"
              className="w-full p-2 border dark:bg-slate-800 rounded-lg"
              placeholder="Enter article"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Ciri-Ciri</label>
            <textarea
              name="traits"
              className="w-full p-2 border dark:bg-slate-800 rounded-lg"
              placeholder="Enter summary"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Bentuk/Sebab</label>
            <textarea
              name="forms"
              className="w-full p-2 border dark:bg-slate-800 rounded-lg"
              placeholder="Enter summary"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Contoh</label>
            <textarea
              name="examples"
              className="w-full p-2 border dark:bg-slate-800 rounded-lg"
              placeholder="Enter summary"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Nilai-nilai</label>
            <textarea
              name="values"
              className="w-full p-2 border dark:bg-slate-800 rounded-lg"
              placeholder="Enter summary"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Cara Menghindari</label>
            <textarea
              name="prevents"
              className="w-full p-2 border dark:bg-slate-800 rounded-lg"
              placeholder="Enter summary"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Image Path</label>
            <input
              type="file"
              name="imagePath"
              className="w-full p-2 border dark:bg-slate-800 rounded-lg"
              placeholder="Enter image"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Quiz Path</label>
            <input
              type="text"
              name="quizPath"
              className="w-full p-2 border dark:bg-slate-800 rounded-lg"
              placeholder="Enter quiz path"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">slug</label>
            <input
              type="text"
              name="slug"
              className="w-full p-2 border dark:bg-slate-800 rounded-lg"
              placeholder="Enter slug"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Save Material
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
