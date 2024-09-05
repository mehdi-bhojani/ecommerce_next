"use client"

import { Session } from "inspector";
import { useSession } from "next-auth/react";
import React from "react";

const AccountName = () => {
  const {data:session} = useSession();
  return (
    <div className=" flex-col mb-2 hidden md:flex">
      <span className="text-xl font-bold">Account</span>
      <span className="text-base font-medium">{session?.user?.name}</span>
    </div>
  );
};

export default AccountName;
