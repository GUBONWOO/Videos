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
        <header className='bg-gray-900 text-white'>
          <div className='container mx-auto px-4 py-6 flex justify-between items-center'>
            {/* Logo/Title */}
            <div className='text-3xl font-bold'>
              <Link href='/'>
                <span className='cursor-pointer hover:text-blue-500'>
                  Koo School
                </span>
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className='space-x-4'>
              <Link href='/'>
                <span className='cursor-pointer text-lg font-medium text-white hover:text-blue-500'>
                  Home
                </span>
              </Link>
              <Link href='/videos'>
                <span className='cursor-pointer text-lg font-medium text-white hover:text-blue-500'>
                  Videos
                </span>
              </Link>
              <Link href='/contact'>
                <span className='cursor-pointer text-lg font-medium text-white hover:text-blue-500'>
                  Contact
                </span>
              </Link>
            </nav>
          </div>
        </header>
      )}
    </>
  );
}
