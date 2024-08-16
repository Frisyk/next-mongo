import React from 'react'
import App from './Question'
import { getUser } from '@/lib/dal'
import { getQuiz } from '@/lib/action';

export default async function Page({ params }: { params: any }) {
  const user = await getUser()
  const id = user.id.toString();
  const quiz = await getQuiz(params.quiz)
    
  return (
    <App user={id} quizM={JSON.stringify(quiz)} link={'/'}/>
  )
}

