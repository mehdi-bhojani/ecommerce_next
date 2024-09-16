"use client"

import React, { useEffect, useState } from "react";
import {
  SimpleTreeItemWrapper,
  SortableTree,
  TreeItemComponentProps,
  TreeItems
} from "dnd-kit-sortable-tree";
import sizeof from "object-sizeof";
import TreeItem from "@/components/admin/Drag&Drop/treeItem";
import { Button } from "@/components/ui/button";
import KeyValuePair from "@/shared/hooks/useKeyValuePair";
import { convertToNavigation, extractMapFromNavigation } from "@/shared/helpers/help";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { keyValuePair } from "@/shared/atoms/keyValueAtom";
import Loader from "@/components/admin/customUi/Loader";
import AddItemModal from "@/components/admin/appearence/AddItemModal";

export default function App() {
  const [header, setHeader] = useAtom(keyValuePair);
  const [items, setItems] = useState(initialViableMinimalData);
  const [loading, setLoading] = useState(true);
  const { state, convertFromNavigation } = KeyValuePair();

  useEffect(() => {
    const getHeader = async () => {
      try {
        const res = await fetch("/api/appearence/header");
        const data = await res.json();
        const formatData = convertFromNavigation(data.header);
        setItems(formatData);
      } catch (error) {
        console.log("Error Fetching Navigation");
      } finally {
        setLoading(false);
      }
    }
    getHeader();
  }, []);

  const handleSubmit = async () => {
    // ... rest of the handleSubmit function
    const result = convertToNavigation(items, state);
    // console.log("result", result);
    const replet = convertFromNavigation(result);
    // console.log("replet", replet);
    const newValue = {
      header: result
    }
    // console.log("new value", newValue);
    try {
      const res = await fetch("/api/appearence/header", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newValue),
      });
      const data = await res.json();
      // console.log(data);
      toast.success("Appearence Updated");
    } catch (error) {
      toast.error("Error Updating Navigation");
    }
  }

  // Dummy addItem function
  const addItem = (value: string) => {
    const newItem = {
      id: Date.now(), // Using timestamp as a simple unique id
      value,
      children: []
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: number | string) => {
    const removeItemRecursively = (items: TreeItems<MinimalTreeItemData>): TreeItems<MinimalTreeItemData> => {
      return items.reduce((acc, item) => {
        if (item.id === id) {
          return acc; // Skip this item (remove it)
        }
        if (item.children) {
          return [...acc, { ...item, children: removeItemRecursively(item.children) }];
        }
        return [...acc, item];
      }, [] as TreeItems<MinimalTreeItemData>);
    };
  };

  if (loading) {
    return <div><Loader /></div>
  }

  return (
    <div className="p-10">
      <div className="flex justify-between">
        <h1 className="text-2xl my-4">Header</h1>
        {/* <Button onClick={addItem}>Add New Item</Button> */}
        <AddItemModal addItems={addItem} />
      </div>
      <div className={`bg-slate-200`}>
        <SortableTree
          items={items}
          onItemsChanged={setItems}
          TreeItemComponent={TreeItem}

        />
      </div>
      <Button onClick={handleSubmit} className="my-5">Submit</Button>
    </div>
  );
}

type MinimalTreeItemData = {
  value: string;
};

const initialViableMinimalData: TreeItems<MinimalTreeItemData> = [
  {
    id: 1,
    value: "mehdi",
    children: [
      { id: 4, value: "John" },
      { id: 5, value: "Sally" }
    ]
  },
  { id: 2, value: "Fred", children: [{ id: 6, value: "Eugene" }] },
  { id: 3, value: "Helen" }
];