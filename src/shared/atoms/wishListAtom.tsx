// atoms/cartAtoms.js
import { WishItemType} from '@/lib/types';
import { atom } from 'jotai';

// Atom to store cart items
export const wishListItemsAtom = atom<WishItemType[]>([]);
