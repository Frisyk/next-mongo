import React from 'react'
import App from './Question'
import { getUser } from '@/lib/dal'

export default async function Page({ params }: { params: any }) {
  const user = await getUser()
  const id = user._id.toString();
  
  return (
    <App user={id}/>
  )
}

