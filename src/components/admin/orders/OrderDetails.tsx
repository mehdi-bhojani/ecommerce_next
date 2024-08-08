import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useReactToPrint } from "react-to-print";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pen } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderType, OrderItemType } from "@/lib/types";
import Invoice from "../invoice/Template";

interface OrderDetailsProps {
  order: OrderType | null;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  const [isEditingCustomer, setIsEditingCustomer] = useState(false);
  const [isEditingOrder, setIsEditingOrder] = useState(false);
  const [isEditingPayment, setIsEditingPayment] = useState(false);
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  const customerForm = useForm({
    defaultValues: {
      firstName: order!.customerDetails.firstName || "",
      lastName: order!.customerDetails.lastName || "",
      mobile: order!.customerDetails.mobile || "",
      email: order!.customerDetails.email || "",
      street: order!.address.street || "",
      city: order!.address.city || "",
      state: order!.address.state || "",
      postalCode: order!.address.postalCode || "",
      country: order!.address.country || "",
    },
  });

  const orderForm = useForm({
    defaultValues: {
      orderNumber: order!.orderNumber || "",
      totalAmount: order!.totalAmount || 0,
      orderStatus: order!.orderStatus || "pending",
      orderDate: order!.orderDate
        ? new Date(order!.orderDate).toISOString().split("T")[0]
        : "",
      deliveryDate: order!.deliveryDate
        ? new Date(order!.deliveryDate).toISOString().split("T")[0]
        : "",
      trackingNumber: order!.trackingNumber || "",
    },
  });

  const paymentForm = useForm({
    defaultValues: {
      method: order!.payment.method || "credit_card",
      status: order!.payment.status || "pending",
      transactionId: order!.payment.transactionId || "",
    },
  });

  const onSubmitCustomer = (data: any) => {
    console.log("Customer data:", data);
    setIsEditingCustomer(false);
  };

  const onSubmitOrder = (data: any) => {
    console.log("Order data:", data);
    setIsEditingOrder(false);
  };

  const onSubmitPayment = (data: any) => {
    console.log("Payment data:", data);
    setIsEditingPayment(false);
  };

  const invoiceData = {
    from: {
      name: "DFK Collections",
      address: "42, Awesome Enclave",
      city: "New York City",
      country: "New York, 10394",
      email: "admin@bbbootstrap.com",
      phone: "+48 123 456 789",
    },
    to: {
      name:
        order!.customerDetails?.firstName +
        " " +
        order!.customerDetails?.lastName,
      address: order!.address.street + ", " + order!.address.postalCode,
      city: order!.address.city + ", " + order!.address.state,
      country: order!.address.country,
      email: order!.customerDetails.email,
      phone: order!.customerDetails.mobile,
    },
    details: {
      orderNumber: order!.orderNumber,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      tax: 10,
      paymentMethod: order!.payment.method,
      transactionId: order!.payment.transactionId,
      discount: 20,
    },
    items: order!.orderItems.map((item: OrderItemType) => ({
      name: item.productId.name,
      description: item.variantId?.name + ", " + item.variantId?.size || "NA",
      quantity: item.quantity,
      unitCost: item.unitPrice,
      total: item.quantity * item.unitPrice,
    })),
    additionalNotes: "Thank you for shopping with us!",
  };

  return (
    <div className="p-10">
      <h1 className="my-5 font-bold text-2xl">Order Details</h1>

      {/* Customer Information */}
      <div>
        <div className="flex gap-5 items-center justify-between">
          <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
          {!isEditingCustomer && (
            <Button
              className="flex justify-center items-center bg-transparent text-black hover:bg-transparent hover:text-slate-500"
              onClick={() => setIsEditingCustomer(true)}
            >
              <Pen />
            </Button>
          )}
        </div>
        <form onSubmit={customerForm.handleSubmit(onSubmitCustomer)}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  {...customerForm.register("firstName", { required: true })}
                  disabled={!isEditingCustomer}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  {...customerForm.register("lastName", { required: true })}
                  disabled={!isEditingCustomer}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="mobile">Mobile</Label>
              <Input
                id="mobile"
                {...customerForm.register("mobile", { required: true })}
                disabled={!isEditingCustomer}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                {...customerForm.register("email", { required: true })}
                disabled={!isEditingCustomer}
              />
            </div>
            <div>
              <Label htmlFor="street">Street</Label>
              <Input
                id="street"
                {...customerForm.register("street")}
                disabled={!isEditingCustomer}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  {...customerForm.register("city")}
                  disabled={!isEditingCustomer}
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  {...customerForm.register("state")}
                  disabled={!isEditingCustomer}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  {...customerForm.register("postalCode")}
                  disabled={!isEditingCustomer}
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  {...customerForm.register("country")}
                  disabled={!isEditingCustomer}
                />
              </div>
            </div>
          </div>
          {isEditingCustomer && (
            <div className="flex gap-5 items-center my-10">
              <Button type="submit" className="w-full md:w-[200px]">
                Save Changes
              </Button>
              <Button
                className="w-full md:w-[200px]"
                type="button"
                variant="outline"
                onClick={() => setIsEditingCustomer(false)}
              >
                Cancel
              </Button>
            </div>
          )}
        </form>
      </div>

      <Separator className="my-4" />

      {/* Order Information */}
      <div>
        <div className="flex gap-5 items-center justify-between">
          <h3 className="text-lg font-semibold mb-2">Order Information</h3>
          {!isEditingOrder && (
            <Button
              className="flex justify-center items-center bg-transparent text-black hover:bg-transparent hover:text-slate-500"
              onClick={() => setIsEditingOrder(true)}
            >
              <Pen />
            </Button>
          )}
        </div>
        <form onSubmit={orderForm.handleSubmit(onSubmitOrder)}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Order Number</TableCell>
                <TableCell>
                  <Input
                    {...orderForm.register("orderNumber")}
                    disabled={!isEditingOrder}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Total Amount</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    step="0.01"
                    {...orderForm.register("totalAmount")}
                    disabled={!isEditingOrder}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Order Status</TableCell>
                <TableCell>
                  <Select
                    onValueChange={(value) =>
                      orderForm.setValue("orderStatus", value)
                    }
                    defaultValue={orderForm.getValues("orderStatus")}
                    disabled={!isEditingOrder}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Order Date</TableCell>
                <TableCell>
                  <Input
                    type="date"
                    {...orderForm.register("orderDate")}
                    disabled={!isEditingOrder}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Delivery Date</TableCell>
                <TableCell>
                  <Input
                    type="date"
                    {...orderForm.register("deliveryDate")}
                    disabled={!isEditingOrder}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Tracking Number</TableCell>
                <TableCell>
                  <Input
                    {...orderForm.register("trackingNumber")}
                    disabled={!isEditingOrder}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          {isEditingOrder && (
            <div className="flex gap-5 items-center my-10">
              <Button type="submit" className="w-full md:w-[200px]">
                Save Changes
              </Button>
              <Button
                className="w-full md:w-[200px]"
                type="button"
                variant="outline"
                onClick={() => setIsEditingOrder(false)}
              >
                Cancel
              </Button>
            </div>
          )}
        </form>
      </div>

      <Separator className="my-4" />

      {/* Payment Information */}
      <div>
        <div className="flex gap-5 items-center justify-between">
          <h3 className="text-lg font-semibold mb-2">Payment Information</h3>
          {!isEditingPayment && (
            <Button
              className="flex justify-center items-center bg-transparent text-black hover:bg-transparent hover:text-slate-500"
              onClick={() => setIsEditingPayment(true)}
            >
              <Pen />
            </Button>
          )}
        </div>
        <form onSubmit={paymentForm.handleSubmit(onSubmitPayment)}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Payment Method</TableCell>
                <TableCell>
                  <Select
                    onValueChange={(value) =>
                      paymentForm.setValue("method", value)
                    }
                    defaultValue={paymentForm.getValues("method")}
                    disabled={!isEditingPayment}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit_card">Credit Card</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="bank_transfer">
                        Bank Transfer
                      </SelectItem>
                      <SelectItem value="cash_on_delivery">
                        Cash on Delivery
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Payment Status</TableCell>
                <TableCell>
                  <Select
                    onValueChange={(value) =>
                      paymentForm.setValue("status", value)
                    }
                    defaultValue={paymentForm.getValues("status")}
                    disabled={!isEditingPayment}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Transaction ID</TableCell>
                <TableCell>
                  <Input
                    {...paymentForm.register("transactionId")}
                    disabled={!isEditingPayment}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          {isEditingPayment && (
            <div className="flex gap-5 items-center my-10">
              <Button type="submit" className="w-full md:w-[200px]">
                Save Changes
              </Button>
              <Button
                className="w-full md:w-[200px]"
                type="button"
                variant="outline"
                onClick={() => setIsEditingPayment(false)}
              >
                Cancel
              </Button>
            </div>
          )}
        </form>
      </div>

      <Separator className="my-4" />

      {/* Order Items */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Order Items</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Variant</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order!.orderItems.map((item: OrderItemType, index: number) => (
              <TableRow key={index}>
                <TableCell>{item.productId.name}</TableCell>
                <TableCell>
                  {item.variantId?.name + ", " + item.variantId?.size || "NA"}
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                <TableCell>
                  ${(item.quantity * item.unitPrice).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="my-4 flex justify-end">
        <Button
          onClick={() => {
            handlePrint(null, () => contentToPrint.current);
          }}
        >
          Generate Invoice
        </Button>
        <div ref={contentToPrint}>
          <Invoice {...invoiceData} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
