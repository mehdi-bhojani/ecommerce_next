"use client";
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import SignOut from "./SignOut";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
const LeftSide = () => {
  const param = useParams<{ AccSelect?: string }>();
  const { AccSelect } = param;
  const [Focus, setFocus] = useState(AccSelect);

  return (
    <div className="w-5/12 pr-4 text-nowrap hidden md:block p-5">
      <Link
        href={"/my/account"}
        onClick={() => setFocus("account")}
        className="py-4 "
      >
        <span
          className={`transition-all duration-75 ease-in ${
            Focus === "account"
              ? " text-green-500 font-bold"
              : "text-gray-600 font-light"
          } `}
        >
          Account Overview
        </span>
      </Link>

      <div className="hidden">
        <Separator className="my-4" />
        <Link href={"/my/referrals"} onClick={() => setFocus("referrals")}>
          <span className="text-lg text-gray-400 font-semibold mb-2">
            REFERRALS
          </span>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <span
                className={`text-base transition-all duration-75 ease-in  text-gray-700 ${
                  Focus === "referrals" ? " font-bold" : "text-black"
                }   `}
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

      <Separator className="my-4" />
      <div className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-600">ORDERS</h4>
          <Link
            href={"/my/orders"}
            onClick={() => setFocus("orders")}
            className={`transition-all duration-75 ease-in text-sm text-gray-600 block ${
              Focus === "orders"
                ? " text-green-500 font-bold"
                : "text-gray-600 font-light"
            } `}
          >
            My Orders
          </Link>
          <Link
            href={"/my/Refunds"}
            onClick={() => setFocus("Refunds")}
            className={`transition-all duration-75 ease-in text-sm text-gray-600 hidden ${
              Focus === "Refunds"
                ? " text-green-500 font-bold"
                : "text-gray-600 font-light"
            } `}
          >
            Return & Refunds
          </Link>
        </div>
        <Separator className="my-2" />
        <div className="space-y-2 hidden">
          <h4 className="text-sm font-semibold text-gray-600">CREDITS</h4>
          <Link
            href={"/my/vouchers"}
            onClick={() => setFocus("vouchers")}
            className={`transition-all duration-75 ease-in text-sm text-gray-600 block ${
              Focus === "vouchers"
                ? " text-green-500 font-bold"
                : "text-gray-600 font-light"
            } `}
          >
            Vouchers
          </Link>
          <Link
            href={"/my/earnings"}
            onClick={() => setFocus("earnings")}
            className={`transition-all duration-75 ease-in   text-sm text-gray-600 block ${
              Focus === "earnings"
                ? " text-green-500 font-bold"
                : "text-gray-600 font-light"
            } `}
          >
            My Earnings
          </Link>
          <Separator className="my-2" />
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-600">ACCOUNT</h4>
          <Link
            href={"/my/details"}
            onClick={() => setFocus("details")}
            className={`transition-all duration-75 ease-in text-sm text-gray-600 block ${
              Focus === "details"
                ? " text-green-500 font-bold"
                : "text-gray-600 font-light"
            } `}
          >
            My Details
          </Link>
          <Link
            href={"/my/Change_Password"}
            onClick={() => setFocus("Change_Password")}
            className={`transition-all duration-75 ease-in text-sm text-gray-600 block ${
              Focus === "Change_Password"
                ? " text-green-500 font-bold"
                : "text-gray-600 font-light"
            } `}
          >
            Change Password
          </Link>
          <button className="bg-transparent text-red-600 flex gap-2" onClick={() => signOut()}>
            <LogOut /> Signout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
