// components/reviewDialog.js

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
import { ReviewType } from "@/lib/types";
import { Star } from "lucide-react";
import Image from "next/image";
import RenderStars  from "@/components/myUi/RenderStar";

interface props {
  open: boolean;
  onClose: () => void;
  review: ReviewType;
}

const ReviewDialog: React.FC<props> = ({ open, onClose, review }) => {
  if (!review) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="overflow-y-scroll">
      <DialogHeader>
      <DialogTitle>Review Details</DialogTitle>
      </DialogHeader>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>{review.customerId.firstName+" "+review.customerId.lastName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>{review.productId.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Rating</TableCell>
              <TableCell><RenderStars rating={review.rating} />  </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Review</TableCell>
              <TableCell>{review.reviewText}</TableCell>
            </TableRow>
            {/* <TableRow>
              <TableCell></TableCell>
              <TableCell>{review.images.map((item,index)=>(
                <Image src={item} key={index} width={100} height={100} alt="review" />
              ))}</TableCell>
            </TableRow> */}
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



export default ReviewDialog;
