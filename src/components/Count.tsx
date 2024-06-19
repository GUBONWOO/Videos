// Count.tsx
'use client';
import React from 'react';

interface CountProps {
  progress: number;
}

const Count: React.FC<CountProps> = ({ progress }) => {
  return (
    <div>
      <h3>진행도: {Math.floor(progress)}%</h3>
    </div>
  );
};

export default Count;
