import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDgxGD1TTZiroUHb68NcYuS8tfoE7VfkrE',
  authDomain: 'kooo-10219.firebaseapp.com',
  projectId: 'kooo-10219',
  storageBucket: 'kooo-10219.appspot.com',
  messagingSenderId: '922780130638',
  appId: '1:922780130638:web:bd136300bc726bcc8c121f',
  measurementId: 'G-0J5D6L8ZW2',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider };
