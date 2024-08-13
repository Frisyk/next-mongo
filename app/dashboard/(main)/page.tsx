import {
  Card,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import Carousel from '../(components)/TextCard';
import Link from 'next/link';
import { getMateri, getUser } from '@/lib/dal';
import Content from '../(components)/Content';

export default async function Page() {
  const materi = await getMateri()  
  const user = await getUser()  
  return (
    <div className="grid gap-4 md:gap-8 ">
      <header className='flex items-center gap-4'>
        <Image 
         alt={`image ${user.username}`}
         src={user.img}
         width={400}
         height={400}
         className='rounded-full bg-orange-300 w-12 h-12'
        />
        <h1 className='text-3xl'>Selamat Datang, {user.username}👋🏻</h1>
      </header>
      <Carousel/>
     <Content materi={materi} />
    </div>
  );
}
