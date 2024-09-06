import { ChevronDown, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'


interface ProductCheck {
    id: number;
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




const WishListCard: React.FC<CheckoutCardProps> = ({ ProductCheckout, onRemove }) => {
    const [selectedSize, setSelectedSize] = useState('S');
    const [quantity, setQuantity] = useState(1);



    const handleSizeSelect = (size: string) => {
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
       
        // You can add any side effects here, e.g., update a database, notify other components, etc.
    }, [selectedSize]); // This effect runs whenever selectedSize changes

    // useEffect to handle changes in quantity
    useEffect(() => {
       
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
        <div className="flex items-start p-2  bg-white  shadow-md flex-1 ">
            <Image
                src={`${ProductCheckout.img}`}
                alt="Crinkle Satin Full Sleeve Shirt"
                width={100}
                height={100}
                className="object-cover rounded-md mr-4"
            />
            <div className="flex-1">
                <div className="flex md:items-center gap-2 flex-col md:flex-row ">
                    <span className="md:text-lg font-semibold">{Price}</span>
                    <span className="md:text-sm text-gray-500 line-through">{DiscountedPrice}</span>
                    <span className="md:text-sm text-pink-700">{`(${ProductCheckout.Discount}%)`}</span>
                </div>
                <p className="text-sm font-medium  text-gray-700 max-w-[200px] truncate">{ProductCheckout.ProductName}</p>
                <div className="flex flex-row mt-2">

                    





                </div>

                <button onClick={() => {
                onRemove(); // Call the onRemove function

            }} className="flex items-center mt-4 text-gray-500 font-bold">
                <Trash2 />
                Remove
            </button >
                
            <button className="mt-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold py-2 rounded-md w-full">
                ADD TO BAG
            </button>
            </div>
           
          
        </div>

    )
}

export default WishListCard