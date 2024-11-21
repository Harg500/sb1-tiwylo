import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBUbI9cJiFl2I8ldW6SRDZWp0qGAJxsYfU",
  authDomain: "dubai-expense-tracker.firebaseapp.com",
  projectId: "dubai-expense-tracker",
  storageBucket: "dubai-expense-tracker.firebasestorage.app",
  messagingSenderId: "94145411334",
  appId: "1:94145411334:web:c00d2fea494f2620588687",
  measurementId: "G-VW4740LY8K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);