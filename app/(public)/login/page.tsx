import ButtonLogin from './ButtonLogin';
import { LoginForm } from './form';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center p-4">
        <LoginForm />

    </div>
  );
}
