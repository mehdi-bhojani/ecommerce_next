import { Copy, Gift, Ticket } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Separator } from '@/components/ui/separator';
import Sidebar3 from './Sidebar3';
const Referral = () => {
    const [copy, setcopy] = useState(false)

    function ShowMsg(){
        if(copy==true){
            toast.success('Link copied to your clipboard',{position:'top-center',autoClose:1000 , hideProgressBar: true,
              closeOnClick: true});
          }
    }

    useEffect(() => {
     if(copy==true){
        ShowMsg();
     }
      }, [copy]); // Dependency array listens for changes in 'copy'
    return (
        <div className="p-6">
            <div className="flex justify-center mb-6 w-full text-center">

                <span className="text-2xl font-semibold">Referrals</span>
            </div>

            <div className="p-4 space-y-4">
                {/* Apply Referral Code */}
                <div className="flex items-center space-x-2 text-gray-700">
                    <Ticket className="text-lg" />
                    <span className="font-semibold">Apply Referral Code</span>
                </div>

                {/* Invite Friends */}
                <div className="flex  space-x-2 text-gray-700  items-start">
                    <Gift className="text-lg" />

                    <div className='flex flex-row w-full justify-between'>

                 
                    <div className='flex flex-col gap-2'>
                        <span className="font-semibold">Invite Friends, Get Rs. 150</span>
                        <div className='flex flex-row gap-3'>
                            <span className="font-semibold">  Share your code{' '}  <span className="font-bold text-gray-800">H7cur </span> </span>
                            <Copy onClick={()=>{setcopy(true),ShowMsg()}} className= {`text-lg ${copy ?'text-green-500':'text-blue-500'} cursor-pointer `} />
                        </div>
                    </div>


                    <div className="flex items-center space-x-2 text-gray-700">
                        <Sidebar3>
                    <span className="text-blue-500 font-semibold">Share</span>
                    </Sidebar3>
                </div>
                    </div>


                </div>

                {/* Share Code */}
               
            </div>

             <Separator/>
             <Separator/>
        </div>
    )
}

export default Referral