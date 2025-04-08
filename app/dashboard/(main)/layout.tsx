import { Button } from '@/components/ui/button';
import { PackageIcon } from '@/components/ui/icons';
import Link from 'next/link';
import { getUser } from '@/lib/dal';
import Navigation from '../(components)/Navigation';
import Header from '../(components)/Header';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
    console.log(user);
    
  return (
    <div className="flex min-h-screen w-full">
      {/* <Navigation userI={JSON.stringify(user)}/> */}
      <div className="flex w-full flex-col">
        <Header user={user? JSON.stringify(user.username) : null} link='#'/>
        <main className="flex-1 p-6 pb-20 md:p-8 bg-slate-100 dark:bg-slate-900">{children}</main>
      </div>
    </div>
  );
}
