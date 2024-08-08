"use client";

import { DataTable } from "@/components/admin/customUi/DataTable";
import Loader from "@/components/admin/customUi/Loader";
import { columns } from "@/components/admin/customers/CustomerColumns";
import { Separator } from "@/components/admin/ui/separator";
import { useEffect, useState } from "react";

const Customers = () => {

  // const customers = await Customer.find().sort({ createdAt: "desc" })
  let [customers, setCustomers] = useState([]);
  let [loading, setLoading] = useState(true);

  const getCustomers = async () => {
    try {
      const res = await fetch("/api/customer", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCustomers().then((data) => {
      setCustomers(data);
    });
  }, []);

  return loading ? <Loader /> : (
    <div className="px-10 ">
      <p className="text-heading2-bold">Customers</p>
      <Separator className="bg-grey-1 my-5" />
      <DataTable columns={columns} data={customers} searchKey="firstName" />
    </div>
  );
};

export default Customers;
