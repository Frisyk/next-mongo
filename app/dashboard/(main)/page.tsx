import { Button } from '@/components/ui/button';
import {
  Card,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import Carousel from '../(components)/TextCard';
import Link from 'next/link';
import { getMateri } from '@/lib/dal';

export default async function Page() {
  const materi = await getMateri()  
  return (
    <div className="grid gap-4 md:gap-8">
      <CardTitle className='text-4xl'>Kata - kata hari ini🔥</CardTitle>
      <Carousel/>
      <CardTitle className='text-4xl'>Mulai dan Lanjutkan Perjalananmu🚀</CardTitle>
          <div className="flex gap-4 flex-col md:flex-row flex-wrap">
            {materi?.map((m) => (
              <Card key={m.id} className='hover:bg-purple-900 hover:text-white flex-1'>
                <Link href={`/dashboard/${m.title}`} className="flex items-center w-full gap-4">
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
                      <p className="text-sm ">
                        {m.desc}
                      </p>
                    </div>
                  </Link>
              </Card>
            ))}
          </div>
    </div>
  );
}
