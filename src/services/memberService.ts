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
  getDoc
} from 'firebase/firestore';
import { db } from './firebase';
import { Member } from '../types';

const COLLECTION_NAME = 'members';

export const addMember = async (userId: string, memberData: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const timestamp = Date.now();
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...memberData,
      userId,
      createdAt: timestamp,
      updatedAt: timestamp
    });
    
    return {
      id: docRef.id,
      ...memberData,
      createdAt: timestamp,
      updatedAt: timestamp
    };
  } catch (error) {
    console.error('Error adding member:', error);
    throw error;
  }
};

export const updateMember = async (memberId: string, memberData: Partial<Omit<Member, 'id' | 'createdAt' | 'updatedAt'>>) => {
  try {
    const memberRef = doc(db, COLLECTION_NAME, memberId);
    const timestamp = Date.now();
    
    await updateDoc(memberRef, {
      ...memberData,
      updatedAt: timestamp
    });
    
    // Get the updated document
    const updatedDoc = await getDoc(memberRef);
    return { id: updatedDoc.id, ...updatedDoc.data() } as Member;
  } catch (error) {
    console.error('Error updating member:', error);
    throw error;
  }
};

export const deleteMember = async (memberId: string) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, memberId));
    return true;
  } catch (error) {
    console.error('Error deleting member:', error);
    throw error;
  }
};

export const getMemberById = async (memberId: string) => {
  try {
    const memberDoc = await getDoc(doc(db, COLLECTION_NAME, memberId));
    
    if (!memberDoc.exists()) {
      throw new Error('Member not found');
    }
    
    return { id: memberDoc.id, ...memberDoc.data() } as Member;
  } catch (error) {
    console.error('Error getting member:', error);
    throw error;
  }
};

export const getAllMembers = async (userId: string) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const members: Member[] = [];
    
    querySnapshot.forEach((doc) => {
      members.push({ id: doc.id, ...doc.data() } as Member);
    });
    
    return members;
  } catch (error) {
    console.error('Error getting members:', error);
    throw error;
  }
};

export const searchMembers = async (userId: string, searchTerm: string) => {
  try {
    // Get all members for the user
    const members = await getAllMembers(userId);
    
    // Filter members by name (case insensitive)
    return members.filter(member => 
      member.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching members:', error);
    throw error;
  }
};
