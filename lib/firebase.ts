'use client';

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAS8t9wdXbJW9_k9jNRyD1Xz951O7KwdUE",
  authDomain: "sakhi-5b437.firebaseapp.com",
  projectId: "sakhi-5b437",
  storageBucket: "sakhi-5b437.appspot.com",
  messagingSenderId: "216337126087",
  appId: "1:216337126087:web:2e47b1dfe7c23d6d3ca4e2",
  measurementId: "G-40H1VQXP2B"
};

// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth with persistence
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Auth persistence error:", error);
  });

export default app; 