"use client";

import { StoreType } from "@/lib/types";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { storeAtom } from "../atoms/storeAtom";

const UseMyStore = () => {
  const [myStoreAtom, setStoreAtom] = useAtom(storeAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStore = async () => {
      // If data already exists in the storeAtom, no need to fetch again
      if (!myStoreAtom) {
        try {
          const res = await fetch("/api/store");
          const data = await res.json();
          setStoreAtom(data);
        } catch (error) {
          console.log("Error loading myStore items", error);
        } finally {
          setLoading(false);
        }
      } else {
        // If data is already in storeAtom, stop loading
        setLoading(false);
      }
    };

    loadStore();
  }, [myStoreAtom, setStoreAtom]);

  return {
    myStore: myStoreAtom,
    loading,
  };
};

export default UseMyStore;
