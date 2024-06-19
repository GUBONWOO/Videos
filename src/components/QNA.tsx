import React, { useState, useEffect } from 'react';

// 게시물 타입 정의
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
  const [postsPerPage] = useState<number>(1); // 각 질문당 1페이지씩

  // 로컬 스토리지에서 게시물 불러오기
  useEffect(() => {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  // 로컬 스토리지에 게시물 저장하기
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  // 새 질문 추가
  const addQuestion = () => {
    const newPost: Post = {
      id: posts.length + 1,
      question: newQuestion,
      answer: '',
    };
    setPosts([...posts, newPost]);
    setNewQuestion('');
  };

  // 질문 클릭 시 응답 입력 폼 표시
  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setNewAnswer(post.answer);
  };

  // 응답 저장
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

  // 질문 삭제
  const deletePost = (id: number) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  // 응답 삭제
  const deleteAnswer = (id: number) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, answer: '' } : post
    );
    setPosts(updatedPosts);
  };

  // 현재 페이지에 따라 보여줄 게시물 목록 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 번호 목록 계산
  const pageNumbers = posts.length; // 각 질문당 1페이지이므로 페이지 번호는 질문 수와 동일

  // 페이지 변경 함수
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>질문과 응답 게시물</h2>
      <div>
        <input
          type='text'
          placeholder='질문을 입력하세요'
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <button onClick={addQuestion}>질문 추가</button>
      </div>
      <div className='posts-list'>
        {currentPosts.map((post) => (
          <div key={post.id} className='post'>
            <h3>질문: {post.question}</h3>
            <p>응답: {post.answer || '응답이 없습니다'}</p>
            <button onClick={() => handlePostClick(post)}>응답 입력</button>
            <button onClick={() => deletePost(post.id)}>질문 삭제</button>
            {post.answer && (
              <button onClick={() => deleteAnswer(post.id)}>응답 삭제</button>
            )}
          </div>
        ))}
      </div>
      {selectedPost && (
        <div className='answer-form'>
          <h3>{selectedPost.question}</h3>
          <textarea
            placeholder='응답을 입력하세요'
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
          <button onClick={saveAnswer}>응답 저장</button>
        </div>
      )}
      <div>
        {Array.from({ length: pageNumbers }, (_, index) => index + 1).map(
          (number) => (
            <button key={number} onClick={() => paginate(number)}>
              {number}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Posts;
