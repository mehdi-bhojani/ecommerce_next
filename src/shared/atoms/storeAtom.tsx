// atoms/cartAtoms.js
import { CartItemType, StoreType} from '@/lib/types';
import { atom } from 'jotai';

// Atom to store cart items
export const storeAtom = atom<StoreType>();