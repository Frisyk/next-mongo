import Link from 'next/link';
import { SignupForm } from '@/app/(public)/signup/form';
export default function Page() {
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center p-4">

        <SignupForm />
      
    </div>
  );
}
