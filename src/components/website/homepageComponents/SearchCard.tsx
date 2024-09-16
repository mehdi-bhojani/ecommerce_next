"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, Trash2, X } from "lucide-react"; // Rename import to avoid conflict
import { set } from "mongoose";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export interface SearchCardProps {
  toggle: () => void; // Define the type for the toggle function
}

export default function SearchCard({ toggle }: SearchCardProps) {
  
    const [placeholder, setPlaceholder] = useState("");
  const [search, setSearch] = useState(""); // Rename to avoid conflict with icon
  const [first, setFirst] = useState<string[]>([""]); // Fix initial state type
  const router = useRouter();

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/search?q=${search}`);
      toggle();
    }
  };

  useEffect(() => {
    const storedValue = localStorage.getItem("myKey");
    if (storedValue) {
      setFirst(JSON.parse(storedValue));
    }
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem("myKey", JSON.stringify(first));
  };

  return (
    <div className="p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Input
          onChange={(e) => {setSearch(e.target.value); setPlaceholder(e.target.value);}}
          placeholder={placeholder === "" ? "Search For item" : placeholder}
          className="border bg-gray-100 font-medium border-gray-400 p-2 flex-grow focus:outline-none focus:ring focus:border-blue-300"
          value={placeholder}
        />
        <Button className="rounded-none" onClick={handleSearch}>
          <SearchIcon />
        </Button>
        <button
          onClick={() => {
            toggle();
            saveToLocalStorage();
          }}
          className="text-gray-500"
        >
          <X />
        </button>
      </div>

      <div className="mb-6">
        <div className="justify-between hidden">
          <span className="font-semibold mb-2">History:</span>
          <Trash2
            onClick={() => {
              setFirst([""]);
              saveToLocalStorage(); // Ensure storage is cleared
            }}
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center space-x-2">
          {first.map((item, index) =>
            item !== "" ? (
              <span
                key={index}
                className="bg-gray-100 font-semibold text-gray-700 py-1 px-3"
              >
                {item}
              </span>
            ) : null
          )}
        </div>
      </div>

      <div>
        <h2 className="font-semibold mb-2">Popular Searches</h2>
        <div className="flex flex-wrap gap-2">
          {[
            "Men jackets",
            "Women Sweater",
            "Activewear",
            "Women sport shoes",
            "Men formal Shoes",
            "Girls dresses",
            "Boys shirts",
            "Stone",
            "Sneakers",
            "Unstitch",
            "Women kurta",
            "Duppats",
            "Shawls",
            "Chunky sneakers",
            "Women tops",
            "Flats",
            "Pump",
            "Women coats",
          ].map((item, index) => (
            <span
              onClick={() => {
                setPlaceholder(item);
                setSearch(item);
                if (!first.includes(item)) {
                  setFirst([...first, item]);
                  saveToLocalStorage(); // Save immediately after adding new item
                }
              }}
              key={index}
              className="bg-gray-100 font-semibold text-gray-700 py-1 px-3"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
