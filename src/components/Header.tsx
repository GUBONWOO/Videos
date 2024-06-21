import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  AiFillBook,
  AiOutlinePlayCircle,
  AiOutlineMail,
  AiFillHome,
} from 'react-icons/ai';
import { auth } from '@/firebaseConfig';
import Main from './Main';

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
            <div className='text-3xl font-bold flex items-center space-x-4'>
              <Link href='#' passHref>
                <div className='flex items-center cursor-pointer text-lg font-medium text-white'>
                  <AiFillBook className='text-4xl' />
                  <span className='text-4xl ml-2 hidden md:inline'>
                    Koo School
                  </span>
                </div>
              </Link>
            </div>
            <nav className='flex space-x-4'>
              <Link href='/' passHref>
                <div className='flex items-center cursor-pointer text-lg font-medium text-white hover:text-blue-500'>
                  <AiFillHome />
                  <span className='ml-2 hidden md:inline'>Home</span>
                </div>
              </Link>
              <Link href='/videos' passHref>
                <div className='flex items-center cursor-pointer text-lg font-medium text-white hover:text-blue-500'>
                  <AiOutlinePlayCircle />
                  <span className='ml-2 hidden md:inline'>Videos</span>
                </div>
              </Link>
              <Link href='/contact' passHref>
                <div className='flex items-center cursor-pointer text-lg font-medium text-white hover:text-blue-500'>
                  <AiOutlineMail />
                  <span className='ml-2 hidden md:inline'>Contact</span>
                </div>
              </Link>
              <Main />
            </nav>
          </div>
        </header>
      )}
    </>
  );
}
