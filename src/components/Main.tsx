'use client';
import { auth } from '../firebaseConfig';

const Main: React.FC = () => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div
      className='flex flex-col items-center justify-start bg-gray-100'
      style={{ height: '40vh' }}
    >
      <div className='max-w-md w-full p-8 mt-8 bg-white shadow-lg rounded-lg'>
        <div className='flex items-center justify-center mb-6'>
          <img
            src={auth.currentUser?.photoURL || ''}
            alt='User Avatar'
            className='w-16 h-16 rounded-full mr-4'
          />
          <span className='text-xl font-semibold text-gray-900'>
            {auth.currentUser?.displayName || 'User'}
          </span>
        </div>
        <button
          className='w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none'
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Main;
