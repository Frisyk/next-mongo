import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import Carousel from './(components)/TextCard';
import Link from 'next/link';
import { getMateri } from '@/lib/dal';

export default async function Page() {
  const materi = await getMateri()
  console.log(materi);
  
  return (
    <div className="grid gap-4 md:gap-8">
      <CardTitle className='text-4xl'>Kata - kata hari ini🔥</CardTitle>
      <Carousel/>
      <CardTitle className='text-4xl'>Mulai dan Lanjutkan Perjalananmu🚀</CardTitle>
        <CardContent>
          <div className="flex flex-col gap-4">
            {materi?.map((m) => (
              <Card key={m.id} className='hover:bg-purple-900 hover:text-white'>
                <CardContent className="flex flex-col justify-between gap-4 py-4 md:flex-row md:items-center">
                  <div className="flex items-center gap-4">
                    <Image
                      alt="Image"
                      className="rounded-md object-cover w-20"
                      height="200"
                      src={m.img}
                      style={{
                        aspectRatio: '64/64',
                        objectFit: 'cover',
                      }}
                      width="200"
                    />
                    <div className="grid flex-1 gap-1">
                      <h3 className="font-semibold">{m.title}</h3>
                      <p className="text-sm text-purple-500">
                        {m.desc}
                      </p>
                    </div>
                  </div>

                  <Link href={`/dashboard/${m.title}`}><Button className='border' size="sm">Mulai</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
    </div>
  );
}
