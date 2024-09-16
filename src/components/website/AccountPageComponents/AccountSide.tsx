import React from "react";
import Grids from "./Grids";
import SignOut from "./SignOut";
import Link from "next/link";
import { useSession } from "next-auth/react";

const AccountSide = () => {
  const {data : session } = useSession();
  return (
    <div className=" pl-4">
      <div className="bg-gray-100 p-6 rounded-lg flex-col sm:flex-row flex justify-between items-center w-full">
        <div className="flex items-center">
          <div className="bg-gray-200 w-20 h-20  justify-center items-center rounded-lg mr-4 hidden md:flex">
            <span className="text-4xl font-bold text-gray-400 ">{session?.user?.name?.charAt(0)}</span>
          </div>
          <p className="text-lg font-medium text-gray-700 truncate w-full">
            {session?.user?.name}
          </p>
        </div>
        <Link href={"/my/details"}>
          <button className="border border-gray-400 text-gray-700 py-2 px-4 rounded-md">
            Edit Profile
          </button>
        </Link>
      </div>
      <Grids />
    </div>
  );
};

export default AccountSide;
