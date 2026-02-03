import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "weatherman-37c86.firebaseapp.com",
  projectId: "weatherman-37c86",
  storageBucket: "weatherman-37c86.firebasestorage.app",
  messagingSenderId: "619059182964",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: "G-BXTC2WHHP0"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
