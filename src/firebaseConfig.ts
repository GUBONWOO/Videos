// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDgxGD1TTZiroUHb68NcYuS8tfoE7VfkrE',
  authDomain: 'kooo-10219.firebaseapp.com',
  projectId: 'kooo-10219',
  storageBucket: 'kooo-10219.appspot.com',
  messagingSenderId: '922780130638',
  appId: '1:922780130638:web:bd136300bc726bcc8c121f',
  measurementId: 'G-0J5D6L8ZW2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, analytics, auth, provider };
