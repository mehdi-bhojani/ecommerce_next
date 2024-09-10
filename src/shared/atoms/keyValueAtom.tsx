// atoms/cartAtoms.js
import { CartItemType} from '@/lib/types';
import { StateMap } from '@/types/types';
import { atom } from 'jotai';

// Atom to store cart items
export const keyValuePair = atom<StateMap>(new Map());

// Derived atom to calculate total price
// export const totalPriceAtom = atom((get) =>
//   get(cartItemsAtom).reduce((total, item) => total + item.price * item.quantity, 0)
// );
