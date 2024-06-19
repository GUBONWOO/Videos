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
    <>
      {!isLoggedIn && <LoginPage onLogin={handleLogin} />}
      {isLoggedIn && (
        <>
          <Main />
          <Count />
        </>
      )}
    </>
  );
};

export default Page;
