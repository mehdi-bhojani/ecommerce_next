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
import { useRouter } from "next/navigation";
import { VariantType } from "@/lib/types";

const deleteVariant = async (id: string,productId: string) => {
  
  try {
    // Make an API call to delete the product from the database
    const response = await fetch(`/api/variant/${id}`, {
      method: "DELETE",
    });

    // Handle success
    toast.success("Variant deleted successfully");
    window.location.href = `/admin/products/${productId}`;
    // router.push("/admin/products");
  } catch (error) {
    // Handle error
    toast.error("Error deleting variant");
  }
};

export const columns: ColumnDef<VariantType>[] = [
  {
    accessorKey: "image",
    header: "",
    cell: ({ row }) => (
      <>
        <Avatar>
          <AvatarImage src={row.original.img[0]} alt="@shadcn" />
          <AvatarFallback>Img</AvatarFallback>
        </Avatar>
      </>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    id: "title",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({row}) => {
      const price = +row.original.price;
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
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
      const variant = row.original;

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
              onClick={() => navigator.clipboard.writeText(variant.name)}
            >
              Copy Variant
            </DropdownMenuItem>
            <DropdownMenuSeparator color="black" />
            <DropdownMenuItem>
              <Link href={`/admin/variants/${variant._id}`}>Edit Variant</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => deleteVariant(variant._id, variant.productId) }
            >
              Delete Variant
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
