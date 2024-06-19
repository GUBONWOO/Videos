'use client';
import { useState, useEffect } from 'react';

import { auth } from '../firebaseConfig';
import LoginPage from '@/components/LoginPage';
import Main from '@/components/Main';
import Count from '@/components/Count';

const Page = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className='flex flex-col min-h-screen'>
      {!isLoggedIn && <LoginPage onLogin={handleLogin} />}
      {isLoggedIn && (
        <>
          <div className='flex flex-col flex-1'>
            <Main />
          </div>
          <div className='mt-8'>
            <Count />
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
