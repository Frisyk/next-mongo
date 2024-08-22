import Form from './Form';
import { getQuiz } from '@/lib/action';

export default async function Quiz
({ searchParams }: {searchParams: { [key: string]: string }
}) {
    const id = searchParams.path
    const quiz = await getQuiz(id)
    
    return (
        <Form m={JSON.stringify(quiz)} />
    )
 
}
