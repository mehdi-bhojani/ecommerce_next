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

    const convertFromNavigation = (items: any) => {
        const navigation = items.map((item) => {
            addKeyValuePair(item.value, item.href);
            return {
                id: item.id,
                value: item.value,
                children: item.children.length>1 ? convertFromNavigation(item.children) : null,
            };
        });
        return navigation;
    }

    

    return {
        removeKeyValuePair,
        addKeyValuePair,
        updateKeyValuePair,
        state,
        convertFromNavigation
    };

}

