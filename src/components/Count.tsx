import React, { useState } from 'react';

const VideoList = () => {
  const [progress, setProgress] = useState(0);

  const handleVideoClick = () => {
    // 진행도를 최대 100%까지만 증가시킵니다.
    setProgress((prevProgress) => Math.min(prevProgress + 10, 100));
  };

  return <div>진척도상황</div>;
};

export default VideoList;
