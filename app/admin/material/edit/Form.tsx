'use client';
import { putMaterial } from '@/lib/admin/materials';
import { useFormState } from 'react-dom';

export default function Form({ m }: { m: string }) {
  const [state, putAction] = useFormState(putMaterial, undefined);
  const materi = JSON.parse(m);
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const result = await putMaterial({ id: materi._id }, formData);
    
    if (result?.message) {
      alert(result.message);
    }
  };

  return (
    <div className="min-h-screen p-6 flex items-center w-full justify-center">
      <div className="shadow-md rounded-lg p-6 w-full">
        <h1 className="text-2xl font-bold mb-6 text-blue-600">Edit Material</h1>
        <form onSubmit={handleSubmit}>
        <input
            type="hidden"
            name="id"
            defaultValue={materi._id}
          />
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Title</label>
            <input
              type="text"
              name="title"
              className="w-full p-2 border dark:bg-slate-800 rounded-lg"
              placeholder="Enter title"
              defaultValue={materi.title}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Pengertian</label>
            <textarea
              name="understanding"
              className="w-full p-2 border dark:bg-slate-800 rounded-lg"
              placeholder="Enter short story"
              defaultValue={materi.understanding}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Dalil Naqli</label>
            <textarea
              name="arguments"
              className="w-full p-2 border dark:bg-slate-800 rounded-lg"
              placeholder="Enter Dalil Naqli"
              defaultValue={materi.arguments}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Bentuk/Sebab</label>
            <textarea
              name="forms"
              className="w-full p-2 border dark:bg-slate-800 rounded-lg"
              placeholder="Enter Bentuk/Sebab"
              defaultValue={materi.forms}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Ciri-Ciri</label>
            <textarea
              name="trait"
              className="w-full p-2 border dark:bg-slate-800 rounded-lg"
              placeholder="Enter Ciri-Ciri"
              defaultValue={materi.traits}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Contoh</label>
            <textarea
              name="examples"
              className="w-full p-2 border dark:bg-slate-800 rounded-lg"
              placeholder="Enter Contoh"
              defaultValue={materi.examples}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Nilai-Nilai</label>
            <textarea
              name="values"
              className="w-full p-2 border dark:bg-slate-800 rounded-lg"
              placeholder="Enter Nilai-Nilai"
              defaultValue={materi.values}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Cara Menghindari</label>
            <textarea
              name="prevents"
              className="w-full p-2 border dark:bg-slate-800 rounded-lg"
              placeholder="Enter Cara Menghindari"
              defaultValue={materi.prevents}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Image Path</label>
            <input
              type="file"
              name="imagePath"
              className="w-full p-2 border dark:bg-slate-800 rounded-lg"
              placeholder="Enter image path"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Quiz Path</label>
            <input
              type="text"
              name="quizPath"
              className="w-full p-2 border dark:bg-slate-800 rounded-lg"
              placeholder="Enter quiz path"
              defaultValue={materi.quizId}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Slug</label>
            <input
              type="text"
              name="slug"
              className="w-full p-2 border dark:bg-slate-800 rounded-lg"
              placeholder="Enter slug"
              defaultValue={materi.slug}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
}
