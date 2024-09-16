"use client";

import { navigationType } from "@/lib/types";
import { useEffect, useState } from "react";

const useNavigation = () => {
  const [navigation, setNavigation] = useState<navigationType[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load navigation items from cache or fetch from API
    const loadNavItems = async () => {
      try {
        const cachedNav = localStorage.getItem("navigation");
        if (cachedNav) {
          setNavigation(JSON.parse(cachedNav));
          setLoading(false);
        } else {
          const res = await fetch("/api/appearence/header");
          const data = await res.json();
          setNavigation(data.header);
          localStorage.setItem("navigation", JSON.stringify(data.header));
        }
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
