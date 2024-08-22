'use client'
import { addQuiz } from '@/lib/action';
import { useFormState } from 'react-dom';

export default function CreateQuizForm() {
  const [state, action] = useFormState(addQuiz, undefined);
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full">
        <h1 className="text-2xl font-bold mb-6 text-blue-600">Create Quiz</h1>
        <form action={action}>
            <div className="mb-6">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                <input
                  type="text"
                  name="tag"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter question category"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Question Text</label>
                <textarea
                  name="question"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter question text"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Option A</label>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="option-a"
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                    <label className="inline-flex items-center mt-2">
                      <input
                        type="checkbox"
                        name="isCorrectA"
                        className="form-checkbox"
                      />
                      <span className="ml-2">Correct Answer</span>
                    </label>
                  </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Option B</label>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="option-b"
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                    <label className="inline-flex items-center mt-2">
                      <input
                        type="checkbox"
                        name="isCorrectB"
                        // onChange={(e) => handleInputChange(e, questionIndex, answerIndex)}
                        className="form-checkbox"
                      />
                      <span className="ml-2">Correct Answer</span>
                    </label>
                  </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Option C</label>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="option-c"
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                    <label className="inline-flex items-center mt-2">
                      <input
                        type="checkbox"
                        name="isCorrectC"
                        className="form-checkbox"
                      />
                      <span className="ml-2">Correct Answer</span>
                    </label>
                  </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Option D</label>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="option-d"
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                    <label className="inline-flex items-center mt-2">
                      <input
                        type="checkbox"
                        name="isCorrectD"
                        
                        // onChange={(e) => handleInputChange(e, questionIndex, answerIndex)}
                        className="form-checkbox"
                      />
                      <span className="ml-2">Correct Answer</span>
                    </label>
                  </div>
              </div>
            </div>
          

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            >
              Save Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
