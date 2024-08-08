"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
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
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  let selected: CategoryType[];

  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map((id) =>
      categories.find((category) => category._id === id)
    ) as CategoryType[];
  }

  const selectables = categories.filter(
    (category) => !selected.includes(category)
  );

  return (
    <>
      <div className="flex gap-2">
        {selected.map((category) => (
          <Badge key={category._id}>
            {category.name}
            <button
              type="button"
              className="ml-1 hover:text-red-1"
              onClick={() => onRemove(category._id)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <Command className="overflow-visible bg-white">
        <div className="flex gap-1 flex-wrap border rounded-md">
          <CommandInput
            placeholder={placeholder}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
          />
        </div>

        <div className="relative mt-2">
          {open && (
            <CommandList>
              <CommandGroup className="absolute w-full z-30 top-0 overflow-auto rounded-md bg-slate-200 border border-gray-300 p-2 m-2 shadow-md ">
                {selectables.map((category) => (
                  <CommandItem
                    key={category._id}
                    onMouseDown={(e) => e.preventDefault()}
                    onSelect={() => {
                      onChange(category._id);
                      setInputValue("");
                    }}
                    className="hover:bg-slate-600 cursor-pointer"
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
