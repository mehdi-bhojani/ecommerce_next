"use client";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { cartItemsAtom } from "../atoms/cartAtom";
import { CartItemType } from "@/lib/types";
import { generateId } from "../helpers/idGenerator";
import { useSession } from "next-auth/react";
import {
  loadCartFromIndexedDB,
  saveCartToIndexedDB,
} from "@/utils/cartIndexedDB";

const useCart = () => {
  const [cartItems, setCartItems] = useAtom(cartItemsAtom);
  const { data: session } = useSession();

  useEffect(() => {
    // Load cart items from IndexedDB when the component mounts or when session changes
    const loadCart = async () => {
      if (session?.user?._id) {
        const userCart = await loadCartFromIndexedDB(session.user._id);
        setCartItems(userCart);
      }
    };
    loadCart();
  }, [session?.user?._id, setCartItems]);

  // Helper function to save the cart to IndexedDB
  const saveCart = async (updatedCart: any[]) => {
    if (session?.user?._id) {
      await saveCartToIndexedDB(session.user._id, updatedCart);
    }
  };

  // Add item to the cart
  const addToCart = async (item: CartItemType) => {
    setCartItems((prev) => {
      const isItemExist = prev.some(
        (i) => i.productId === item.productId && i.variantId === item.variantId
      );

      let updatedCart;
      if (isItemExist) {
        updatedCart = prev.map((i) =>
          i.productId === item.productId && i.variantId === item.variantId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        updatedCart = [...prev, { ...item, _id: generateId(), quantity: 1 }];
      }

      saveCart(updatedCart); // Save updated cart to IndexedDB
      return updatedCart;
    });
  };

  // Remove item from the cart
  const removeFromCart = async (_id: string) => {
    setCartItems((prev) => {
      const updatedCart = prev.filter((item) => item._id !== _id);
      saveCart(updatedCart); // Save updated cart to IndexedDB
      return updatedCart;
    });
  };

  // Update item quantity in the cart
  const updateQuantity = async (_id: string, newQty: number) => {
    setCartItems((prev) => {
      const updatedCart = prev.map((item) =>
        item._id === _id ? { ...item, quantity: newQty } : item
      );
      saveCart(updatedCart); // Save updated cart to IndexedDB
      return updatedCart;
    });
  };

  // Update item size in the cart
  const updateSize = async (_id: string, newVariantId: string, Qty: number) => {
    setCartItems((prev) => {
      let itemExists = false;
      const updatedCartItems = prev.map((item) => {
        if (item.variantId === newVariantId) {
          itemExists = true;
          return { ...item, quantity: item.quantity + Qty };
        } else if (item._id === _id) {
          return { ...item, variantId: newVariantId };
        }
        return item;
      });

      const finalCart = itemExists
        ? updatedCartItems.filter((item) => item._id !== _id)
        : updatedCartItems;

      saveCart(finalCart); // Save updated cart to IndexedDB
      return finalCart;
    });
  };

  // Clear the entire cart
  const clearCart = async () => {
    setCartItems([]);
    if (session?.user?._id) {
      await saveCartToIndexedDB(session.user._id, []); // Clear cart in IndexedDB
    }
  };

  const getTotalPrice = () => {
    let total = 0;
    cartItems.map((item) => {
      let subTotal = item.price * item.quantity;
      total = total + subTotal;
    });
    return total;
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    updateSize,
  };
};

export default useCart;
