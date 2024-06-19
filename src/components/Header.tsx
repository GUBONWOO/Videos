'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { auth } from '@/firebaseConfig';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {isLoggedIn && (
        <header className='flex justify-between items-center p-4'>
          <Link href='#'>
            <h1 className='text-3xl font-bold'>{'Videos'}</h1>
          </Link>
          <nav className='flex gap-4'>
            <Link href='/'>Home</Link>
            <Link href='/videos'>Videos</Link>
            <Link href='/contact'>Contact</Link>
          </nav>
        </header>
      )}
    </>
  );
}
