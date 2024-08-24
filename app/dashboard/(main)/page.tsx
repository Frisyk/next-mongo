import Image from 'next/image';
import Carousel from '../(components)/TextCard';
import Link from 'next/link';
import { getMateri, getUser } from '@/lib/dal';
import Content from '../(components)/Content';
import { GetTime } from '../(components)/Header';

const getInitials = (name: string) => {
  if (!name) return 'US';
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('');
  return initials.toUpperCase();
};

interface UserImageProps {
  user?: {
    username: string;
    img?: string;
  };
}

const UserImage = ({ user }: UserImageProps) => {
  const initials = getInitials(user?.username || 'U');

  return user?.img ? (
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
  const materi = await getMateri();
  const user = await getUser();

  return (
    <div className="grid gap-4 md:gap-8 md:mx-10 pb-20">
      <header className='flex md:flex-row items-center gap-4'>
        <div className='rounded-2xl md:w-1/3 w-full h-40 p-6 bg-purple-200 shadow-lg dark:bg-green-700 flex gap-5 items-center'>
          {/* <UserImage user={user} /> */}
          <h1 className='md:text-3xl text-xl leading-relaxed'>
            Selamat Datang, <br /> <span className='font-bold text-5xl'>{user?.username || 'User'}👋🏻</span>
          </h1>
        </div>
        <GetTime />
      </header>
      {/* <Carousel /> */}
      <Content materi={materi} />
    </div>
  );
}
