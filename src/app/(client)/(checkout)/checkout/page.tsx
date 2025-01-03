"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Tag, Trash2 } from "lucide-react";

import CheckoutCard from "@/components/website/CheckoutPageComponent/CheckoutCard";
import CouponDialog from "@/components/website/CheckoutPageComponent/CouponDialog";
import CheckoutDetails from "@/components/website/CheckoutPageComponent/CheckoutDetails";
import { cartItemsAtom } from "@/shared/atoms/cartAtom";
import { useAtom } from "jotai";
import { CartItemType, CurrentCartItemType } from "@/lib/types";
import useCart from "@/shared/hooks/useCart";
import {
  formatOrderItems,
  generateOrderNumber,
  PriceIntoCurrency,
} from "@/shared/helpers/help";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import ClientLoading from "@/components/myUi/ClientLoading";
import EmptyCard from "@/components/website/CheckoutPageComponent/EmptyCard"
import { storeAtom } from "@/shared/atoms/storeAtom";
import SignInToContinue from "@/components/website/global/SignInToContinue";

const Page = () => {
  const [value, setValue] = React.useState("");
  const [cartItems, setCartItems] = useAtom(cartItemsAtom);
  const [subTotal, setSubTotal] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(200);
  const {
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    updateSize,
    clearCart,
  } = useCart();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [myStoreAtom, setStoreAtom] = useAtom(storeAtom);

  useEffect(() => {
    // console.log("cartItems", cartItems);
    setSubTotal(getTotalPrice());
  }, [cartItems, getTotalPrice]);

    
  const onProceed = async (values: any) => {
    // Format the order data
    const newValues = {
      customerDetails: {
        firstName: values.firstName,
        lastName: values.lastName,
        mobile: values.mobile,
        email: values.email,
      },
      address: {
        street: values.street,
        city: values.city,
        state: values.state,
        postalCode: values.postalCode,
        country: values.country,
      },
      userId: session?.user._id,
      isGuest: !session?.user?._id,
      totalAmount: subTotal + deliveryCharges,
      orderStatus: "pending",
      orderItems: formatOrderItems(cartItems),
      payment: {
        method: values.payment,
        status: "pending",
        transactionId: null,
      },
      orderDate: Date.now(),
      deliveryDate: null,
      trackingNumber: null,
      orderNumber: generateOrderNumber(),
      isActive: true,
      isDeleted: false,
    };

    console.log("newValues", newValues);

    try {
      setLoading(true);
      const res = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newValues),
      });

      // Check if the request was successful
      if (!res.ok) {
        toast.error("Failed to create order.");
        throw new Error("Failed to create order.");
      }
      toast.success("Order created successfully.");
      clearCart();
      const data = await res.json();
      console.log("data", data);
      if (values.payment === "cash_on_delivery") {
        router.push("/order-success?id=" + data._id);
      } else if (values.payment === "credit_card") {
        router.push("/paymentstripe?orderid=" + data._id);
      }
      
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div><ClientLoading/></div>;
  }

  if (cartItems.length === 0) {
    return <div><EmptyCard/></div>;
  }

  if(!session?.user._id){
    return <SignInToContinue/>;
  }

  return (
    <div className="flex flex-row gap-1 sm:mx-20 sm:mt-5 ">
      <div className="hidden flex-col gap-1 w-3/5 mb-10 m-2 sm:flex">
        <CheckoutDetails onProceed={onProceed} />
      </div>
      {/* those devices which are not mobile put sm  */}
      <div className="flex flex-col gap-1 w-full sm:w-2/5 my-2">
        <div className="bg-white sm:m-2 sm:p-2 hidden">
          <span className="font-semibold"> Coupons</span>
          <div className="flex items-center justify-between p-4  border-gray-200 ">
            <div className="flex items-center gap-1">
              <Tag />
              <h2 className="text-lg font-semibold">Apply Coupons</h2>
            </div>
            <CouponDialog>
              <button className="px-4 py-2 text-slate-500 border border-green-600 rounded-md hover:bg-green-50">
                APPLY
              </button>
            </CouponDialog>
          </div>
        </div>

        <div>
          <div className="p-6 bg-white shadow-lg  sm:max-w-md mx-auto ">
            {cartItems.map((product, index) => (
              <CheckoutCard
                key={index}
                ProductCheckout={product}
                onRemove={() => removeFromCart(product._id!)}
                totalAmount={subTotal + deliveryCharges}
              />
            ))}

            <div className="mt-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Subtotal
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {PriceIntoCurrency(subTotal, myStoreAtom?.storeSettings.currency.default || "PKR")}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Delivery Charges
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {PriceIntoCurrency(deliveryCharges, myStoreAtom?.storeSettings.currency.default || "PKR")}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>
                  {PriceIntoCurrency(deliveryCharges + subTotal, myStoreAtom?.storeSettings.currency.default || "PKR")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Button
            variant={"destructive"}
            className="px-12 w-full mt-5 sm:hidden "
            type="submit"
          >
            <Link href={"/checkout/AddDetail"}>Proceed</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
