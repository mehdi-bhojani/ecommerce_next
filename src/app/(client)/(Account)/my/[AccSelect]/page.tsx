"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import AccountSide from "@/components/website/AccountPageComponents/AccountSide";
import OrderSide from "@/components/website/AccountPageComponents/OrderSide";
import RefundSide from "@/components/website/AccountPageComponents/RefundSide";
import PasswordSide from "@/components/website/AccountPageComponents/PasswordSide";
import EarningSide from "@/components/website/AccountPageComponents/EarningSide";
import VoucherSide from "@/components/website/AccountPageComponents/VoucherSide";
import DetailSide from "@/components/website/AccountPageComponents/DetailSide";
import Referral from "@/components/website/AccountPageComponents/Referral";

import { CustomerType } from "@/lib/types";
import ClientLoading from "@/components/myUi/ClientLoading";
import UseCustomerData from "@/shared/hooks/useCustomerData";

const Page = ({ params }: { params: { AccSelect: string } }) => {
  const { data: session } = useSession();
  const {loading, customerData, setCustomerData} = UseCustomerData();
  const router = useRouter();

  const saveCustomer = async (values: CustomerType) => {
    if (!values?._id) return;

    try {
      const res = await fetch(`/api/customer/${values._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Failed to update customer details");

      const data = await res.json();
      toast.success("Details updated successfully");
      const orderHistory = customerData?.orderHistory;
      const newData = { ...customerData, ...data, orderHistory };
      setCustomerData(newData);
    } catch (error) {
      // console.error("Error updating customer details:", error);
      toast.error("Error updating details");
    }
  };

  if(!session) {
    router.push("/signin");
    return;
  }

  if (loading) return <div><ClientLoading /></div>;

  const renderContent = () => {
    switch (params.AccSelect) {
      case "account":
        return <AccountSide />;
      case "orders":
        return <OrderSide ordersData={customerData?.orderHistory!} />;
      case "Refunds":
        return <RefundSide />;
      case "vouchers":
        return <VoucherSide />;
      case "earnings":
        return <EarningSide />;
      case "details":
        return (
          <DetailSide
            customerData={customerData!}
            saveCustomer={saveCustomer}
          />
        );
      case "Change_Password":
        return <PasswordSide />;
      case "referrals":
        return <Referral />;
      default:
        return <div>Error: Page not found</div>;
    }
  };

  return (
    <div>{customerData ? renderContent() : (<ClientLoading />)}</div>
  );
};

export default Page;
