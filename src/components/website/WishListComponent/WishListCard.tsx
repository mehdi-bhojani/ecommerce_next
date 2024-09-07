import { ChevronDown, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { WishItemType } from "@/lib/types";
import { createSlug, PriceIntoCurrency } from "@/shared/helpers/help";
import useCart from "@/shared/hooks/useCart";
import Link from "next/link";
import EmptyCard from "../CheckoutPageComponent/EmptyCard";

interface CheckoutCardProps {
  ProductCheckout: WishItemType;
  onRemove: () => void;
}

const WishListCard: React.FC<CheckoutCardProps> = ({
  ProductCheckout,
  onRemove,
}) => {

  return (
    <div className="flex items-start p-2  bg-white  shadow-md flex-1 ">
      <Image
        src={`${ProductCheckout.imgSrc}`}
        alt={ProductCheckout.name}
        width={100}
        height={100}
        className="object-cover rounded-md mr-4"
      />
      <div className="flex-1">
        <div className="flex md:items-center gap-2 flex-col md:flex-row ">
          <span className="md:text-lg font-semibold">
            {PriceIntoCurrency(ProductCheckout.price, "PKR")}
          </span>
          <span className="md:text-sm text-gray-500 line-through">
            {PriceIntoCurrency(ProductCheckout.mrp, "PKR")}
          </span>
          <span className="md:text-sm text-pink-700">{`(${ProductCheckout.offer}%)`}</span>
        </div>
        <p className="text-sm font-medium  text-gray-700 max-w-[200px] truncate">
          {ProductCheckout.name}
        </p>
        <div className="flex flex-row mt-2"></div>

        <button
          onClick={() => {
            onRemove(); // Call the onRemove function
          }}
          className="flex items-center mt-4 text-gray-500 font-bold"
        >
          <Trash2 />
          Remove
        </button>

        <Link
          href={`/product/${createSlug(ProductCheckout.name)}?id=${
            ProductCheckout._id
          }`}
        >
          <button className="mt-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold py-2 rounded-md w-full">
            ADD TO BAG
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WishListCard;
