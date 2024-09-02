"use client";

import { Button } from "@/components/ui/button";
import SuccessBreadCrumb from "@/components/website/CheckoutPageComponent/SuccessBreadCrumb";
import { OrderItemType, OrderType } from "@/lib/types";
import { PriceIntoCurrency } from "@/shared/helpers/help";
import { Separator } from "@radix-ui/react-separator";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = ({ searchParams: { id } }: { searchParams: { id: string } }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [orderDetails, setOrderDetails] = useState<OrderType>();
  useEffect(() => {
    const getOrderDetails = async () => {
    setLoading(true);
      try {
        const res = await fetch(`/api/order/${id}`);
        const data = await res.json();
        setOrderDetails(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getOrderDetails();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <SuccessBreadCrumb />
      <div className="max-w-4xl mx-auto my-10 p-6 bg-white  ">
        {/* Order Placed Section */}
        <div className="flex flex-col items-center justify-center">
          <div className="text-green-500 text-5xl mb-2">
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h1 className="text-2xl font-semibold">Order Placed</h1>
          <p className="text-gray-600">
            Total price for {orderDetails?.orderItems.length} item is{" "}
            {PriceIntoCurrency(orderDetails?.totalAmount || 0, "PKR")}
          </p>
        </div>

        <Separator orientation="horizontal" className="my-6 border" />

        <div className="my-4 flex flex-col gap-2 flex-start sm:justify-between  sm:items-center sm:flex-row">
          <span className="font-semibold">
            Order Number{" : "}
            <span className="text-gray-500">{orderDetails?.orderNumber}</span>
          </span>
          <span className="font-semibold">
            Expected Delivery{" : "}
            <span className="text-green-500">(3 - 5 Days)</span>
          </span>
        </div>

        <Separator orientation="horizontal" className="my-6 border" />

        <div className="rounded-md">
          <h2 className="text-lg font-semibold my-2">Order Details</h2>
          <div className="flex flex-col gap-5 w-full">
            {orderDetails?.orderItems.map(
              (item: OrderItemType, index: number) => (
                <div
                  key={index}
                  className="flex items-center p-5 bg-gray-100 rounded-md shadow-sm"
                >
                  <Image
                    src={
                      item.productId?.img[0] || "/assets/Checkout/girlcloth.png"
                    }
                    alt="Product"
                    className="w-20 h-26 object-cover rounded-md mr-4"
                    width={80}
                    height={100}
                  />
                  <div className="flex flex-col space-y-1">
                    <p className="text-gray-700 font-medium capitalize">
                      {item.productId?.name || "Product Name"}
                    </p>
                    <p className="text-gray-500">Qty: {item.quantity}</p>
                    {item.variantId && (
                      <div className="text-gray-500">
                        <p>Size: {item.variantId.size}</p>
                        <p>Variant: {item.variantId.name}</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Invite Friends & Earn Section */}
        <div className=" mx-auto my-10   ">
          {/* <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
            <div>
              <h2 className="text-lg font-semibold">Invite Friends & Earn</h2>
              <p className="text-gray-600">You get Rs.150 for every friend</p>
              <a
                href="#"
                className="text-teal-500 font-semibold hover:underline"
              >
                Invite Now
              </a>
            </div>
            <img
              src="/assets/Checkout/inviteFriends.jpg"
              alt="Invite Friends"
              className="w-16 h-16 object-cover rounded-full"
            />
          </div> */}

          <div className="mt-8">
            <Button className="w-full py-3 text-white font-semibold rounded-md bg-gradient-to-r from-pink-500 to-red-500 hover:bg-gradient-to-l">
              <Link href="/">CONTINUE SHOPPING</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
