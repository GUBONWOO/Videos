'use client';

import React, { useState } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LoginPage from '@/components/LoginPage';

const Page = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // 로그인 성공 시 상태 업데이트
    setIsLoggedIn(true);
  };

  return (
    <div>
      {!isLoggedIn && <LoginPage onLogin={handleLogin} />} {/* 로그인 페이지 */}
      {isLoggedIn && (
        <>
          <Header /> {/* 헤더 */}
          <div>Content for logged-in users</div> {/* 로그인 후 보여질 컨텐츠 */}
          <Footer /> {/* 푸터 */}
        </>
      )}
    </div>
  );
};

export default Page;
