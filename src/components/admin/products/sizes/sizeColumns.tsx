"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const deleteSize = async (id: string, variantId: string) => {
  try {
    // Make an API call to delete the size
    const response = await fetch(`/api/size/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete size");
    }

    // Handle success
    toast.success("Size deleted successfully");
    window.location.href = `/admin/variants/${variantId}`;
  } catch (error) {
    // Handle error
    toast.error("Error deleting size");
  }
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Name",
    id: "name",
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = +row.original.price;
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
    },
  },
  {
    accessorKey: "remainingStock",
    header: "Remaining Stock",
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
      );
    },
    cell: ({ row }) => (
      <p className="text-center">
        {new Date(row.original.createdAt).toLocaleDateString()}
      </p>
    ),
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
      );
    },
    cell: ({ row }) => (
      <p className="text-center">
        {new Date(row.original.updatedAt).toLocaleDateString()}
      </p>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const size = row.original;

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
              onClick={() => navigator.clipboard.writeText(size.name)}
            >
              Copy Name
            </DropdownMenuItem>
            <DropdownMenuSeparator color="black" />
            <DropdownMenuItem>
              <Link href={`/admin/sizes/${size._id}`}>Edit Size</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => deleteSize(size._id, size.variantId)}
            >
              Delete Size
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
