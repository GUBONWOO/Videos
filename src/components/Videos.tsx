'use client';
import React, { useEffect, useState } from 'react';

// YouTube 동영상 ID 추출 함수
function extractVideoId(url: string): string | null {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : null;
}

// 동영상 정보 타입 정의
interface Video {
  id: string;
  snippet: {
    title: string;
  };
}

const Videos: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [videoClicks, setVideoClicks] = useState<number[]>([0, 0, 0, 0, 0, 0]); // 각 동영상 클릭 횟수 저장
  const [videos, setVideos] = useState<Video[]>([]);
  const [reactVideos, setReactVideos] = useState<Video[]>([]);
  const [vueVideos, setVueVideos] = useState<Video[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체'); // 초기값: 전체
  const apiKey = 'AIzaSyBgyjaRULMTrWKoaoo2RK56eRqlTwWRfPQ'; // 여기에 본인의 YouTube Data API 키를 넣어주세요

  // YouTube Data API 호출 함수
  const fetchVideoDetails = async (
    videoId: string,
    apiKey: string
  ): Promise<Video | null> => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`
      );
      const data = await response.json();
      return data.items[0] as Video;
    } catch (error) {
      console.error('Error fetching video details:', error);
      return null;
    }
  };

  useEffect(() => {
    const videoUrls = [
      'https://www.youtube.com/watch?v=qcphnSqneE0&list=PLKvVQ9ZQzjVkP0xd30Zi90P4S_rTlm-LH',
      'https://www.youtube.com/watch?v=MeZ3FCTub3I&list=PLKvVQ9ZQzjVkP0xd30Zi90P4S_rTlm-LH&index=2',
      'https://www.youtube.com/watch?v=NcI-WJSWdv8&list=PLKvVQ9ZQzjVkP0xd30Zi90P4S_rTlm-LH&index=3',
      'https://www.youtube.com/watch?v=NONWar0jGLM&list=PLfLgtT94nNq3Br68sEe26jkOqCPK_8UQ-&index=2',
      'https://www.youtube.com/watch?v=0BbF7UxKKvg&list=PLfLgtT94nNq3Br68sEe26jkOqCPK_8UQ-&index=3',
      'https://www.youtube.com/watch?v=T4N9wjx7_E4&list=PLfLgtT94nNq3Br68sEe26jkOqCPK_8UQ-&index=4',
    ];

    const fetchVideos = async () => {
      const videoDetails = await Promise.all(
        videoUrls.map((url) => {
          const videoId = extractVideoId(url);
          return videoId
            ? fetchVideoDetails(videoId, apiKey)
            : Promise.resolve(null);
        })
      );

      const allVideos = videoDetails.filter((video) => video) as Video[]; // 유효한 동영상만 설정
      setVideos(allVideos);

      const reactVideos = allVideos.filter((video) =>
        video.snippet.title.toLowerCase().includes('리액트')
      );
      setReactVideos(reactVideos);

      const vueVideos = allVideos.filter((video) =>
        video.snippet.title.toLowerCase().includes('vue')
      );
      setVueVideos(vueVideos);
    };

    fetchVideos();
  }, [apiKey]);

  // 각 버튼 클릭 시 해당 카테고리로 필터링
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  // 동영상 클릭 처리
  const handleVideoClick = (index: number) => {
    if (videoClicks[index] === 0) {
      const newClicks = [...videoClicks];
      newClicks[index] = 1; // 클릭 횟수를 1로 설정
      setVideoClicks(newClicks); // 클릭 횟수 배열 업데이트
      increaseProgress(newClicks); // 진행도 업데이트
    }
  };

  // 진행도 업데이트
  const increaseProgress = (newClicks: number[]) => {
    const totalClicks = newClicks.reduce((acc, curr) => acc + curr, 0);
    const newProgress = (totalClicks / newClicks.length) * 100; // 총 동영상 개수로 나눠서 진행도 계산
    setProgress(newProgress); // 진행도 업데이트
  };

  // 선택된 카테고리에 따라 보여줄 동영상 리스트 결정
  let displayedVideos: Video[] = [];
  if (selectedCategory === '전체') {
    displayedVideos = videos;
  } else if (selectedCategory === '리액트') {
    displayedVideos = reactVideos;
  } else if (selectedCategory === 'vue') {
    displayedVideos = vueVideos;
  }

  return (
    <div>
      <h2>강의 카테고리</h2>
      <div>
        <button onClick={() => handleCategoryClick('전체')}>전체 강의</button>
        <button onClick={() => handleCategoryClick('리액트')}>
          리액트 강의
        </button>
        <button onClick={() => handleCategoryClick('vue')}>뷰 강의</button>
      </div>

      <h2>{selectedCategory} 강의</h2>
      <div className='video-list'>
        {displayedVideos.map((video, index) => (
          <div key={video.id}>
            <h3>{video.snippet.title}</h3>
            <iframe
              width='250'
              height='200'
              src={`https://www.youtube.com/embed/${video.id}`}
              allowFullScreen
              onClick={() => handleVideoClick(index)}
              style={{ cursor: 'pointer' }}
            ></iframe>
          </div>
        ))}
      </div>

      <div>
        <h3>진행도: {Math.floor(progress)}%</h3>
      </div>
    </div>
  );
};

export default Videos;
