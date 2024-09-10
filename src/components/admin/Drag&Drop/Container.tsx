import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';

import { UniqueIdentifier } from '@dnd-kit/core';
import { GripVertical, Pencil, Trash2 } from 'lucide-react';

interface ContainerProps {
  id: UniqueIdentifier;
  children: React.ReactNode;
  title?: string;
  description?: string;
  onAddItem?: () => void;
  onRemove?: (id: UniqueIdentifier) => void; // New prop for removing the container
}

const Container = ({
  id,
  children,
  title,
  description,
  onAddItem,
  onRemove, // Destructure the new onRemove prop
}: ContainerProps) => {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: 'container',
    },
  });

  const handleRemove = () => {
    if (onRemove) {
      onRemove(id);
    }
  };

  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx(
        'h-full p-4 bg-gray-50 rounded-xl  flex flex-col gap-y-4  ',
        isDragging && 'opacity-50',
      )}
    >
      <div className="text-center">
      {/* <button
            className="border p-2 text-xs rounded-xl shadow-lg hover:shadow-xl"
            {...listeners}
          >
            <GripVertical />
          </button> */}
        <div className="flex flex-col gap-y-1 truncate text-center">
          <span className="text-gray-800 text-xl  truncate">{title}</span>
       
        </div>
        <div className="flex gap-x-2">
        {/* <button
           
           className="border p-2 text-xs rounded-xl shadow-lg hover:shadow-xl text-gray-500"
         >
          <Pencil />
         </button> */}
          {/* <button
            onClick={handleRemove} // Add click handler for removing
            className="border p-2 text-xs rounded-xl shadow-lg hover:shadow-xl text-red-500"
          >
            <Trash2 />
          </button> */}
        </div>
      </div>

      {children}
      <div className='flex mt-5 flex-row gap-2'>
      <Button className='w-1/2' variant="ghost" onClick={onAddItem}>
        Add Item
      </Button>
      <Button className='w-1/2' variant="default" onClick={onAddItem}>
       Submit
      </Button>
      </div>
     
    </div>
  );
};

export default Container;
