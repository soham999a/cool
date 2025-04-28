import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import MemberList from '../components/member/MemberList';
import FirebaseTest from '../components/FirebaseTest';
import { useAuth } from '../context/AuthContext';
import { Member } from '../types';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../services/firebase';
import * as localStorageService from '../services/localStorageService';

const COLLECTION_NAME = 'members';

const MembersPage = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMembers = async () => {
      if (!user) {
        console.log('No user logged in, skipping member fetch');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        console.log('Fetching members for user:', user.uid);

        try {
          // Try Firestore first
          console.log('Using Firestore collection:', COLLECTION_NAME);

          // Create a query to get members for the current user
          const membersCollection = collection(db, COLLECTION_NAME);
          console.log('Collection reference created');

          // Using only the where clause to avoid index requirements
          // We'll sort the results in memory after fetching
          const q = query(
            membersCollection,
            where('userId', '==', user.uid)
            // Removed orderBy to avoid requiring composite index
          );
          console.log('Query created');

          // Execute the query
          console.log('Executing query...');
          const querySnapshot = await getDocs(q);
          console.log('Query executed, documents found:', querySnapshot.size);

          const fetchedMembers: Member[] = [];

          // Process the results
          querySnapshot.forEach((doc) => {
            console.log('Processing document:', doc.id);
            const data = doc.data();

            // Handle potential missing or malformed timestamp fields
            let createdAt = Date.now();
            let updatedAt = Date.now();

            if (data.createdAt instanceof Timestamp) {
              createdAt = data.createdAt.toMillis();
            }

            if (data.updatedAt instanceof Timestamp) {
              updatedAt = data.updatedAt.toMillis();
            }

            fetchedMembers.push({
              id: doc.id,
              name: data.name,
              phoneNumber: data.phoneNumber,
              address: data.address,
              memberId: data.memberId,
              bloodGroup: data.bloodGroup,
              createdAt: createdAt,
              updatedAt: updatedAt
            });
          });

          // Sort the members by createdAt in descending order (newest first)
          // This replaces the orderBy in the Firestore query
          fetchedMembers.sort((a, b) => b.createdAt - a.createdAt);

          console.log('Fetched members from Firestore:', fetchedMembers.length);
          setMembers(fetchedMembers);
        } catch (firestoreError) {
          console.error('Firestore error, falling back to localStorage:', firestoreError);

          // Fallback to localStorage
          const localMembers = localStorageService.getMembers(user.uid);
          console.log('Fetched members from localStorage:', localMembers.length);
          setMembers(localMembers);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(`Failed to load members: ${errorMessage}`);
        console.error('Error fetching members:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, [user]);

  const handleAddMember = async (data: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!user) {
      setError('You must be logged in to add members.');
      return;
    }

    try {
      setError(null);
      console.log('Adding member with data:', data);
      console.log('Current user ID:', user.uid);

      let newMember: Member;

      // Try to use Firestore first
      try {
        // Prepare the member data
        const memberData = {
          ...data,
          userId: user.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };

        console.log('Prepared member data:', memberData);
        console.log('Firestore collection:', COLLECTION_NAME);

        // Add document to Firestore
        const docRef = await addDoc(collection(db, COLLECTION_NAME), memberData);
        console.log('Document added with ID:', docRef.id);

        // Create the new member object
        const timestamp = Date.now();
        newMember = {
          id: docRef.id,
          ...data,
          createdAt: timestamp,
          updatedAt: timestamp
        };
      } catch (firestoreError) {
        console.error('Firestore error, falling back to localStorage:', firestoreError);

        // Fallback to localStorage
        newMember = localStorageService.addMember(user.uid, data);
        console.log('Member added to localStorage with ID:', newMember.id);
      }

      // Update state
      setMembers(prev => [newMember, ...prev]);

      return newMember;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`Failed to add member: ${errorMessage}`);
      console.error('Error adding member:', err);
    }
  };

  const handleUpdateMember = async (id: string, data: Partial<Omit<Member, 'id' | 'createdAt' | 'updatedAt'>>) => {
    try {
      setError(null);
      console.log('Updating member with ID:', id, 'and data:', data);

      let updatedMember: Member | undefined;

      // Try to use Firestore first
      try {
        // Update document in Firestore
        const memberRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(memberRef, {
          ...data,
          updatedAt: serverTimestamp()
        });
        console.log('Member updated in Firestore');

        // Create updated member object
        const timestamp = Date.now();
        const existingMember = members.find(member => member.id === id);

        if (existingMember) {
          updatedMember = {
            ...existingMember,
            ...data,
            updatedAt: timestamp
          };
        }
      } catch (firestoreError) {
        console.error('Firestore error, falling back to localStorage:', firestoreError);

        // Fallback to localStorage
        try {
          updatedMember = localStorageService.updateMember(id, data);
          console.log('Member updated in localStorage');
        } catch (localStorageError) {
          console.error('Error updating member in localStorage:', localStorageError);
          throw localStorageError;
        }
      }

      // Update state if we have an updated member
      if (updatedMember) {
        const updatedMembers = members.map(member => {
          if (member.id === id) {
            return updatedMember as Member;
          }
          return member;
        });

        setMembers(updatedMembers);
        return updatedMember;
      } else {
        throw new Error(`Member with ID ${id} not found`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`Failed to update member: ${errorMessage}`);
      console.error('Error updating member:', err);
    }
  };

  const handleDeleteMember = async (id: string) => {
    try {
      setError(null);
      console.log('Deleting member with ID:', id);

      // Try to use Firestore first
      try {
        // Delete document from Firestore
        await deleteDoc(doc(db, COLLECTION_NAME, id));
        console.log('Member deleted from Firestore');
      } catch (firestoreError) {
        console.error('Firestore error, falling back to localStorage:', firestoreError);

        // Fallback to localStorage
        try {
          localStorageService.deleteMember(id);
          console.log('Member deleted from localStorage');
        } catch (localStorageError) {
          console.error('Error deleting member from localStorage:', localStorageError);
          throw localStorageError;
        }
      }

      // Update state
      setMembers(prev => prev.filter(member => member.id !== id));

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`Failed to delete member: ${errorMessage}`);
      console.error('Error deleting member:', err);
    }
  };

  return (
    <Layout>
      {/* Firebase connection test component */}
      <FirebaseTest />

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      )}

      <MemberList
        members={members}
        onAddMember={handleAddMember}
        onUpdateMember={handleUpdateMember}
        onDeleteMember={handleDeleteMember}
        isLoading={isLoading}
      />
    </Layout>
  );
};

export default MembersPage;
