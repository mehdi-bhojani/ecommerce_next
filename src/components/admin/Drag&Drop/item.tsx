import React, { useState } from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { GripVertical, Pencil, Trash2, Plus } from 'lucide-react';

type SubItemType = {
  id: UniqueIdentifier;
  title: string;
};

type ItemsType = {
  id: UniqueIdentifier;
  title: string;
  onRemove?: (id: UniqueIdentifier) => void;
  onAddSubItem?: (itemId: UniqueIdentifier) => void;
};

const Items = ({ id, title, onRemove }: ItemsType) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: 'item',
    },
  });

  // State to manage sub-items
  const [subItems, setSubItems] = useState<SubItemType[]>([]);

  // Handler to add a sub-item
  const handleAddSubItem = () => {
    const newSubItem = { id: Date.now().toString(), title: 'New Sub-Item' }; // Generate a unique ID for each sub-item
    setSubItems([...subItems, newSubItem]);
  };

  // Handler to remove a sub-item
  const handleRemoveSubItem = (subItemId: UniqueIdentifier) => {
    setSubItems(subItems.filter((subItem) => subItem.id !== subItemId));
  };

  // Handler to remove the current item
  const handleRemove = () => {
    if (onRemove) {
      onRemove(id);
    }
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx(
        'px-2 py-4 bg-white shadow-md rounded-xl w-full border border-transparent hover:border-gray-200 cursor-pointer',
        isDragging && 'opacity-50'
      )}
    >
      <div className="flex items-center justify-between">
        <button
          className="border p-2 text-xs rounded-xl shadow-lg hover:shadow-xl"
          {...listeners}
        >
          <GripVertical />
        </button>
        <span className="truncate">{title}</span>
        <div className="flex gap-x-2">
          <button className="border p-2 text-xs rounded-xl shadow-lg hover:shadow-xl text-gray-500">
            <Pencil />
          </button>
          <button
            onClick={handleRemove}
            className="border p-2 text-xs rounded-xl shadow-lg hover:shadow-xl text-red-500"
          >
            <Trash2 />
          </button>
        </div>
      </div>

     
    </div>
  );
};

export default Items;
