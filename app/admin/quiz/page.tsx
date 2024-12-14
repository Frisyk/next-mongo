import { getAllQuizzes } from '@/lib/admin/quizzes';
import Quiz from './Quiz';

export default async function Materials() {
  const quizzes = await getAllQuizzes();
  return (
    <Quiz mquizzes={JSON.stringify(quizzes)} />
  );
}
