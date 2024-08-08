"use client";

import { CustomerType } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import Delete from "../customUi/DeleteFeild";
import CustomerDetails from "./CustomerDetails";

export const columns: ColumnDef<CustomerType>[] = [
  {
    accessorKey: "index",
    header: "Index",
    cell: ({ row }) => <p>{row.index + 1}</p>, 
  },
  {
    accessorKey: "firstName",
    header: "Name",
    cell: ({row}) => <p>{row.original.firstName+" "+row.original.lastName}</p>,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
  },
  {
    accessorKey: "orders",
    header: "Total Orders",
    cell: ({row}) => <p>{row.original.orderHistory.length}</p>,
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-center space-x-2">
        <CustomerDetails customer={row.original} />
        <Delete item="customer" id={row.original.userId} />
      </div>
    ),
  },
];
