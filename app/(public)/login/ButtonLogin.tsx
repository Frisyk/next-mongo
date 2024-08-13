'use client';

import { signIn } from 'next-auth/react';

const ButtonLogin = () => {
  return (
    <button onClick={() => signIn('google')} className='fixed rounded-full text-white right-0 bg-blue-800 top-0 px-10 py-3 m-5 hover:underline'>
      Login
    </button>
  );
};

export default ButtonLogin;