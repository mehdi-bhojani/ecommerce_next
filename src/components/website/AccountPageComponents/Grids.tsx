import {
  BookUser,
  Medal,
  MessageCircleQuestion,
  PackageOpen,
  PencilLine,
  SquarePen,
  TicketCheck,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
// {(AccSelect ==='account')?<AccountSide/> :(AccSelect==='orders')?<OrderSide/>:(AccSelect==='Refunds')?<RefundSide/>:(AccSelect==='vouchers')?<VoucherSide/>:(AccSelect==='earnings')?<EarningSide/>:(AccSelect==='details')?<DetailSide/>:(AccSelect==='Change_Password')?<PasswordSide/>:(AccSelect==='referrals')?<Referral/>:'error'}
const Grids = () => {
  const actions = [
    {
      title: "Order",
      description: "Check For Order Status",
      icon: <PackageOpen />,
      url: "/my/orders",
    },
    {
      title: "Returns & Refunds",
      description: "Manage Returns & Refunds",
      icon: <SquarePen />,
      url: "/my/Refunds",
    },
    {
      title: "Vouchers",
      description: "Manage Your Vouchers",
      icon: <TicketCheck />,
      url: "/my/vouchers",
    },
    // {
    //   title: "My Earnings",
    //   description: "Manage All Your Earnings",
    //   icon: <Medal />,
    //   url: "/my/earnings",
    // },
    {
      title: "Change Password",
      description: "Change Your Password",
      icon: <PencilLine />,
      url: "/my/Change_Password",
    },
    {
      title: "My Details",
      description: "Add your Details",
      icon: <BookUser />,
      url: "/my/details",
    },
  ];

  return (
    <div className="grid md:grid-cols-3   mt-4 gap-6 text-nowrap">
      <div className="bg-white cursor-pointer shadow-md p-8 md:hidden">
        <Link href={"/my/referrals"}>
          <span className="text-lg text-gray-400 font-semibold mb-2">
            REFERRALS
          </span>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <span
                className={`text-base transition-all duration-75 ease-in  text-gray-700 ${"text-black"}   `}
              >
                Total Earning
              </span>
              <span className="text-lg font-bold text-gray-800">Rs. 0</span>
            </div>

            <Image
              src="/assets/Account/Coins.png"
              alt="Coins"
              className="w-12 h-12"
              width={100}
              height={100}
            />
          </div>

          <hr className="border-t-2 border-red-100 my-2" />
          <span className="text-xs  text-gray-500">
            Earn Up To Rs. 1 Lakh By Inviting All Your Contacts
          </span>
        </Link>
      </div>

      {actions.map((action, index) => (
        <div key={index}>
          <Link href={action.url}>
            <div className="bg-white cursor-pointer  shadow-md hover:bg-gray-200 transition duration-300 ease-in p-8 gap-2 flex-nowrap flex flex-col items-center text-center">
              {action.icon}
              <h3 className="text-base font-semibold text-gray-800">
                {action.title}
              </h3>
              <p className="text-xs text-gray-500">{action.description}</p>
            </div>
          </Link>
        </div>
      ))}

      <Link href={"/help-center"}>
        <div className="bg-white cursor-pointer  shadow-md hover:bg-gray-200 transition duration-300 ease-in p-8 gap-2 flex-nowrap flex flex-col items-center text-center">
          {<MessageCircleQuestion />}
          <h3 className="text-base font-semibold text-gray-800">Help Center</h3>
          <p className="text-xs text-gray-500">Customer Care Center</p>
        </div>
      </Link>
    </div>
  );
};

export default Grids;
