import { ChevronDown, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SidebarCheckout from "./SidebarCheckout";
import { CartItemType } from "@/lib/types";
import { PriceIntoCurrency } from "@/shared/helpers/help";

interface ProductCheck {
  id: number;
  mrp: number;
  price: number;
  offer: number;
  name: string;
  allSizes: string[];
  imgSrc: string;
}

interface CheckoutCardProps {
  ProductCheckout: CartItemType;
  onRemove: (_id: string) => Promise<void>;
  totalAmount?: number;
}

const CheckoutCard: React.FC<CheckoutCardProps> = ({
  ProductCheckout,
  onRemove,
  totalAmount,
}) => {
  const [selectedSize, setSelectedSize] = useState("S");
  const [quantity, setQuantity] = useState(1);

  const handleallSizeselect = (size: string) => {
    setSelectedSize(size);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    setSelectedSize(ProductCheckout.SelectSize!);
    setQuantity(ProductCheckout.quantity);
  }, [ProductCheckout]);

  useEffect(() => {
    
  }, [selectedSize]); // This effect runs whenever selectedSize changes

  // useEffect to handle changes in quantity
  useEffect(() => {
  
    // You can add any side effects here, e.g., update a database, notify other components, etc.
  }, [quantity]); // This effect runs whenever quantity changes

  return (
    <div className="flex items-start mb-6">
      <Image
        src={`${ProductCheckout.imgSrc}`}
        alt="Crinkle Satin Full Sleeve Shirt"
        width={100}
        height={100}
        className="object-cover rounded-md mr-4"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2 ">
          <span className="text-lg font-semibold">
            {PriceIntoCurrency(ProductCheckout.price, "PKR")}
          </span>
          <span className="text-sm text-gray-500 line-through">
            {PriceIntoCurrency(ProductCheckout.mrp, "PKR")}
          </span>
          <span className="text-sm text-pink-700">{`(${ProductCheckout.offer}%)`}</span>
        </div>
        <p className="text-sm font-medium  text-gray-700 max-w-[200px] truncate">
          {ProductCheckout.name}
        </p>
        <div className="flex items-center mt-2">
          <SidebarCheckout
            ProductCheckout={ProductCheckout}
            sizes={ProductCheckout.allSizes!}
            handleSizeSelect={handleallSizeselect}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            quantity={quantity}
            selectedSize={selectedSize}
          >
            <div className="mr-4 ml-1 p-2 border rounded-md flex flex-row items-center gap-1">
              <label className="text-sm text-gray-600 ">Variant: </label>
              <span className="font-bold">{selectedSize}</span>
              <ChevronDown size={15} />
            </div>
          </SidebarCheckout>
          x
          <SidebarCheckout
            ProductCheckout={ProductCheckout}
            sizes={ProductCheckout.allSizes!}
            handleSizeSelect={handleallSizeselect}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            quantity={quantity}
            selectedSize={selectedSize}
          >
            <div className="mr-4 ml-1 p-2 border rounded-md flex flex-row items-center gap-1">
              <label className="text-sm text-gray-600 ">Qty: </label>
              <span className="font-bold">{quantity}</span>
              <ChevronDown size={15} />
            </div>
          </SidebarCheckout>
        </div>
        <button
          onClick={() => {
            onRemove(ProductCheckout._id!); // Call the onRemove function
          }}
          className="flex items-center mt-4 text-gray-500 font-bold"
        >
          <Trash2 />
          Remove
        </button>
      </div>
    </div>
  );
};

export default CheckoutCard;
