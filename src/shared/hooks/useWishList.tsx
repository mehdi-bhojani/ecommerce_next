"use client";

import { useAtom } from "jotai";
import { useEffect } from "react";
import { CartItemType, WishItemType } from "@/lib/types";
import { useSession } from "next-auth/react";
import { wishListItemsAtom } from "../atoms/wishListAtom";

const useWishList = () => {
  const [wishlistItems, setWishlistItems] = useAtom(wishListItemsAtom);
  const { data: session } = useSession();
  useEffect(() => {
    // Load wishlist items from the API when the component mounts or when the session changes
    const loadWishlist = async () => {
      if (session?.user?._id) {
        try {
          const response = await fetch(
            `/api/customer/wishlist/${session.user._id}`
          );

          // Check if the response is successful
          if (response.ok) {
            const data = await response.json();
            setWishlistItems(data);
          } else {
            console.error("Failed to fetch wishlist:", response.statusText);
            setWishlistItems([]); // Optional: Clear wishlist in case of failure
          }
        } catch (error) {
          // console.error("Error fetching wishlist:", error);
          setWishlistItems([]); // Optional: Clear wishlist in case of an error
        }
      }
    };

    loadWishlist();
  }, [session?.user?._id, setWishlistItems]);

  // Helper function to save the wishlist to the API
  const saveWishList = async (updatedWishList: WishItemType[]) => {
    const filterIds = updatedWishList.map((item) => item._id);
    if (session?.user?._id) {
      const res = await fetch(`/api/customer/wishlist/${session.user._id}`, {
        method: "PUT", // Changed to PUT for updating
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterIds),
      });
    }
  };

  // Add item to the wishlist
  const addToWishList = async (item: WishItemType) => {
    setWishlistItems((prev) => {
      prev = prev || []; // Ensure prev is not null or undefined

      const isItemExist = prev.some(
        (i) => i._id === item._id // Check if the item already exists in the wishlist
      );

      if (!isItemExist) {
        const updatedWishList = [...prev, item]; // No need to generateId since item already has _id
        saveWishList(updatedWishList); // Save updated wishlist to the API
        return updatedWishList;
      }

      return prev;
    });
  };

  // Remove item from the wishlist
  const removeFromWishList = async (_id: string) => {
    setWishlistItems((prev) => {
      const updatedWishList = prev.filter((item) => item._id !== _id); // Remove the item with the matching _id
      saveWishList(updatedWishList); // Save the updated wishlist to the API
      return updatedWishList; // Return the updated wishlist
    });
  };

  return {
    wishlistItems,
    addToWishList,
    removeFromWishList,
  };
};

export default useWishList;
