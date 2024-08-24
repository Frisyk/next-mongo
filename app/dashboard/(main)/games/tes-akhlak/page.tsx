import React from 'react'
import App from './Question'
import { getUser } from '@/lib/dal'

export default async function page() {
  const user = await getUser()
  const id = user.id.toString();
  
  return (
    <App user={id}/>
  )
}

