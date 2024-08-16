import { Card, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Content({materi} : {materi: any}) {
  return (
    <div>
       <CardTitle className='text-4xl mb-4'>Mulai dan Lanjutkan Perjalananmu🚀</CardTitle>
          <div className="flex gap-4 flex-col md:flex-row flex-wrap">
            {materi?.map((m:any) => (
              <Card key={m.id} className='hover:bg-purple-900 hover:text-white flex-1'>
                <Link href={`/dashboard/${m.id}`} className="flex items-center w-full gap-4">
                    <Image
                      alt="Image"
                      className="rounded-md object-cover w-40"
                      height="200"
                      src={m.img}
                      style={{
                        aspectRatio: '64/64',
                        objectFit: 'cover',
                      }}
                      width="200"
                    />
                    <div className="grid flex-1 gap-1">
                      <h3 className="font-semibold text-2xl">{m.title}</h3>
                      {/* <p className="text-sm ">
                        {m.desc}
                      </p> */}
                    </div>
                  </Link>
              </Card>
            ))}
          </div>
    </div>
  )
}
