"use client";

import { DataTable } from "@/components/admin/customUi/DataTable";
import Loader from "@/components/admin/customUi/Loader";
import { columns } from "@/components/admin/orderItems/OrderItemsColums";
import OrderDetails from "@/components/admin/orders/OrderDetails";
import { useEffect, useState } from "react";


const Page = ({ params }: { params: { orderId: string } }) => {
  const [orderDetails, setOrderDetails] = useState<OrderType | null>(null)
  const [loading, setLoading] = useState(true);

  const getorderDetails = async () => {
    try { 
      const res = await fetch(`/api/order/${params.orderId}`, {
        method: "GET"
      })
      const data = await res.json()
      setOrderDetails(data)
      setLoading(false)
    } catch (err) {
      console.log("[productId_GET]", err)
    }
  }

  useEffect(() => {
    getorderDetails()
  }, [])

  return loading ? <Loader /> : (
    <div className="flex flex-col p-10 gap-5">
      <OrderDetails order={orderDetails} />
      {/* <DataTable columns={columns} data={orderDetails.orderItems} searchKey="product" /> */}
    </div>
  );
};

export default Page;
