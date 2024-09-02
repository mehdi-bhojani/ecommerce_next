// atoms/cartAtoms.js
import { CartItemType} from '@/lib/types';
import { atom } from 'jotai';

// Atom to store cart items
export const cartItemsAtom = atom<CartItemType[]>([]);

// Derived atom to calculate total price
// export const totalPriceAtom = atom((get) =>
//   get(cartItemsAtom).reduce((total, item) => total + item.price * item.quantity, 0)
// );
