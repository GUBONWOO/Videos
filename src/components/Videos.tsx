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
  const [videoClicks, setVideoClicks] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [videos, setVideos] = useState<Video[]>([]);
  const [reactVideos, setReactVideos] = useState<Video[]>([]);
  const [vueVideos, setVueVideos] = useState<Video[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체'); // 초기값: 전체
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0); // 전체 진행도 상태 추가
  const [reactProgress, setReactProgress] = useState<number>(0); // 리액트 진행도 상태 추가
  const [vueProgress, setVueProgress] = useState<number>(0); // 뷰 진행도 상태 추가
  const apiKey = 'AIzaSyBgyjaRULMTrWKoaoo2RK56eRqlTwWRfPQ'; // 환경 변수에서 API 키를 가져옴

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

      // 초기 클릭 상태 설정
      const initialClicks: { [key: string]: boolean } = {};
      allVideos.forEach((video) => {
        initialClicks[video.id] = false;
      });
      setVideoClicks(initialClicks);
    };

    fetchVideos();
  }, [apiKey]);

  // 각 버튼 클릭 시 해당 카테고리로 필터링
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  // 동영상 클릭 처리
  const handleVideoClick = (videoId: string) => {
    if (!videoClicks[videoId]) {
      const newClicks = { ...videoClicks, [videoId]: true }; // 클릭 상태 업데이트
      setVideoClicks(newClicks); // 클릭 횟수 배열 업데이트
      increaseProgress(newClicks); // 전체 진행도 업데이트
      increaseCategoryProgress(newClicks); // 카테고리별 진행도 업데이트
    }
    setSelectedVideo(videoId); // 선택된 동영상 설정
  };

  // 전체 진행도 업데이트
  const increaseProgress = (newClicks: { [key: string]: boolean }) => {
    const totalClicks = Object.values(newClicks).filter(
      (click) => click
    ).length;
    const newProgress = (totalClicks / videos.length) * 100; // 총 동영상 개수로 나눠서 진행도 계산
    setProgress(newProgress); // 전체 진행도 업데이트
  };

  // 카테고리별 진행도 업데이트
  const increaseCategoryProgress = (newClicks: { [key: string]: boolean }) => {
    const totalReactClicks = reactVideos.reduce(
      (total, video) => (newClicks[video.id] ? total + 1 : total),
      0
    );
    const totalVueClicks = vueVideos.reduce(
      (total, video) => (newClicks[video.id] ? total + 1 : total),
      0
    );
    const newReactProgress = (totalReactClicks / reactVideos.length) * 100 || 0; // 리액트 진행도 계산
    const newVueProgress = (totalVueClicks / vueVideos.length) * 100 || 0; // 뷰 진행도 계산
    setReactProgress(newReactProgress); // 리액트 진행도 업데이트
    setVueProgress(newVueProgress); // 뷰 진행도 업데이트
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
        {displayedVideos.map((video) => (
          <div key={video.id}>
            <h3
              onClick={() => handleVideoClick(video.id)}
              style={{ cursor: 'pointer', color: 'blue' }}
            >
              {video.snippet.title}
            </h3>
            {selectedVideo === video.id && (
              <iframe
                width='560'
                height='315'
                src={`https://www.youtube.com/embed/${video.id}`}
                allowFullScreen
                style={{ display: 'block', marginTop: '10px' }}
              ></iframe>
            )}
          </div>
        ))}
      </div>

      {/* 전체 진행도 */}
      <div>
        <h3>전체 진행도: {progress.toFixed(2)}%</h3>
        <div style={{ width: '100%', backgroundColor: '#ddd', height: '20px' }}>
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: 'blue',

              transition: 'width 0.3s ease-in-out',
            }}
          ></div>
        </div>
      </div>

      {/* 리액트 진행도 */}
      {selectedCategory !== '뷰' && (
        <div>
          <h3>리액트 진행도: {reactProgress.toFixed(2)}%</h3>
          <div
            style={{ width: '100%', backgroundColor: '#ddd', height: '20px' }}
          >
            <div
              style={{
                width: `${reactProgress}%`,
                height: '100%',
                backgroundColor: 'green',
                transition: 'width 0.3s ease-in-out',
              }}
            ></div>
          </div>
        </div>
      )}

      {/* 뷰 진행도 */}
      {selectedCategory !== '리액트' && (
        <div>
          <h3>뷰 진행도: {vueProgress.toFixed(2)}%</h3>
          <div
            style={{ width: '100%', backgroundColor: '#ddd', height: '20px' }}
          >
            <div
              style={{
                width: `${vueProgress}%`,
                height: '100%',
                backgroundColor: 'purple',
                transition: 'width 0.3s ease-in-out',
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;
