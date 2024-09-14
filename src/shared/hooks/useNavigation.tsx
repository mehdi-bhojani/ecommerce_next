"use client";

import { navigationType } from "@/lib/types";
import { useEffect, useState } from "react";

const useNavigation = () => {
  const [navigation, setNavigation] = useState<navigationType[]>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Load cart items from IndexedDB when the component mounts or when session changes
    const loadNavItems = async () => {
      try {
        const res = await fetch("/api/appearence/header");
        const data = await res.json();
        setNavigation(data.header);
      } catch (error) {
        console.log("Error loading navigation items", error);
      } finally {
        setLoading(false);
      }
    };
    loadNavItems();
  }, []);

  return {
    navigation,
    loading,
  };
};
  export default useNavigation;
