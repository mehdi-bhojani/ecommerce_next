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
import { CategoryType } from "@/lib/types";

const deleteCategories = async (id: string) => {
  try {
    // Make an API call to delete the collection from the database
    await fetch(`/api/category/${id}`, {
      method: "DELETE",
    });

    // Handle success
    toast.success("Category deleted successfully");
    window.location.href = "/admin/categories";
    // router.push("/admin/collections");
  } catch (error) {
    // Handle error
    toast.error("Error deleting category");
  }
};


export const columns: ColumnDef<CategoryType>[] = [
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
        href={`/categories/${row.original._id}`}
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
    accessorKey: "parentCategory",
    header: "Parent Category",
    cell: ({row}) => <p>{row.original.parentCategory?.name || "Null"}</p>
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
      const category = row.original;

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
              onClick={() => navigator.clipboard.writeText(category.name)}
            >
              Copy category
            </DropdownMenuItem>
            <DropdownMenuSeparator color="black" />
            <DropdownMenuItem><Link href={`/admin/categories/${category._id}`}>Edit category</Link></DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={()=>deleteCategories(category._id)}>
              Delete category
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
