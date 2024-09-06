import React, { ReactNode, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog"


  type SidebarProps = {
    children: ReactNode;
};


const CouponDialog: React.FC<SidebarProps> =({children}) => { 

    const [couponCode, setCouponCode] = useState('');

    const handleApplyCoupon = () => {
    
    };
  
  return (
    <Dialog>
    <DialogTrigger asChild>
      {children}
    </DialogTrigger>
    <DialogContent className="w-3/4 h-1/2">

    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white rounded-lg w-full h-full p-6">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold">APPLY COUPON</h2>
        
        </div>
        
        <div className="mb-12 text-center text-gray-600">
          <p>Nothing Here!</p>
        </div>
        
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400"
            placeholder="Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
        </div>

        <button
          onClick={handleApplyCoupon}
          className="w-full py-3 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600 focus:outline-none"
        >
          Apply Coupon
        </button>
      </div>
    </div>

    </DialogContent>
  </Dialog>
  )
}

export default CouponDialog