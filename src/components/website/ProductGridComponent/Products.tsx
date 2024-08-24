import React, { FC, useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { ProductType } from "@/lib/types";

interface ProductCardProps {
  // product?: {
  //   id: number,
  //   brandName: string,
  //   name: string,
  //   subCategory: string,
  //   Category: string,
  //   Type: string,
  //  .mr?.mrp: number,
  //   discountedPrice: number,
  //   discount: string,
  //   sizes: string[],
  //   slots: { size: string; quantity: number; }[]; // Allow multiple elements
  //   images: string[]
  // },
  product: ProductType;
  key: number;
}

const ProductCard: FC<ProductCardProps> = ({ product, key }) => {
  const [activeHearts, setActiveHearts] = useState(new Set());

  const toggleHeart = (id: number) => {
    setActiveHearts((prevActiveHearts) => {
      const newActiveHearts = new Set(prevActiveHearts);
      if (newActiveHearts.has(id)) {
        newActiveHearts.delete(id);
      } else {
        newActiveHearts.add(id);
      }
      return newActiveHearts;
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-1 relative w-full">
      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
        -{product?.offer}
      </div>
      <Image
        className="mb-2 w-full h-full"
        width={200}
        height={200}
        src={product?.img[0] ?? "/fallbackImage.jpg"}
        alt={product?.name ?? ""}
      />
      <div className="absolute top-2 right-2">
        <div className="relative w-10 h-10 bg-white opacity-85 rounded-full flex items-center justify-center shadow-md icon-wrapper cursor-pointer">
          <Heart
            key={key}
            onClick={() => toggleHeart(key)}
            id={product?._id?.toString()}
            size={19}
            className={`text-gray-500 icon ${
              activeHearts.has(key) ? "active" : "text-gray-500"
            }`}
          />
        </div>
      </div>
      <div className="mt-4">
        {/* <p className="text-sm text-gray-500 uppercase">{product?.brandName}</p> */}
        <p className="text-lg font-semibold">{product?.name}</p>
        <div className="flex items-center space-x-2">
          <p className="text-gray-500 line-through">Rs {product?.mrp}</p>
          <p className="text-red-500 font-bold">Rs {product?.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
