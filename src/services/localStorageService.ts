import { Member } from '../types';

// Collection name for members
const MEMBERS_COLLECTION = 'members';

// Generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Get all members for a user
export const getMembers = (userId: string): Member[] => {
  try {
    // Get the collection
    const collection = window.localDb?.getCollection(MEMBERS_COLLECTION) || {};
    
    // Filter members by userId and convert to array
    return Object.values(collection)
      .filter(member => member.userId === userId)
      .sort((a, b) => b.createdAt - a.createdAt);
  } catch (error) {
    console.error('Error getting members from localStorage:', error);
    return [];
  }
};

// Add a new member
export const addMember = (
  userId: string, 
  data: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>
): Member => {
  try {
    // Generate a unique ID
    const id = generateId();
    
    // Create timestamp
    const timestamp = Date.now();
    
    // Create the member object
    const member: Member = {
      id,
      ...data,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    
    // Get the collection
    const collection = window.localDb?.getCollection(MEMBERS_COLLECTION) || {};
    
    // Add the member to the collection
    if (window.localDb) {
      window.localDb.collections[MEMBERS_COLLECTION] = {
        ...collection,
        [id]: { ...member, userId }
      };
      
      // Save the collection
      window.localDb.saveCollection(MEMBERS_COLLECTION);
    }
    
    return member;
  } catch (error) {
    console.error('Error adding member to localStorage:', error);
    throw new Error('Failed to add member to localStorage');
  }
};

// Update a member
export const updateMember = (
  id: string, 
  data: Partial<Omit<Member, 'id' | 'createdAt' | 'updatedAt'>>
): Member => {
  try {
    // Get the collection
    const collection = window.localDb?.getCollection(MEMBERS_COLLECTION) || {};
    
    // Check if the member exists
    if (!collection[id]) {
      throw new Error(`Member with ID ${id} not found`);
    }
    
    // Update timestamp
    const timestamp = Date.now();
    
    // Update the member
    const updatedMember = {
      ...collection[id],
      ...data,
      updatedAt: timestamp
    };
    
    // Save the updated member
    if (window.localDb) {
      window.localDb.collections[MEMBERS_COLLECTION] = {
        ...collection,
        [id]: updatedMember
      };
      
      // Save the collection
      window.localDb.saveCollection(MEMBERS_COLLECTION);
    }
    
    return updatedMember;
  } catch (error) {
    console.error('Error updating member in localStorage:', error);
    throw new Error('Failed to update member in localStorage');
  }
};

// Delete a member
export const deleteMember = (id: string): boolean => {
  try {
    // Get the collection
    const collection = window.localDb?.getCollection(MEMBERS_COLLECTION) || {};
    
    // Check if the member exists
    if (!collection[id]) {
      throw new Error(`Member with ID ${id} not found`);
    }
    
    // Create a new collection without the member
    const newCollection = { ...collection };
    delete newCollection[id];
    
    // Save the new collection
    if (window.localDb) {
      window.localDb.collections[MEMBERS_COLLECTION] = newCollection;
      window.localDb.saveCollection(MEMBERS_COLLECTION);
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting member from localStorage:', error);
    throw new Error('Failed to delete member from localStorage');
  }
};
