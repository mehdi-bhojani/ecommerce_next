import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cartItemsAtom } from "@/shared/atoms/cartAtom";
import { PriceIntoCurrency } from "@/shared/helpers/help";
import { useAtom } from "jotai";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useCart from "@/shared/hooks/useCart";

function HoverCart() {
  const [cartItems, setCartItems] = useAtom(cartItemsAtom);
  const { getTotalPrice, removeFromCart } = useCart();
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
   
    setSubTotal(getTotalPrice());
  }, [cartItems]);

  return (
    <div>
      <HoverCard openDelay={100} closeDelay={50}>
        <HoverCardTrigger asChild>
          <Link href="/checkout">
            <ShoppingCart className="cursor-pointer " />
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className="w-full relative right-5">
          <div className="w-full max-w-md bg-white shadow-md rounded-md p-4">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-xl font-semibold">
                My Bag,{" "}
                <span className="font-normal text-gray-600">
                  {cartItems.length} Item
                </span>
              </h2>
              <button className="text-2xl">&times;</button>
            </div>

            {/* Item Details */}
            {cartItems.map((item, index) => {
              return (
                <div className="flex py-4 border-b" key={index}>
                  <Image
                    src={item.imgSrc}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="ml-4 flex-1">
                    <p className="text-lg font-semibold">
                      {PriceIntoCurrency(item.price, "PKR")}
                    </p>
                    <p className="text-sm text-gray-600">Qty {item.quantity}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-sm font-semibold text-red-600"
                  >
                    REMOVE
                  </button>
                </div>
              );
            })}

            {/* Subtotal Section */}
            <div className="flex justify-between items-center py-4 border-b">
              <p className="text-md font-medium">Sub-total</p>
              <p className="text-md font-semibold">
                {PriceIntoCurrency(subTotal, "PKR")}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-4 gap-2">
              <button className="border-2 border-black text-black font-semibold py-2 px-6 ">
                <Link href={"/checkout"}>VIEW BAG</Link>
              </button>
              <button className="bg-black text-white font-semibold py-2 px-6 ">
                <Link href={"/checkout"}>CHECKOUT</Link>
              </button>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}

export default HoverCart;
