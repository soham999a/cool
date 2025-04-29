// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  // Enable Firestore database
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser environment)
let analytics = null;
try {
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
} catch (error) {
  console.error("Analytics initialization error:", error);
}
export { analytics };

// Initialize Authentication
export const auth = getAuth(app);

// Initialize Firestore with settings for better error handling
export const db = getFirestore(app);

// Log Firestore initialization
console.log('Firestore initialized with project ID:', firebaseConfig.projectId);

// Define types for our local database
interface LocalDbCollection {
  [id: string]: any;
}

interface LocalDb {
  collections: {
    [collectionName: string]: LocalDbCollection;
  };
  getCollection: (name: string) => LocalDbCollection;
  saveCollection: (name: string) => void;
}

// Extend Window interface to include our localDb property
declare global {
  interface Window {
    localDb?: LocalDb;
  }
}

// Use local storage as a fallback when Firebase is not available
const useLocalStorageFallback = () => {
  console.log('Using localStorage fallback for data storage');

  // Create a simple localStorage-based API that mimics Firestore
  window.localDb = {
    collections: {},
    getCollection: (name: string) => {
      if (!window.localDb?.collections[name]) {
        const savedData = localStorage.getItem(`localDb_${name}`);
        if (window.localDb) {
          window.localDb.collections[name] = savedData ? JSON.parse(savedData) : {};
        }
      }
      return window.localDb?.collections[name] || {};
    },
    saveCollection: (name: string) => {
      if (window.localDb) {
        localStorage.setItem(`localDb_${name}`, JSON.stringify(window.localDb.collections[name]));
      }
    }
  };
};

// Check if Firestore is accessible, otherwise use localStorage
try {
  const testCollection = collection(db, 'test_connection');
  getDocs(testCollection).catch((error: any) => {
    console.error('Firestore connection error, using localStorage fallback:', error);
    useLocalStorageFallback();
  });
} catch (error) {
  console.error('Firestore initialization error, using localStorage fallback:', error);
  useLocalStorageFallback();
}

// Enable Firestore offline persistence if needed
// This helps with offline capabilities and can improve performance
try {
  // Modern approach to enable persistence - already enabled by default in newer Firebase versions
  // Just log that we're using the default persistence
  console.log('Using default Firestore persistence settings');
} catch (error) {
  console.warn('Firestore persistence configuration error:', error);
}

export default app;
