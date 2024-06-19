// src/app/Page.tsx
'use client';
import React, { useState, useEffect } from 'react';

const Footer = dynamic(() => import('@/components/Footer'));
const Header = dynamic(() => import('@/components/Header'));
const LoginPage = dynamic(() => import('@/components/LoginPage'));
const Count = dynamic(() => import('@/components/Count'));
const Main = dynamic(() => import('@/components/Main'));
const Videos = dynamic(() => import('@/components/Videos'));

import { auth } from '../firebaseConfig';
import dynamic from 'next/dynamic';

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
          <Header />
          <div className='flex flex-col flex-1'>
            <Main />
          </div>
          <div className='mt-8'>
            <Count progress={0} />
          </div>
          {/* <Videos /> */}
          <Footer />
        </>
      )}
    </div>
  );
};

export default Page;
