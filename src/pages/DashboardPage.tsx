import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Dashboard from '../features/dashboard/Dashboard';
import { useAuth } from '../context/AuthContext';
import { Member } from '../types';
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp
} from 'firebase/firestore';
import { db } from '../services/firebase';
import * as localStorageService from '../services/localStorageService';

const COLLECTION_NAME = 'members';

const DashboardPage = () => {
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

  return (
    <Layout>
      {error && (
        <div className="alert alert-danger mb-4">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      )}

      <div className="mb-4">
        <div className="d-flex align-items-center mb-4">
          <div className="me-3 rounded-circle bg-primary d-flex align-items-center justify-content-center"
               style={{ width: '48px', height: '48px' }}>
            <i className="bi bi-speedometer2 text-white fs-4"></i>
          </div>
          <div>
            <h1 className="fw-bold mb-0">
              <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-muted mb-0">Overview of your organization</p>
          </div>
        </div>

        <Dashboard members={members} isLoading={isLoading} />
      </div>
    </Layout>
  );
};

export default DashboardPage;
