import { ChevronDown, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import SidebarCheckout from './SidebarCheckout';

interface ProductCheck {
  id:number;
  OriginalPrice: number;
  DiscountedPrice: number;
  Discount: number;
  ProductName: string;
  Sizes: string[];
  img: string;
}

interface CheckoutCardProps {
  ProductCheckout: ProductCheck,
  onRemove: () => void;
}




const CheckoutCard: React.FC<CheckoutCardProps> = ({ ProductCheckout, onRemove }) => {
  const [selectedSize, setSelectedSize] = useState('S');
const [quantity, setQuantity] = useState(1);

const sizes = ['S', 'M', 'L', 'Unstitched', 'Stitched S', 'Stitched M', 'Stitched L'];

const handleSizeSelect = (size:string) => {
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
  console.log(`Selected size is now: ${selectedSize}`);
  // You can add any side effects here, e.g., update a database, notify other components, etc.
}, [selectedSize]); // This effect runs whenever selectedSize changes

// useEffect to handle changes in quantity
useEffect(() => {
  console.log(`Quantity is now: ${quantity}`);
  // You can add any side effects here, e.g., update a database, notify other components, etc.
}, [quantity]); // This effect runs whenever quantity changes

const Price = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PKR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
}).format(ProductCheckout.OriginalPrice);


const DiscountedPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PKR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
}).format(ProductCheckout.DiscountedPrice);

  return (
    <div className="flex items-start mb-6">
      <Image
        src={`${ProductCheckout.img}`}
        alt="Crinkle Satin Full Sleeve Shirt"
        width={100}
        height={100}
        className="object-cover rounded-md mr-4"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2 ">
          <span className="text-lg font-semibold">{Price}</span>
          <span className="text-sm text-gray-500 line-through">{DiscountedPrice}</span>
          <span className="text-sm text-pink-700">{`(${ProductCheckout.Discount}%)`}</span>
        </div>
        <p className="text-sm font-medium  text-gray-700 max-w-[200px] truncate">{ProductCheckout.ProductName}</p>
        <div className="flex items-center mt-2">
        <SidebarCheckout sizes={sizes}   handleSizeSelect={handleSizeSelect}  increaseQuantity={increaseQuantity}   decreaseQuantity={decreaseQuantity} quantity={quantity} selectedSize={selectedSize} >
          <div className="mr-4 ml-1 p-2 border rounded-md flex flex-row items-center gap-1">
            <label className="text-sm text-gray-600 ">Variant: </label>
            <span className="font-bold">
              {selectedSize}
            </span>
            <ChevronDown size={15} />


          </div>
          </SidebarCheckout>
          <SidebarCheckout  sizes={sizes}   handleSizeSelect={handleSizeSelect}  increaseQuantity={increaseQuantity}   decreaseQuantity={decreaseQuantity} quantity={quantity} selectedSize={selectedSize}>
          <div className="mr-4 ml-1 p-2 border rounded-md flex flex-row items-center gap-1">
            <label className="text-sm text-gray-600 ">Qty: </label>
            <span className="font-bold">
             {quantity}
            </span>
            <ChevronDown size={15} />


          </div>
          </SidebarCheckout>
        </div>
        <button  onClick={() => {
    onRemove(); // Call the onRemove function
  
  }} className="flex items-center mt-4 text-gray-500 font-bold">
          <Trash2 />
          Remove
        </button >
      </div>
    </div>
  )
}

export default CheckoutCard