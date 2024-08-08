"use client"

import { DataTable } from "@/components/admin/customUi/DataTable"
import Loader from "@/components/admin/customUi/Loader"
import { columns } from "@/components/admin/orders/OrderColumns"
import { Separator } from "@/components/admin/ui/separator"

import { useEffect, useState } from "react"

const Orders = () => {
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState([])

  const getOrders = async () => {
    try {
      const res = await fetch(`/api/order`)
      const data = await res.json()
      setOrders(data)
      setLoading(false)
    } catch (err) {
      console.log("[orders_GET", err)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  return loading ? <Loader /> : (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Orders</p>
      <Separator className="bg-grey-1 my-5"/>
      <DataTable columns={columns} data={orders} searchKey="orderNumber" />
    </div>
  )
}

export const dynamic = "force-dynamic";

export default Orders