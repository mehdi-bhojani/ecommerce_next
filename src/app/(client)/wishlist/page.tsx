"use client";
import WishListBreadCrumb from "@/components/website/WishListComponent/WishListBreadCrumb";
import React, { useState } from "react";
import WishListCard from "@/components/website/WishListComponent/WishListCard";
import { notFound } from "next/navigation";
const page = () => {
  function Convert_to_Format(num: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  }

  const handleRemove = (index: number) => {
    const updatedCheckout = ProductCheckout.filter(
      (item, i) => item.id !== index
    );
    setProductCheckout(updatedCheckout);
  };

  const [ProductCheckout, setProductCheckout] = useState([
    {
      id: 123,
      OriginalPrice: 2450,
      DiscountedPrice: 4900,
      Discount: -50,
      ProductName: "crinkle satin full sleeve shirt",
      Sizes: ["S", "M", "L", "XL"],
      img: "/assets/Checkout/girlcloth.png",
    },
    {
      id: 657,
      OriginalPrice: 1395,
      DiscountedPrice: 1800,
      Discount: -22,
      ProductName: "crinkle satin full sleeve shirt",
      Sizes: ["Medium", "Large", "XLarge"],
      img: "/assets/Checkout/girlcloth.png",
    },
  ]);

  // notFound();
  return (
    <div className="md:p-4 mt-20 mb-20 md:mb-0 md:mt-0 bg-gray-100 h-full">
      {/* Breadcrumb */}
      <WishListBreadCrumb />

      {/* Saved Items Count */}
      <div className="text-sm text-gray-600 mb-4">
        Saved Items:{ProductCheckout.length}
      </div>

      {/* Card Container */}

      <div className=" rounded-lg p-4 flex flex-row gap-3 flex-wrap  ">
        {ProductCheckout.map((product, index) => (
          <WishListCard
            key={product.id}
            ProductCheckout={product}
            onRemove={() => handleRemove(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
