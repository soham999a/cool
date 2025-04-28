export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface Member {
  id: string;
  name: string;
  phoneNumber: string;
  address: string;
  memberId: string;
  bloodGroup: string;
  createdAt: number;
  updatedAt: number;
}

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';
