'use client';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebaseConfig';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const handleLoginClick = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      onLogin();
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='max-w-md w-full p-8 bg-white shadow-lg rounded-lg'>
        <h1 className='text-3xl font-bold text-center mb-6 text-gray-900'>
          Login Page
        </h1>
        <button
          className='w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded focus:outline-none transition duration-300'
          onClick={handleLoginClick}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
