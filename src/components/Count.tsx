'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
const Count: React.FC = () => {
  const { progress, reactProgress, vueProgress, selectedCategory } =
    useSelector((state: RootState) => state.progress);

  return (
    <>
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
      {selectedCategory !== 'vue' && (
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
    </>
  );
};

export default Count;
