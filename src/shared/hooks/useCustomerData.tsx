"use client";

import { StoreType } from "@/lib/types";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { customerDataAtom } from "../atoms/customerDataAtom";

const UseCustomerData = () => {
  const [customerData, setCustomerData] = useAtom(customerDataAtom);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  useEffect(() => {
    const loadCustomer = async () => {
      // If data already exists in the storeAtom, no need to fetch again
      if (!customerData && session?.user?._id) {
        try {
          // console.log("session?.user?._id", session?.user?._id);
          const res = await fetch(`/api/customer/user/${session?.user?._id}`);
          const data = await res.json();
          setCustomerData(data);
        } catch (error) {
          // console.log("Error loading customer data", error);
        } finally {
          setLoading(false);
        }
      } else {
        // If data is already in storeAtom, stop loading
        setLoading(false);
      }
    };

    loadCustomer();
  }, [session?.user?._id, customerData, setCustomerData]);

  return {
    customerData,
    loading,
    setCustomerData,
  };
};

export default UseCustomerData;
