"use client";
import WishListBreadCrumb from "@/components/website/WishListComponent/WishListBreadCrumb";
import React, { useState } from "react";
import WishListCard from "@/components/website/WishListComponent/WishListCard";
import { notFound } from "next/navigation";
import useWishList from "@/shared/hooks/useWishList";
import EmptyCard from "@/components/website/CheckoutPageComponent/EmptyCard";

const Page = () => {
  const { wishlistItems, removeFromWishList } = useWishList();

  if (wishlistItems.length === 0)
    return (
      <EmptyCard
      heading={
        <span>
          Your WishList is <span className="text-red-500">Empty!</span>
        </span>
      }
      description="Looks like you have not added any items to the wishList."
    />
    )
  // notFound();
  return (
    <div className="md:p-4 mt-20 mb-20 md:mb-0 md:mt-0 bg-gray-100 h-full">
      {/* Breadcrumb */}
      <WishListBreadCrumb />

      {/* Saved Items Count */}
      <div className="text-sm text-gray-600 mb-4">
        Saved Items:{wishlistItems.length}
      </div>

      {/* Card Container */}

      <div className=" rounded-lg p-4 flex flex-row gap-3 flex-wrap md:grid md:grid-cols-2 ">
        {wishlistItems.map((product, index) => (
          <WishListCard
            key={product._id}
            ProductCheckout={product}
            onRemove={() => removeFromWishList(product._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
