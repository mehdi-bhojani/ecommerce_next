import React, { FC, useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { ProductType } from "@/lib/types";
import { createSlug, PriceIntoCurrency } from "@/shared/helpers/help";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    mrp: number;
    img: string[];
    offer: number;
  };
}

const ProductCard: FC<ProductCardProps> = ({ product}) => {
  const [activeHearts, setActiveHearts] = useState(new Set());

  const toggleHeart = () => {
    // setActiveHearts((prevActiveHearts) => {
    //   const newActiveHearts = new Set(prevActiveHearts);
    //   if (newActiveHearts.has(id)) {
    //     newActiveHearts.delete(id);
    //   } else {
    //     newActiveHearts.add(id);
    //   }
    //   return newActiveHearts;
    // });
  };
  const router = useRouter();
  const handleClick = () => {
    router.push(`/product/${createSlug(product?.name)}id=${product?._id}`);
  };

  return (
    <div
      className="border border-gray-200 shadow-lg pb-3 rounded-sm relative w-full"
      onClick={handleClick}
    >
      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
        -{product?.offer}
      </div>
      <Image
        className="w-full h-full"
        width={500}
        height={500}
        src={product?.img[0] ?? "/fallbackImage.jpg"}
        alt={product?.name ?? ""}
      />
      <div className="absolute top-2 right-2">
        <div className="relative w-10 h-10 bg-white opacity-85 rounded-full flex items-center justify-center shadow-md icon-wrapper cursor-pointer">
          <Heart
            onClick={() => toggleHeart()}
            size={19}
            className={"text-gray-500 icon"}
          />
        </div>
      </div>
      <div className="p-2 mb-3">
        {/* <p className="text-sm text-gray-500 uppercase">{product?.brandName}</p> */}
        <p className="text-md capitalize truncate">{product?.name}</p>
        <div className="flex items-center space-x-2">
          <p className="text-gray-500 line-through text-sm">
            {PriceIntoCurrency(product?.mrp, "PKR")}
          </p>
          <p className="text-red-500 font-bold text-sm">
            {PriceIntoCurrency(product?.price, "PKR")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
