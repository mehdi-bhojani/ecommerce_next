"use client"

import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { keyValuePair } from "../atoms/keyValueAtom";

export default function KeyValuePair() {

  const [state, setState] = useAtom(keyValuePair);

  // Add a key-value pair
  const addKeyValuePair = (key: string, value: string) => {
    setState(prevState => {
      const newMap = new Map(prevState);
      newMap.set(key, value);
      return newMap;
    });
  };

  // Update a key-value pair
  const updateKeyValuePair = (key: string, value: string) => {
    setState(prevState => {
      const newMap = new Map(prevState);
      newMap.set(key, value);
      return newMap;
    });
  };

  // Remove a key-value pair
  const removeKeyValuePair = (key: string) => {
    setState(prevState => {
      const newMap = new Map(prevState);
      newMap.delete(key);
      return newMap;
    });
  };

  interface NavigationItem {
    id: string;
    value: string;
    href?: string;
    children?: NavigationItem[];
  }

  interface ConvertedItem {
    id: string;
    value: string;
    children?: ConvertedItem[] | null;
  }

  const convertFromNavigation = (items: NavigationItem[]): any[] => {
    return items.map((item) => {
      if (item.href) {
        setState((prevState) => {
          const newMap = new Map(prevState);
          newMap.set(item.value, item.href || "");
          return newMap;
        });
      }

      return {
        id: item.id,
        value: item.value,
        children: item.children 
          ? convertFromNavigation(item.children)
          : null,
      };
    });
  };


  return {
    removeKeyValuePair,
    addKeyValuePair,
    updateKeyValuePair,
    state,
    convertFromNavigation
  };

}

