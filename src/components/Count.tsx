'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const Count: React.FC = () => {
  const { progress, reactProgress, vueProgress, selectedCategory } =
    useSelector((state: RootState) => state.progress);

  const formatProgress = (value: number): string => {
    return `${Math.floor(value)}%`;
  };

  return (
    <div className='bg-gray-100 p-8'>
      <div className='progress-container mb-4'>
        <h3 className='text-lg font-medium text-gray-900'>
          전체 진행도: {formatProgress(progress)}
        </h3>
        <div className='progress-bar h-4 bg-gray-200 rounded-lg'>
          <div
            className='progress h-4 bg-blue-500 rounded-lg'
            style={{
              width: `${progress}%`,
              transition: 'width 0.3s ease-in-out',
            }}
          ></div>
        </div>
      </div>
      {selectedCategory !== 'vue' && (
        <div className='progress-container mb-4'>
          <h3 className='text-lg font-medium text-gray-900'>
            리액트 진행도: {formatProgress(reactProgress)}
          </h3>
          <div className='progress-bar h-4 bg-gray-200 rounded-lg'>
            <div
              className='progress h-4 bg-green-500 rounded-lg'
              style={{
                width: `${reactProgress}%`,
                transition: 'width 0.3s ease-in-out',
              }}
            ></div>
          </div>
        </div>
      )}
      {selectedCategory !== '리액트' && (
        <div className='progress-container mb-4'>
          <h3 className='text-lg font-medium text-gray-900'>
            뷰 진행도: {formatProgress(vueProgress)}
          </h3>
          <div className='progress-bar h-4 bg-gray-200 rounded-lg'>
            <div
              className='progress h-4 bg-purple-500 rounded-lg'
              style={{
                width: `${vueProgress}%`,
                transition: 'width 0.3s ease-in-out',
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Count;
