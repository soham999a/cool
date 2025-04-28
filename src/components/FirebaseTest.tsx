import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';

const FirebaseTest = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'fallback'>('loading');
  const [message, setMessage] = useState('Testing Firebase connection...');

  useEffect(() => {
    const testFirebase = async () => {
      try {
        console.log('Testing Firebase connection...');

        // Check if we're using the localStorage fallback
        if (window.localDb) {
          setStatus('fallback');
          setMessage('Using localStorage fallback for data storage. Your data will be saved locally in your browser.');
          return;
        }

        // Try to access any collection to test connectivity
        const testCollection = collection(db, 'test_connection');
        await getDocs(testCollection);

        setStatus('success');
        setMessage('Firebase connection successful! Firestore is accessible and your data will be saved to the cloud.');
      } catch (error) {
        console.error('Firebase connection error:', error);

        // Check if we're using the localStorage fallback after the error
        if (window.localDb) {
          setStatus('fallback');
          setMessage('Using localStorage fallback for data storage. Your data will be saved locally in your browser.');
        } else {
          setStatus('error');

          // Provide more detailed error information
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          setMessage(`Firebase connection failed: ${errorMessage}`);
        }
      }
    };

    testFirebase();
  }, []);

  return (
    <div className="p-4 mb-4 rounded-md" style={{
      backgroundColor: status === 'loading' ? '#f0f9ff' :
                       status === 'success' ? '#f0fdf4' :
                       status === 'fallback' ? '#fef9c3' :
                       '#fef2f2',
      borderLeft: `4px solid ${
        status === 'loading' ? '#3b82f6' :
        status === 'success' ? '#22c55e' :
        status === 'fallback' ? '#eab308' :
        '#ef4444'
      }`
    }}>
      <h3 className="text-lg font-medium mb-2">Storage Status</h3>
      <p>{message}</p>

      {status === 'fallback' && (
        <div className="mt-4">
          <h4 className="font-medium">Using Local Storage Mode</h4>
          <p className="mt-2">Your data is being saved to your browser's local storage. This means:</p>
          <ul className="list-disc ml-5 mt-2">
            <li>Data will only be available on this device and browser</li>
            <li>Clearing browser data will delete your saved members</li>
            <li>Data will not sync across devices</li>
          </ul>
          <p className="mt-2">To use cloud storage instead, please check the Firebase configuration.</p>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-4">
          <h4 className="font-medium">Troubleshooting Steps:</h4>
          <ol className="list-decimal ml-5 mt-2">
            <li>Verify that the Firebase project exists in the Firebase console</li>
            <li>Make sure Firestore Database is enabled in the Firebase console</li>
            <li>Check that the Firebase configuration in <code>src/services/firebase.ts</code> is correct</li>
            <li>Ensure that Firestore security rules allow the current operation</li>
            <li>Check your network connection</li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default FirebaseTest;
