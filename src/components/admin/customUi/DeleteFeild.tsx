"use client";

import { useEffect, useState } from "react";
import { Trash } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/admin/ui/alert-dialog";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface DeleteProps {
  item: string;
  id: string;
}

const Delete: React.FC<DeleteProps> = ({ item, id }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isDeleted, isDeletedSet] = useState(false);

  useEffect(() => {
    if (isDeleted) {
      window.location.reload();
      router.push(`/admin/${item}s`);
    }
  }, [isDeleted]);

  const onDelete = async () => {
    try {
      setLoading(true);
      const itemType = item === "category" ? "categories" : item + "s";
      const res = await fetch(`/api/${item}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setLoading(false);
        toast.success(`${item} deleted`);
        isDeletedSet(true);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong! Please try again.");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-grey-1">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-1">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            {item}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction className="bg-red-500" onClick={onDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
