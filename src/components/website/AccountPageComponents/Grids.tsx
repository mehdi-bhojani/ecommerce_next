import { BookUser, Medal, PackageOpen, PencilLine, SquarePen, TicketCheck } from 'lucide-react';
import React from 'react'

const Grids = () => {
    const actions = [
        { title: 'Order', description: 'Check For Order Status', icon: <PackageOpen/> },
        { title: 'Returns & Refunds', description: 'Manage Returns & Refunds', icon: <SquarePen/> },
        { title: 'Vouchers', description: 'Manage Your Vouchers', icon: <TicketCheck/> },
        { title: 'My Earnings', description: 'Manage All Your Earnings', icon: <Medal/> },
        { title: 'Change Password', description: 'Change Your Password', icon: <PencilLine/> },
      ];
    
      return (
        <div className="grid grid-cols-3  sm:grid-cols-2 lg:grid-cols-3 mt-4 gap-6 text-nowrap">
          {actions.map((action, index) => (
            <div key={index} className="bg-white cursor-pointer  shadow-md hover:bg-gray-200 transition duration-300 ease-in p-8 gap-2 flex-nowrap flex flex-col items-center text-center">
             {action.icon}
              <h3 className="text-base font-semibold text-gray-800">{action.title}</h3>
              <p className="text-xs text-gray-500">{action.description}</p>
            </div>
          ))}
        </div>
      );
}

export default Grids