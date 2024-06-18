'use client';
import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LoginPage from '@/components/LoginPage';
import { auth } from '../firebaseConfig';
import Count from '@/components/Count';
import Main from '@/components/Main';

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
      {!isLoggedIn && <LoginPage onLogin={handleLogin} />} {/* 로그인 페이지 */}
      {isLoggedIn && (
        <>
          <Header /> {/* 헤더 */}
          <div className='flex flex-col flex-1'>
            <Main /> 메인 페이지
          </div>
          <div className='mt-8'>
            <Count />
          </div>
          <Footer /> {/* 푸터 */}
        </>
      )}
    </div>
  );
};

export default Page;
