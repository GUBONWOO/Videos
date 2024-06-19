import React, { useState, useEffect } from 'react';

interface Post {
  id: number;
  question: string;
  answer: string;
}

const initialPosts: Post[] = [
  {
    id: 1,
    question: '리액트란 무엇인가요?',
    answer: '',
  },
  {
    id: 2,
    question: 'Vue.js는 무엇인가요?',
    answer: '',
  },
  {
    id: 3,
    question: 'Angular는 무엇인가요?',
    answer: '',
  },
  {
    id: 4,
    question: 'Node.js는 무엇인가요?',
    answer: '',
  },
  {
    id: 5,
    question: 'Express.js는 무엇인가요?',
    answer: '',
  },
];

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newQuestion, setNewQuestion] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newAnswer, setNewAnswer] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(1);

  useEffect(() => {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const addQuestion = () => {
    const newPost: Post = {
      id: posts.length + 1,
      question: newQuestion,
      answer: '',
    };
    setPosts([...posts, newPost]);
    setNewQuestion('');
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setNewAnswer(post.answer);
  };

  const saveAnswer = () => {
    if (selectedPost) {
      const updatedPosts = posts.map((post) =>
        post.id === selectedPost.id ? { ...post, answer: newAnswer } : post
      );
      setPosts(updatedPosts);
      setSelectedPost(null);
      setNewAnswer('');
    }
  };

  const deletePost = (id: number) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  const deleteAnswer = (id: number) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, answer: '' } : post
    );
    setPosts(updatedPosts);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers = posts.length;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col items-center py-10 text-black'>
      <h2 className='text-2xl font-bold mb-4'>질문과 응답 게시물</h2>
      <div className='w-full max-w-2xl mb-4'>
        <input
          type='text'
          placeholder='질문을 입력하세요'
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded mb-2 text-black'
        />
        <button
          onClick={addQuestion}
          className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
        >
          질문 추가
        </button>
      </div>
      <div className='w-full max-w-2xl'>
        {currentPosts.map((post) => (
          <div
            key={post.id}
            className='bg-white p-4 rounded shadow mb-4 text-black'
          >
            <h3 className='text-lg font-semibold'>질문: {post.question}</h3>
            <p className='mb-2'>응답: {post.answer || '응답이 없습니다'}</p>
            <button
              onClick={() => handlePostClick(post)}
              className='bg-green-500 text-white py-1 px-3 rounded mr-2 hover:bg-green-600'
            >
              응답 입력
            </button>
            <button
              onClick={() => deletePost(post.id)}
              className='bg-red-500 text-white py-1 px-3 rounded mr-2 hover:bg-red-600'
            >
              질문 삭제
            </button>
            {post.answer && (
              <button
                onClick={() => deleteAnswer(post.id)}
                className='bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600'
              >
                응답 삭제
              </button>
            )}
          </div>
        ))}
      </div>
      {selectedPost && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded shadow-lg w-full max-w-lg text-black'>
            <h3 className='text-lg font-semibold mb-4'>
              {selectedPost.question}
            </h3>
            <textarea
              placeholder='응답을 입력하세요'
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded mb-4 text-black'
              rows={5}
            />
            <div className='flex justify-end'>
              <button
                onClick={saveAnswer}
                className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2'
              >
                응답 저장
              </button>
              <button
                onClick={() => setSelectedPost(null)}
                className='bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600'
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
      <div className='mt-4'>
        {Array.from({ length: pageNumbers }, (_, index) => index + 1).map(
          (number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`py-1 px-3 mx-1 rounded ${
                currentPage === number
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-black hover:bg-gray-400'
              }`}
            >
              {number}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Posts;
