"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../customUi/Delete";
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
import { Badge } from "@/components/ui/badge";
import { ProductType } from "@/lib/types";

const deleteproduct = async (id: string) => {
  try {
    // Make an API call to delete the product from the database
    await fetch(`/api/product/${id}`, {
      method: "DELETE",
    });

    // Handle success
    toast.success("product deleted successfully");
    window.location.href = "/admin/products";
    // router.push("/admin/products");
  } catch (error) {
    // Handle error
    toast.error("Error deleting product");
  }
};

export const columns: ColumnDef<ProductType>[] = [
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
    meta: {
      style: {
        innerWidth: "500px",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    cell: ({ row }) => (
      <Link href={`/products/${row.original._id}`} className="hover:text-red-1">
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: "price",
    header: "Current Price",
    cell: ({row}) => {
      const price = +row.original.price;
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
    },
  },
  {
    accessorKey: "categories",
    header: "Categories",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-2">
        {row.original.categories.map((elem,index) => (
          <Badge className="p-2 rounded-none" key={index}>{elem?.name}</Badge>
        ))}
      </div>
    ) || "null",
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (row.original.isActive ? (<span className="p-2 bg-green-400 text-white">active</span>) : (<span className="p-2 bg-orange-400 text-white">inactive</span>)),
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
      const product = row.original;

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
              onClick={() => navigator.clipboard.writeText(product.name)}
            >
              Copy product
            </DropdownMenuItem>
            <DropdownMenuSeparator color="black" />
            <DropdownMenuItem>
              <Link href={`/admin/products/${product._id}`}>Edit Product</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => deleteproduct(product._id)}
            >
              Delete Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
