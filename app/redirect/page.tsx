import Link from 'next/link'
import React from 'react'
import type { Metadata } from "next";
import { ArrowLeftCircle } from 'lucide-react';
import { BiLogIn } from 'react-icons/bi';


export const metadata: Metadata = {
  title: "Redirect",
  description: 'Anda dialihkan kehalaman ini.',
};

export default function LoginFirst() {
  return (
    <div className='min-h-screen flex items-start md:ml-20 justify-center text-blue-800 p-10 flex-col'>
      <Link href={"/dashboard"}><ArrowLeftCircle className='w-14 h-14 my-5 '/></Link>
        <h1 className='text-2xl font-bold '>Kalo kamu nyasar kesini, <br /> berarti kamu perlu Login dulu Yaa😊</h1>
        <Link href={"/login"} className='px-5 transition-transform duration-500 py-3 rounded-full hover:bg-blue-800 hover:text-blue-50 font-semibold outline  my-10'>Ke Halaman Login <BiLogIn className='inline w-10 h-10' /></Link>
    </div>
  )
}
