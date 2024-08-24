import React from 'react'
import Grids from './Grids'
import SignOut from './SignOut'

const AccountSide = () => {
  return (
    <div className=" pl-4">
   <div className="bg-gray-100 p-6 rounded-lg flex justify-between items-center">
      <div className="flex items-center">
        <div className="bg-gray-200 w-20 h-20 flex justify-center items-center rounded-lg mr-4">
          <span className="text-4xl font-bold text-gray-400">K</span>
        </div>
        <p className="text-lg font-medium text-gray-700">Khanzada M. Murtaza</p>
      </div>
      <button className="border border-gray-400 text-gray-700 py-2 px-4 rounded-md">
        Edit Profile
      </button>
    </div>
 
    <Grids/>   
  
 <SignOut/>
   
  </div>
  )
}

export default AccountSide