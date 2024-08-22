
import Image from 'next/image';
import Carousel from '../(components)/TextCard';
import Link from 'next/link';
import { getMateri, getUser } from '@/lib/dal';
import Content from '../(components)/Content';

const getInitials = (name: string) => {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('');
  return initials.toUpperCase();
};

const UserImage = ({ user }: { user: any }) => {
  const initials = getInitials(user.username);

  return user.img ? (
    <Image
      alt={`image ${user.username}`}
      src={user.img}
      width={400}
      height={400}
      className="rounded-full bg-orange-300 w-12 h-12"
    />
  ) : (
    <div className="rounded-full bg-blue-800 w-12 h-12 flex items-center justify-center text-white font-bold text-lg">
      {initials}
    </div>
  );
};
export default async function Page() {
  const materi = await getMateri()  
  const user = await getUser()  
  return (
    <div className="grid gap-4 md:gap-8 ">
      <header className='flex items-center gap-4'>
        <UserImage user={user} />
        <h1 className='text-3xl'>Selamat Datang, {user.username}👋🏻</h1>
      </header>
      <Carousel/>
     <Content materi={materi} />
    </div>
  );
}
