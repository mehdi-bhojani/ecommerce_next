// atoms/cartAtoms.js
import { CustomerType } from '@/lib/types';
import { atom } from 'jotai';

// Atom to store cart items
export const customerDataAtom = atom<CustomerType>();