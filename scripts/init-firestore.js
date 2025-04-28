// This script helps initialize Firestore for the Cool Member Management app
// Run with: node scripts/init-firestore.js

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXj8Z_6zK63HzbT2zhmdEoO3rYwq7ZwLg",
  authDomain: "cool-7955f.firebaseapp.com",
  projectId: "cool-7955f",
  storageBucket: "cool-7955f.appspot.com",
  messagingSenderId: "352883500489",
  appId: "1:352883500489:web:3276b4d4cf50172527b418",
  measurementId: "G-7E7ERF9MNZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkFirestoreConnection() {
  console.log('Checking Firestore connection...');
  
  try {
    // Try to access the members collection
    const membersRef = collection(db, 'members');
    const snapshot = await getDocs(membersRef);
    
    console.log('Successfully connected to Firestore!');
    console.log(`Found ${snapshot.size} documents in the members collection.`);
    
    // List all documents (if any)
    if (snapshot.size > 0) {
      console.log('\nExisting members:');
      snapshot.forEach(doc => {
        console.log(`- ${doc.id}: ${JSON.stringify(doc.data())}`);
      });
    }
    
    console.log('\nFirestore is properly configured and accessible.');
    console.log('You can now use the Cool Member Management app.');
  } catch (error) {
    console.error('Error connecting to Firestore:', error);
    console.log('\nPossible issues:');
    console.log('1. The Firebase project may not exist or has been deleted');
    console.log('2. Firestore database has not been created in the Firebase console');
    console.log('3. Firestore security rules may be preventing access');
    console.log('4. The Firebase configuration may be incorrect');
    
    console.log('\nTo fix:');
    console.log('1. Go to https://console.firebase.google.com/');
    console.log('2. Select or create the project "cool-7955f"');
    console.log('3. Go to Firestore Database and click "Create database"');
    console.log('4. Start in test mode or set up appropriate security rules');
    console.log('5. Verify the Firebase configuration in src/services/firebase.ts');
  }
}

checkFirestoreConnection();
