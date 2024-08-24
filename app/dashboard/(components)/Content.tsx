import { Card, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Content({materi} : {materi: any}) {
  return (
    <div>
       <h1 className='md:text-4xl text-2xl my-5 md:mb-10 font-bold'>Yuk Belajar Lagi Hari Ini🚀</h1>
          <div className="flex md:gap-10 gap-3 w-full flex-col md:flex-row flex-wrap">
  {materi?.map((m: any, index: number) => (
    <div
      key={m.id}
      className="mx-5 md:mx-0 md:w-[22rem] h-40 md:h-96 bg-white dark:bg-purple-950 rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
    >
      <Link prefetch={false} href={`/dashboard/${m.slug}`} className=" w-full h-full flex">

        <div className="m-5 md:w-full flex flex-col gap-4 w-2/3">
          <span className="font-semibold rounded text-purple-950 dark:text-white">
            Chapter {index + 1}
          </span>
          <Image
            alt="Image"
            className="w-full hidden md:block md:h-3/5 md:mx-auto ml-auto mr-2 rounded-2xl object-cover"
            height="400"
            src={m.img}
            width="400"
          />
          <h3 className="md:text-3xl text-xl font-bold text-purple-900 dark:text-orange-300 ">
            {m.title}
          </h3>
        </div>        
          <Image
            alt="Image"
            className="w-36 md:hidden h-36 md:w-4/5 md:h-3/5 md:mx-auto m-auto mr-2 rounded-2xl object-cover"
            height="400"
            src={m.img}
            width="400"
          />
      </Link>
    </div>
  ))}
</div>

    </div>
  )
}
