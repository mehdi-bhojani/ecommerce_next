"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { OrderType } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<OrderType>[] = [
  {
    accessorKey: "orderNumber",
    header: "Order Number",
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      return (
        <div>
          <Link href={(row.original.customerId)?`/admin/customers/${row.original.customerId}`:``}>
            <span>{row.original.customerDetails.firstName+" "+row.original.customerDetails.lastName} </span>
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.orderItems.length} items
        </div>
      );
    }
  },
  {
    accessorKey: "orderStatus",
    header: "Order Status",
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell : ({row}) => {
      return (
        <div className="text-center">
          {row.original.totalAmount}
        </div>
      )
    }
  },
  {
    accessorKey: "orderDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell : ({row}) => {
      return (
        <div className="text-center">
          {new Date(row.original.orderDate).toLocaleDateString()}
        </div>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
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
              onClick={() => navigator.clipboard.writeText(order.orderNumber)}
            >
              Copy order number
            </DropdownMenuItem>
            <DropdownMenuSeparator color="black" />
            <DropdownMenuItem>
              <Link href={`/admin/orders/${order._id}`}>View Order</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
