import React, { useState, useEffect } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

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
  const postsPerPage: number = 3; // 한 페이지에 보여줄 질문 수를 1로 설정

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

  // 현재 페이지의 질문들을 가져오기
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지네이션 관련 함수들
  const pageNumbers = Math.ceil(posts.length / postsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < pageNumbers) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='container mt-5'>
      <h2 className='text-center mb-4 text-4xl text-black'>
        질문과 응답 게시물
      </h2>

      <div className='row mb-4'>
        <div className='col-md-8'>
          <input
            type='text'
            placeholder='질문을 입력하세요'
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className='form-control mb-2'
          />
        </div>
        <div className='col-md-4'>
          <button onClick={addQuestion} className='btn btn-primary w-100'>
            질문 추가
          </button>
        </div>
      </div>
      {currentPosts.map((post) => (
        <div key={post.id} className='row mb-4'>
          <div className='col'>
            <div className='card'>
              <div className='card-body'>
                <h3 className='card-title mb-3'>질문: {post.question}</h3>
                <p className='card-text mb-2'>
                  응답: {post.answer || '응답이 없습니다'}
                </p>
                <button
                  onClick={() => handlePostClick(post)}
                  className='btn btn-success me-2'
                >
                  응답 입력
                </button>
                <button
                  onClick={() => deletePost(post.id)}
                  className='btn btn-danger me-2'
                >
                  질문 삭제
                </button>
                {post.answer && (
                  <button
                    onClick={() => deleteAnswer(post.id)}
                    className='btn btn-warning'
                  >
                    응답 삭제
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      {selectedPost && (
        <div className='modal d-block'>
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>{selectedPost.question}</h5>
                <button
                  type='button'
                  className='btn-close'
                  onClick={() => setSelectedPost(null)}
                ></button>
              </div>
              <div className='modal-body'>
                <textarea
                  placeholder='응답을 입력하세요'
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  className='form-control mb-3'
                  rows={5}
                />
                <button onClick={saveAnswer} className='btn btn-primary me-2'>
                  응답 저장
                </button>
                <button
                  onClick={() => setSelectedPost(null)}
                  className='btn btn-secondary'
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 페이지네이션 컨트롤 고정 위치 */}
      <div className='pagination-container fixed bottom-24 left-0 right-0 flex justify-center items-center'>
        <button
          onClick={prevPage}
          className={`btn btn-outline-secondary me-2 ${
            currentPage === 1 && 'disabled'
          }`}
        >
          <BsChevronLeft />
        </button>
        {Array.from({ length: pageNumbers }, (_, index) => index + 1).map(
          (number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`btn ${
                currentPage === number ? 'btn-primary' : 'btn-outline-primary'
              } me-2`}
            >
              {number}
            </button>
          )
        )}
        <button
          onClick={nextPage}
          className={`btn btn-outline-secondary ${
            currentPage === pageNumbers && 'disabled'
          }`}
        >
          <BsChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Posts;
