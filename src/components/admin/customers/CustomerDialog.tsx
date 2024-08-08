// components/CustomerDialog.js

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Button,
} from "@/components/ui/button";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { CustomerType } from "@/lib/types";

interface props {
  open: boolean;
  onClose: () => void;
  customer: CustomerType;
}

const CustomerDialog: React.FC<props> = ({ open, onClose, customer }) => {
  if (!customer) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="overflow-y-scroll">
      <DialogHeader>
      <DialogTitle>Customer Details</DialogTitle>
      </DialogHeader>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>{customer.firstName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Last Name</TableCell>
              <TableCell>{customer.lastName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>{customer.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Phone</TableCell>
              <TableCell>{customer.phone}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gender</TableCell>
              <TableCell>{customer.gender}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Is Active</TableCell>
              <TableCell>{customer.isActive ? "Yes" : "No"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Orders</TableCell>
              <TableCell>{customer.orderHistory.length}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Receive Newsletters</TableCell>
              <TableCell>
                {customer.preferences.receiveNewsletters ? "Yes" : "No"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Default Address</TableCell>
              <TableCell>
                <ul>
                  {customer.addresses.map((address, index) => (
                    address.isDefault &&
                    <li key={index}>
                      {address.street}, {address.city}, {address.state},{" "}
                      {address.zip}
                    </li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      <DialogFooter>
      <DialogClose>
        <Button onClick={onClose}>Close</Button>
      </DialogClose>
      </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};



export default CustomerDialog;
