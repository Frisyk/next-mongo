import React from 'react'
import App from './Question'
import { getUser } from '@/lib/dal'
import { getQuizzesByTag } from '@/lib/admin/quizzes';

export default async function Page({ params }: { params: any }) {
  
  const title = `Kuis: ${decodeURIComponent(params.belajar)}`;
  const user = await getUser()
  const id = user.id.toString();
  const quiz = await getQuizzesByTag(params.quiz)  
    
  return (
    <App user={id} quizM={JSON.stringify(quiz)} title={title} link={'/dashboard'}/>
  )
}

