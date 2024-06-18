import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header className='flex justify-between items-center p-4'>
      <Link href='#'>
        <h1 className='text-3xl font-bold'>{'Videos'}</h1>
      </Link>
      <nav className='flex gap-4'>
        <Link href='/home'>Home</Link>
        <Link href='/videos'>Videos</Link>
        <Link href='/contact'>Contact</Link>
      </nav>
    </header>
  );
}
