"use client";

import { Button } from "@/components/ui/button";
import { CustomerType, ReviewType } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Star, Trash } from "lucide-react";
import Delete from "../customUi/DeleteFeild";
import ReviewDetails from "./ReviewsDetails";
import RenderStars from "@/components/myUi/RenderStar";

export const columns: ColumnDef<ReviewType>[] = [
  {
    accessorKey: "index",
    header: "Index",
    cell: ({ row }) => <p>{row.index + 1}</p>, 
  },
  {
    accessorKey: "CustomerId",
    header: "Customer",
    cell: ({ row }) => (
      <p>
        {row.original.customerId.firstName +
          " " +
          row.original.customerId.lastName}
      </p>
    ),
  },
  {
    accessorKey: "productId",
    header: "Name",
    cell: ({ row }) => (
      <span className="block max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis">
        {row.original.productId.name}
      </span>
    ),
  },
  {
    accessorKey: "reviewText",
    header: "Review",
    cell: ({ row }) => (
      <span className="block max-w-[300px] overflow-hidden whitespace-nowrap text-ellipsis ">
        {row.original.reviewText}
      </span>
    ),
  },
  {
    accessorKey: "rating",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rating
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span className="flex gap-2">
        <RenderStars rating={row.original.rating} />
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <p>{new Date(row.original.createdAt).toLocaleDateString()}</p>
    ),
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <ReviewDetails review={row.original} />
        <Delete item="review" id={row.original._id} />
      </div>
    ),
  },
];
