import { getMateri, getUser } from '@/lib/dal';
import Content from '../(components)/Content';
import { GetTime } from '../(components)/Header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard'
};

export default async function Page() {
  const materi = await getMateri();
  const user = await getUser();

  return (
    <div className="grid gap-4 md:gap-8 md:mx-10 pb-20">
      <header className='flex md:flex-row items-center gap-4'>
        <div className='rounded-2xl md:w-1/3 w-full h-40 p-6 bg-blue-500 text-white shadow-lg dark:bg-green-700 flex gap-5 items-center'>
          <h1 className='lg:text-3xl text-xl leading-relaxed'>
            Selamat Datang, <br /> <span className='font-bold text-2xl lg:text-4xl'>{user?.username || 'User'}👋🏻</span>
          </h1>
        </div>
        <GetTime />
      </header>
      {
        materi ? <Content materi={materi} /> 
        : <h1>{materi}</h1> 
      }
      
    </div>
  );
}
