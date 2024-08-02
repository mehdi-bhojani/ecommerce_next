"use client"
import React, { ReactNode } from 'react'
import { useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  type SidebarProps = {
    children: ReactNode;
  };
  
  const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    const [isResetPassword, setIsResetPassword] = useState(false);
  const [CreateAccount, setCreateAccount] = useState(false);


  const showCreateAccount = () => {
    setCreateAccount(true);
  }

  const showResetPassword = () => {
    setIsResetPassword(true);
  };

  const showLogin = () => {
    setIsResetPassword(false);
    setCreateAccount(false);
  }
  return (
    <div > <Sheet >
    <SheetTrigger  asChild className='cursor-pointer'>
    {children}
    </SheetTrigger>
    <SheetContent className='' >
      <SheetHeader>
        <SheetTitle>Login or Signup</SheetTitle>
      </SheetHeader>
      <div className='mt-16 ' >
        <div className='text-center w-full'>
          <span >Get access to your Wishlist</span>
        </div>
        {!isResetPassword && !CreateAccount ? (
          <div>


            <div className='w-full flex flex-row gap-2 justify-around mt-6'>
              <button className='bg-gray-100 rounded-lg w-1/2 flex justify-center h-14 items-center'>
                <svg className='w-8' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
                  <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
              </button>
              <button className='bg-gray-100 rounded-lg w-1/2 flex justify-center items-center'>
                <svg className='w-8' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
                  <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                </svg>
              </button>
            </div>

            <div className="flex items-center justify-center my-9">
              <div className="border-t border-gray-400 flex-grow"></div>
              <span className="mx-4 text-gray-600">OR</span>
              <div className="border-t border-gray-400 flex-grow"></div>
            </div>

            <div className="max-w-sm mx-auto p-4">

              <input type="email" placeholder="Email" className="w-full p-2 mb-4 border border-black" />


              <input type="password" placeholder="Password" className="w-full p-2 mb-2 border border-gray-300" />


              <a href="#" className="text-gray-600 mb-4 block" onClick={showResetPassword}>Forgot Password?</a>


              <button className="w-full py-2 mb-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold">
                LOGIN WITH EMAIL
              </button>


              <div className="flex items-center justify-center my-4">
                <div className="border-t border-gray-400 flex-grow"></div>
                <span className="mx-4 text-gray-600">OR</span>
                <div className="border-t border-gray-400 flex-grow"></div>
              </div>


              <button className="w-full py-2 mb-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold">
                GUEST CHECKOUT
              </button>


              <a href="#" className="text-gray-600 block text-center" onClick={showCreateAccount}>New to Clicky? Create an account</a>
            </div>
          </div>


        ) : CreateAccount ? (
          <div>
            <input type="email" placeholder="Email" className="w-full p-2 mt-8 mb-2 border border-black" />
            <input type="phone" placeholder="Phone" className="w-full p-2 my-2 border border-black" />
            <input type="password" placeholder="Password" className="w-full p-2 my-2 border border-black" />
            <button className="w-full py-2 mb-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold">
              SIGN UP WITH EMAIL
            </button>
            <a href="#" className="text-gray-600 block text-center" onClick={showLogin} >Already have an account ? Login</a>
          </div>



        ) : isResetPassword ? (
          <div>
            <input type="email" placeholder="Email" className="w-full p-2 my-8 border border-black" />
            <button className="w-full py-2 mb-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold">
              RESET PASSWORD
            </button>
            <a href="#" className="text-gray-600 block text-center" onClick={showLogin} >Back to Login</a>
          </div>

        ) : ''}

















      </div>
    </SheetContent>
  </Sheet></div>
  )
}
  

export default Sidebar