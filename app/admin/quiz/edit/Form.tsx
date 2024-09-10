'use client';
import { putQuiz } from '@/lib/admin/quizzes';
import { useFormState } from 'react-dom';

export default function EditQuizForm({ m }: { m: string }) {
  const [state, putAction] = useFormState(putQuiz, undefined); 
  const quiz = JSON.parse(m);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const result = await putQuiz({ id: quiz.id }, formData);
    
    if (result?.message) {
      alert(result.message);
    }
  };

  return (
    <div className="min-h-screen  p-6 flex items-center w-full justify-center">
      <div className=" shadow-md rounded-lg p-6 w-full">
        <h1 className="text-2xl font-bold mb-6 text-blue-600">Edit Quiz</h1>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="id" defaultValue={quiz.id} />
          
          <div className="mb-6">
            <label className="block  text-sm font-bold mb-2">Tag</label>
            <input
              type="text"
              name="tag"
              className="w-full p-2 border bg-slate-800 rounded-lg"
              placeholder="Enter slug"
              defaultValue={quiz.tag}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block  text-sm font-bold mb-2">Question Text</label>
            <textarea
              name="question"
              className="w-full p-2 border bg-slate-800 rounded-lg"
              placeholder="Enter question text"
              defaultValue={quiz.questionText}
              required
            />
          </div>

          {quiz.answers.map((answer: any, index: number) => (
            <div key={index} className="mb-4">
              <label className="block  text-sm font-bold mb-2">Option {String.fromCharCode(65 + index)}</label>
              <input
                type="text"
                name={`option-${String.fromCharCode(97 + index)}`}
                className="w-full p-2 border bg-slate-800 rounded-lg"
                defaultValue={answer.text}
                required
              />
              <label className="inline-flex items-center mt-2">
                <input
                  type="checkbox"
                  name={`isCorrect${String.fromCharCode(65 + index)}`}
                  className="form-checkbox"
                  defaultChecked={answer.isCorrect}
                />
                <span className="ml-2">Correct Answer</span>
              </label>
            </div>
          ))}

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
