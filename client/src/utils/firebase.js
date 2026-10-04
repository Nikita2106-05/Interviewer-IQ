
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiq-8463c.firebaseapp.com",
  projectId: "interviewiq-8463c",
  storageBucket: "interviewiq-8463c.firebasestorage.app",
  messagingSenderId: "1023579505430",
  appId: "1:1023579505430:web:1d57be6ca87a47a3504637"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };