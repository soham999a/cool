import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, db } from '../services/firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

// Define types
export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role?: string;
  createdAt?: Date;
  lastLogin?: Date;
}

interface AuthContextType {
  user: User | null;
  status: AuthStatus;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  // Function to get additional user data from Firestore
  const getUserData = async (firebaseUser: FirebaseUser) => {
    try {
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        return {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          role: userData.role || 'member',
          createdAt: userData.createdAt?.toDate() || new Date(),
          lastLogin: userData.lastLogin?.toDate() || new Date()
        };
      } else {
        // If user document doesn't exist, return basic user info
        return {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          role: 'member'
        };
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      // Return basic user info if there's an error
      return {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL
      };
    }
  };

  // Update user's last login time
  const updateLastLogin = async (uid: string) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      await setDoc(userDocRef, { lastLogin: serverTimestamp() }, { merge: true });
    } catch (err) {
      console.error('Error updating last login:', err);
    }
  };

  useEffect(() => {
    // Check if we have a mock user in localStorage for development
    const mockUser = localStorage.getItem('mockUser');
    if (mockUser) {
      try {
        const parsedUser = JSON.parse(mockUser);
        setUser(parsedUser);
        setStatus('authenticated');
        console.log('Using mock user for development:', parsedUser);
        return;
      } catch (err) {
        console.error('Error parsing mock user:', err);
        localStorage.removeItem('mockUser');
      }
    }

    // If no mock user, use Firebase auth
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get additional user data from Firestore
        const userData = await getUserData(firebaseUser);
        setUser(userData);
        setStatus('authenticated');

        // Update last login time
        await updateLastLogin(firebaseUser.uid);
      } else {
        setUser(null);
        setStatus('unauthenticated');
      }
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update the user profile with the display name
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
      }

      // Create a user document in Firestore
      const userDocRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userDocRef, {
        email: email,
        displayName: name,
        role: 'member',
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      });

      // Update the user state with the display name
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: name,
        photoURL: userCredential.user.photoURL,
        role: 'member',
        createdAt: new Date(),
        lastLogin: new Date()
      });
    } catch (err) {
      setError((err as Error).message);
      throw err;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);

      // For development: create a mock user if email contains "test" or "demo"
      if (email.includes('test') || email.includes('demo')) {
        console.log('Creating mock user for development');
        const mockUser = {
          uid: 'mock-uid-123',
          email: email,
          displayName: email.split('@')[0],
          photoURL: null,
          role: 'admin',
          createdAt: new Date(),
          lastLogin: new Date()
        };

        // Store in localStorage for persistence
        localStorage.setItem('mockUser', JSON.stringify(mockUser));

        // Update state
        setUser(mockUser);
        setStatus('authenticated');
        return;
      }

      // Regular Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Update last login time
      await updateLastLogin(userCredential.user.uid);

      // Get additional user data
      const userData = await getUserData(userCredential.user);
      setUser(userData);
    } catch (err) {
      setError((err as Error).message);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      setError(null);

      // Check if we're using a mock user
      if (localStorage.getItem('mockUser')) {
        console.log('Signing out mock user');
        localStorage.removeItem('mockUser');
        setUser(null);
        setStatus('unauthenticated');
        return;
      }

      // Regular Firebase sign out
      await firebaseSignOut(auth);
    } catch (err) {
      setError((err as Error).message);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, status, signUp, signIn, signOut, error, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
