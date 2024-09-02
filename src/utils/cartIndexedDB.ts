import { openDB } from 'idb';

const DB_NAME = 'dfk_collection_store';
const STORE_NAME = 'UserCart';
// Initialize the IndexedDB database
const initDB = async () => {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'userId' }); // Set 'userId' as the keyPath
            }
        },
    });
};

// Function to replace the cart in IndexedDB
export const saveCartToIndexedDB = async (userId: string, cartItems: any[]) => {
    const db = await initDB();

    // Replace the entire cart data for the user
    await db.put(STORE_NAME, { userId, cartItems });
};

// Function to load the cart from IndexedDB
export const loadCartFromIndexedDB = async (userId: string) => {
    const db = await initDB();
    const userCart = await db.get(STORE_NAME, userId);
    return userCart?.cartItems || [];
};