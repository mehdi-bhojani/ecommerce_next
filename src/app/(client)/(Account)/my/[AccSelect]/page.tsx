"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
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

const Page = ({ params }: { params: { AccSelect: string } }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [customerData, setCustomerData] = useState<CustomerType | null>(null);

  useEffect(() => {
    const getCustomerByUser = async () => {
      if (!session?.user?._id) return;

      try {
        const res = await fetch(`/api/customer/user/${session.user._id}`);
        if (!res.ok) throw new Error("Failed to fetch customer data");

        const data = await res.json();
        setCustomerData(data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
        toast.error("Failed to load customer data");
      } finally {
        setLoading(false);
      }
    };

    getCustomerByUser();
  }, [session]);

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
      setCustomerData(data);
    } catch (error) {
      console.error("Error updating customer details:", error);
      toast.error("Error updating details");
    }
  };

  if (loading) return <div>Loading...</div>;

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
    <div>{customerData ? renderContent() : "Loading customer details..."}</div>
  );
};

export default Page;
