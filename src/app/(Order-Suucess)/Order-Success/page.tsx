import { Button } from '@/components/ui/button'
import SuccessBreadCrumb from '@/components/website/CheckoutPageComponent/SuccessBreadCrumb'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div>
            <SuccessBreadCrumb />
            <div className="max-w-4xl mx-auto my-10 p-6 bg-white  ">
                {/* Order Placed Section */}
                <div className="flex flex-col items-center justify-center">
                    <div className="text-green-500 text-5xl mb-2">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h1 className="text-2xl font-semibold">Order Placed</h1>
                    <p className="text-gray-600">Total price for 1 item is Rs 1,545</p>
                </div>

                {/* Order ID Section */}
                <div className="mt-8 flex justify-between items-center border-t pt-4">
                    <span className="text-gray-500">Order ID 2436570231281</span>
                    <button className="text-black flex flex-row focus:outline-none font-bold">View Details <ChevronRight/></button>
                </div>

                {/* Expected Delivery Section */}
                <div className="mt-6 bg-gray-100 p-4 rounded-md">
                    <h2 className="text-lg font-semibold">Expected Delivery</h2>
                    <div className="flex items-center mt-4">
                        <img
                            src="/assets/Checkout/girlcloth.png"
                            alt="Product"
                            className="w-16 h-26 object-cover rounded-md mr-4"
                        />
                        <div>
                            <p className="text-green-500 font-semibold">1-4 days</p>
                            <p className="text-gray-700">Max Dri-Fit Tanktop</p>
                            <p className="text-gray-500">Qty: 1</p>
                            <p className="text-gray-500">Size: Medium</p>
                        </div>
                    </div>
                </div>
                <div className=" mx-auto my-10   ">
                    {/* Invite Friends & Earn Section */}
                    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
                        <div>
                            <h2 className="text-lg font-semibold">Invite Friends & Earn</h2>
                            <p className="text-gray-600">You get Rs.150 for every friend</p>
                            <a href="#" className="text-teal-500 font-semibold hover:underline">
                                Invite Now
                            </a>
                        </div>
                        <img
                            src="/assets/Checkout/inviteFriends.jpg"
                            alt="Invite Friends"
                            className="w-16 h-16 object-cover rounded-full"
                        />
                    </div>

                    {/* Continue Shopping Button */}
                    <div className="mt-8">
                        <Button className="w-full py-3 text-white font-semibold rounded-md bg-gradient-to-r from-pink-500 to-red-500 hover:bg-gradient-to-l">
                            <Link href='/'>
                            CONTINUE SHOPPING
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default page