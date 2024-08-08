"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../customUi/Delete";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpDown, MoreHorizontal, PencilLine, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CollectionType } from "@/lib/types";

const deleteCollection = async (id: string) => {
  try {
    // Make an API call to delete the collection from the database
    await fetch(`/api/collection/${id}`, {
      method: "DELETE",
    });

    // Handle success
    toast.success("Collection deleted successfully");
    window.location.href = "/admin/collections";
    // router.push("/admin/collections");
  } catch (error) {
    // Handle error
    toast.error("Error deleting collection");
  }
};


export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "image",
    header: "",
    cell: ({ row }) => (
      <>
        <Avatar>
          <AvatarImage src={row.original.image} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    id:"title",
    cell: ({ row }) => (
      <Link
        href={`/collections/${row.original._id}`}
        className="hover:bg-slate-300"
      >
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <p className="truncate">{row.original.description}</p>,
  },
  {
    accessorKey: "categories",
    header: "Total Categories",
    cell: ({ row }) => <p>{row.original.categories.length}</p>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <p>{new Date(row.original.createdAt).toLocaleDateString()}</p>,
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <p>{new Date(row.original.updatedAt).toLocaleDateString()}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const collection = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(collection.name)}
            >
              Copy Collection
            </DropdownMenuItem>
            <DropdownMenuSeparator color="black" />
            <DropdownMenuItem><Link href={`/admin/collections/${collection._id}`}>Edit Collection</Link></DropdownMenuItem>
            <DropdownMenuItem className="text-red-600" onClick={() => deleteCollection(collection._id)}>
              Delete Collection
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
