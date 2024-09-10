'use client';

import * as React from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { Input } from '../ui/input';
import { Grab } from 'lucide-react';
import toast from 'react-hot-toast';
import { UniqueIdentifier } from '@dnd-kit/core';

// Import atoms and useAtom from Jotai
import { useAtom } from 'jotai';
import { columnsAtom, updateColAtom, removeColAtom } from '@/lib/store';

export function ColumnActions({
  title,
  id
}: {
  title: string;
  id: UniqueIdentifier;
}) {
  const [open, setIsOpen] = React.useState(false);
  const [name, setName] = React.useState(title);
  const [editDisable, setIsEditDisable] = React.useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Use atoms to get the state and update functions
  const [columns, setColumns] = useAtom(columnsAtom);
  const [, updateCol] = useAtom(updateColAtom);
  const [, removeCol] = useAtom(removeColAtom);

  const handleUpdateCol = () => {
    setIsEditDisable(!editDisable);
    updateCol({ id, newName: name }); // Correct object structure
    toast.success('Name Updated');
  };

  const handleRemoveCol = () => {
    setShowDeleteDialog(false);
    removeCol(id); // Use the atom action to remove the column
    toast.success('This column has been deleted.'
    );
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateCol(); // Call the updated function here
        }}
      >
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="!mt-0 mr-auto text-base disabled:cursor-pointer disabled:border-none disabled:opacity-100"
          disabled={editDisable}
          ref={inputRef}
        />
      </form>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="ml-1">
            <span className="sr-only">Actions</span>
            <Grab className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onSelect={() => {
              setIsEditDisable(!editDisable);
              setTimeout(() => {
                inputRef.current && inputRef.current?.focus();
              }, 500);
            }}
          >
            Rename
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="text-red-600"
          >
            Delete Section
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete the column?
            </AlertDialogTitle>
            <AlertDialogDescription>
              NOTE: All tasks related to this category will also be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => {
                setTimeout(() => (document.body.style.pointerEvents = ''), 100);
                handleRemoveCol();
              }}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
