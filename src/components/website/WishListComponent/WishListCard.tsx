import { ChevronDown, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { WishItemType } from "@/lib/types";
import { createSlug, PriceIntoCurrency } from "@/shared/helpers/help";
import useCart from "@/shared/hooks/useCart";
import Link from "next/link";
import EmptyCard from "../CheckoutPageComponent/EmptyCard";
import { useAtom, useStore } from "jotai";
import { storeAtom } from "@/shared/atoms/storeAtom";

interface CheckoutCardProps {
  ProductCheckout: WishItemType;
  onRemove: () => void;
}

const WishListCard: React.FC<CheckoutCardProps> = ({
  ProductCheckout,
  onRemove,
}) => {
  const [myStoreAtom, setStoreAtom] = useAtom(storeAtom);
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
            {PriceIntoCurrency(ProductCheckout.price, myStoreAtom?.storeSettings.currency.default || myStoreAtom?.storeSettings.currency.default || "PKR")}
          </span>
          <span className="md:text-sm text-gray-500 line-through">
            {PriceIntoCurrency(ProductCheckout.mrp, myStoreAtom?.storeSettings.currency.default || myStoreAtom?.storeSettings.currency.default || "PKR")}
          </span>
          <span className="md:text-sm text-pink-700">{`(${ProductCheckout.offer}%)`}</span>
        </div>
        <p className="text-sm font-medium  text-gray-700 max-w-[150px] sm:max-w-[200px] truncate">
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
          <button className="mt-4 bg-primary-gradient text-white font-bold py-2 rounded-md  w-full">
            ADD TO BAG
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WishListCard;
