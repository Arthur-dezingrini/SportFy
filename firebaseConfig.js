import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: '338544135511',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'BF6BIwy9NxuuUqBzLMKJCkQ52IcbMB09ep5Tjg2Xqlh7zgxvpSaZZCjN5wBgEdBUg0XaEYlXb2ucfODWVQ8J0GY',
  appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
