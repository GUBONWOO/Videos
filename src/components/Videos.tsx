'use client';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setProgress,
  setReactProgress,
  setVueProgress,
  setSelectedCategory,
} from '@/store/progressSlice';
import { RootState } from '@/store/store';

function extractVideoId(url: string): string | null {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : null;
}

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
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const { progress, reactProgress, vueProgress, selectedCategory } =
    useSelector((state: RootState) => state.progress);
  const dispatch = useDispatch();

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const fetchVideoDetails = async (
    videoId: string,
    apiKey: string | undefined
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

      const allVideos = videoDetails.filter((video) => video) as Video[];
      setVideos(allVideos);

      const reactVideos = allVideos.filter((video) =>
        video.snippet.title.toLowerCase().includes('리액트')
      );
      setReactVideos(reactVideos);

      const vueVideos = allVideos.filter((video) =>
        video.snippet.title.toLowerCase().includes('vue')
      );
      setVueVideos(vueVideos);

      const initialClicks: { [key: string]: boolean } = {};
      allVideos.forEach((video) => {
        initialClicks[video.id] = false;
      });
      setVideoClicks(initialClicks);
    };

    fetchVideos();
  }, [apiKey]);

  const handleCategoryClick = (category: string) => {
    dispatch(setSelectedCategory(category));
  };

  const handleVideoClick = (videoId: string) => {
    if (!videoClicks[videoId]) {
      const newClicks = { ...videoClicks, [videoId]: true };
      setVideoClicks(newClicks);
      increaseProgress(newClicks);
      increaseCategoryProgress(newClicks);
    }
    setSelectedVideo(videoId);
  };

  const increaseProgress = (newClicks: { [key: string]: boolean }) => {
    const totalClicks = Object.values(newClicks).filter(
      (click) => click
    ).length;
    const newProgress = (totalClicks / videos.length) * 100;
    dispatch(setProgress(newProgress));
  };

  const increaseCategoryProgress = (newClicks: { [key: string]: boolean }) => {
    const totalReactClicks = reactVideos.reduce(
      (total, video) => (newClicks[video.id] ? total + 1 : total),
      0
    );
    const totalVueClicks = vueVideos.reduce(
      (total, video) => (newClicks[video.id] ? total + 1 : total),
      0
    );
    const newReactProgress = (totalReactClicks / reactVideos.length) * 100 || 0;
    const newVueProgress = (totalVueClicks / vueVideos.length) * 100 || 0;
    dispatch(setReactProgress(newReactProgress));
    dispatch(setVueProgress(newVueProgress));
  };

  let displayedVideos: Video[] = [];
  if (selectedCategory === '전체') {
    displayedVideos = videos;
  } else if (selectedCategory === '리액트') {
    displayedVideos = reactVideos;
  } else if (selectedCategory === 'vue') {
    displayedVideos = vueVideos;
  }

  return (
    <div className='bg-gray-100 text-black p-8'>
      <h2 className='text-2xl font-bold mb-4'>강의 카테고리</h2>
      <div className='mb-4 flex justify-center space-x-4'>
        <button
          className={`py-2 px-4 rounded-full transition duration-300 ${
            selectedCategory === '전체'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300'
          }`}
          onClick={() => handleCategoryClick('전체')}
        >
          전체 강의
        </button>
        <button
          className={`py-2 px-4 rounded-full transition duration-300 ${
            selectedCategory === '리액트'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300'
          }`}
          onClick={() => handleCategoryClick('리액트')}
        >
          리액트 강의
        </button>
        <button
          className={`py-2 px-4 rounded-full transition duration-300 ${
            selectedCategory === 'vue'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300'
          }`}
          onClick={() => handleCategoryClick('vue')}
        >
          뷰 강의
        </button>
      </div>

      <h2 className='text-2xl font-bold mb-4'>{selectedCategory} 강의</h2>
      <div className='grid gap-4'>
        {displayedVideos.map((video) => (
          <div
            key={video.id}
            className='bg-gray-900 rounded-lg overflow-hidden'
          >
            <h3
              onClick={() => handleVideoClick(video.id)}
              className='cursor-pointer text-blue-500 px-4 py-2 hover:text-blue-300'
            >
              {video.snippet.title}
            </h3>
            {selectedVideo === video.id && (
              <iframe
                width='100%'
                height='315'
                src={`https://www.youtube.com/embed/${video.id}`}
                allowFullScreen
                className='block mt-2'
              ></iframe>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
