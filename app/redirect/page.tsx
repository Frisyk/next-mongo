import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Redirect",
  description: 'Anda dialihkan kehalaman ini.',
};

export default function LoginFirst() {
  return (
    <div className='min-h-screen flex items-start justify-center text-blue-800 p-10 flex-col'>
      <Link href={"/dashboard/quest"}><ArrowLeftCircleIcon className='w-14 my-5 '/></Link>
        <h1 className='text-2xl font-bold '>Untuk Menggunakan Fitur ini, login terlebih dahulu Yaa😊</h1>
        <Link href={"/"} className='px-5 py-3 rounded-full hover:bg-blue-800 hover:text-blue-50 font-semibold outline  my-10'>Ke Halaman Home🏠</Link>
    </div>
  )
}
