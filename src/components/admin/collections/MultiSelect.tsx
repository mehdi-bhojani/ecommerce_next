"use client";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";
import { CategoryType } from "@/lib/types";

interface MultiSelectProps {
  placeholder: string;
  categories: CategoryType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  categories,
  value = [], // Provide a default empty array
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  const selected = categories.filter((category) =>
    value.includes(category._id)
  );
  const selectables = categories.filter(
    (category) => !value.includes(category._id)
  );

  return (
    <>
      <div className="flex gap-1 flex-wrap my-3 ">
        {selected.map((category) => (
          <Badge className="bg-slate-100 mx-1 py-1" key={category._id}>
            {category.name}
            <button
              type="button"
              className="ml-1 hover:text-red-1 "
              onClick={() => onRemove(category._id)}
            >
              <X className="h-3 w-3 " />
            </button>
          </Badge>
        ))}
      </div>
      <Command className="overflow-visible bg-gray-100 border border-gray-300  shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          className=""
        />
        <div className="relative ">
          {open && (
            <CommandList className="absolute w-full z-30 left-0 top-0 overflow-auto bg-slate-400 border border-gray-300 p-2 m-2 shadow-md focus:outline-none " >
              <CommandGroup >
                {selectables.map((category) => (
                  <CommandItem
                    key={category._id}
                    onMouseDown={(e) => e.preventDefault()}
                    onSelect={() => {
                      onChange(category._id);
                      setInputValue("");
                    }}
                    className="text-black hover:bg-grey-500 "
                  >
                    {category.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          )}
        </div>
      </Command>
      
    </>
  );
};

export default MultiSelect;
