'use client';
import { putMaterial } from '@/lib/action';
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
    <div className="min-h-screen bg-gray-100 p-6 flex items-center w-full justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full">
        <h1 className="text-2xl font-bold mb-6 text-blue-600">Edit Material</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input
              type="text"
              name="title"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter title"
              defaultValue={materi.title}
              required
            />
            <h1>{state?.message}</h1>
          </div>
          <input
            type="hidden"
            name="id"
            defaultValue={materi._id}
          />
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Short Story</label>
            <textarea
              name="shortStory"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter short story"
              defaultValue={materi.short}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Article</label>
            <textarea
              name="article"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter article"
              defaultValue={materi.desc}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Summary</label>
            <textarea
              name="summary"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter summary"
              defaultValue={materi.summary}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Image Path</label>
            <input
              type="text"
              name="imagePath"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter image path"
              defaultValue={materi.img}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Quiz Path</label>
            <input
              type="text"
              name="quizPath"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter quiz path"
              defaultValue={materi.quizId}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Slug</label>
            <input
              type="text"
              name="slug"
              className="w-full p-2 border rounded-lg"
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
