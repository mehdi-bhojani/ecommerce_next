import React from 'react'

export default function Page() {
  return (
    <div>
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center text-pink-600 mb-8">Hi. How can we help?</h1>
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-r from-pink-500 to-orange-400 p-4 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 4a1 1 0 000 2h14a1 1 0 100-2H3zm0 4a1 1 0 000 2h14a1 1 0 100-2H3zm0 4a1 1 0 000 2h14a1 1 0 100-2H3zm0 4a1 1 0 000 2h14a1 1 0 100-2H3z" />
              </svg>
            </div>
            <p className="mt-4 text-center">Shipping & Delivery</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-r from-pink-500 to-orange-400 p-4 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 4.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5V7H9V4.5zM6.5 7h-2V4.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5V7zm8 0h-2V4.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5V7zm.5 1h-13v7.5c0 .828.672 1.5 1.5 1.5H6v-3.5c0-.828.672-1.5 1.5-1.5h5c.828 0 1.5.672 1.5 1.5V16h2.5c.828 0 1.5-.672 1.5-1.5V8zm-6.5 2.5c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5V10h3v.5zM7 15.5h3V14H7v1.5zm4.5 0H15V14h-3.5v1.5z" />
              </svg>
            </div>
            <p className="mt-4 text-center">Returns & Replacements</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-r from-pink-500 to-orange-400 p-4 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 7a4 4 0 100-8 4 4 0 000 8zm7 2h-2v-.5c0-.828-.672-1.5-1.5-1.5h-7c-.828 0-1.5.672-1.5 1.5V9H5a1 1 0 000 2h1v6.5C6 18.328 6.672 19 7.5 19h5c.828 0 1.5-.672 1.5-1.5V11h1a1 1 0 100-2zm-2 6H7v-5h6v5zm-1.5 1h-3a.5.5 0 110-1h3a.5.5 0 110 1z" />
              </svg>
            </div>
            <p className="mt-4 text-center">Cancellations</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-r from-pink-500 to-orange-400 p-4 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a1 1 0 000 2h12a1 1 0 100-2H4zm0 4a1 1 0 000 2h12a1 1 0 100-2H4zm0 4a1 1 0 000 2h12a1 1 0 100-2H4zm0 4a1 1 0 000 2h12a1 1 0 100-2H4z" />
              </svg>
            </div>
            <p className="mt-4 text-center">Payments & Refunds</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-r from-pink-500 to-orange-400 p-4 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 3a1 1 0 011-1h10a1 1 0 011 1v4h1V3a2 2 0 00-2-2H4a2 2 0 00-2 2v14a2 2 0 002 2h8v-2H4V3zm15 8a1 1 0 00-1-1h-1v-1a3 3 0 00-3-3H8a3 3 0 00-3 3v1H4a1 1 0 000 2h10a1 1 0 000-2zm-6 0H8v-1a1 1 0 012 0v1zm7 4v1h-4v2h4v1a1 1 0 001 1h1v-1h-1v-2h1v-1h-1a1 1 0 00-1-1zm-2 1h-1v1h1v-1z" />
              </svg>
            </div>
            <p className="mt-4 text-center">Business Inquiry & Bulk Orders</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-r from-pink-500 to-orange-400 p-4 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 2a4 4 0 100 8 4 4 0 000-8zm0 7A3 3 0 118 3a3 3 0 010 6zm5-5a1 1 0 011 1v5.586L11.707 7.293a1 1 0 00-1.414 1.414L11.586 10H8a1 1 0 100 2h4a1 1 0 000-2h-2.586l2.293-2.293a1 1 0 001.414 1.414L14 10.586V5a1 1 0 00-1-1zm-5 8a3 3 0 00-3 3v2a1 1 0 001 1h8a1 1 0 001-1v-2a3 3 0 00-3-3H8zm-1 2h6v1H7v-1z" />
              </svg>
            </div>
            <p className="mt-4 text-center">Account Settings</p>
          </div>
        </div>
        <h2 className="text-xl font-bold text-center text-gray-700">Frequently Asked Questions</h2>
      </div>
    </div>


    </div>
  )
}
