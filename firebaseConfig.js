import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAzNHheMjKWczXCqDIq85Q6jyQN-RIYMD0",
  authDomain: "sportfy-e99fe.firebaseapp.com",
  projectId: "sportfy-e99fe",
  storageBucket: "sportfy-e99fe.appspot.com",
  messagingSenderId: "338544135511",
  appId: "1:338544135511:web:4cc602200e8b7e31490212",
  measurementId: "G-YP5L7E2WVV"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage }; 
