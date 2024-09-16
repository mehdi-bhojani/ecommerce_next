import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import Orders from "@/shared/json/orders.json";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderType } from "@/lib/types";
import { PriceIntoCurrency } from "@/shared/helpers/help";
import Link from "next/link";
import { useAtom } from "jotai";
import { storeAtom } from "@/shared/atoms/storeAtom";

interface myProps {
  ordersData: OrderType[];
}

const OrderSide: React.FC<myProps> = ({ ordersData }) => {

  const [data, setdata] = useState<OrderType[]>(ordersData);
  const [Flag, setFlag] = useState<Boolean>(
    ordersData.length == 0 ? false : true
  );

  function GetData() {
    if (selectedTab != "all") {
      setdata(ordersData.filter((item) => item.orderStatus == selectedTab));
    } else {
      setdata(ordersData);
    }
  }

  const [selectedTab, setSelectedTab] = useState("all");

  useEffect(() => {
    GetData();
    // console.log("ordersData", ordersData);
  }, [data, selectedTab]);

  const tabs = [
    { name: "Pending", id: "pending" },
    { name: "Processing", id: "processing" },
    { name: "Shipped", id: "shipped" },
    { name: "Delivered", id: "delivered" },
    { name: "Cancelled", id: "cancelled" },
  ];
  const [myStoreAtom, setStoreAtom] = useAtom(storeAtom);
  return (
    <div className=" pl-4">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-semibold">Order</h1>
      </div>

      <div className="flex flex-wrap m-3 md:flex-row space-x-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setSelectedTab(tab.id);
              GetData();
            }}
            className={`py-2 px-4 rounded-full font-semibold ${
              selectedTab === tab.id
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <Separator />
      <Separator className="mb-2" />
      {Flag == false ? (
        <div className="bg-gray-100 p-6 text-center rounded-lg  ">
          <p className="text-gray-500">Not found</p>
        </div>
      ) : (
        ""
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order Number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Items</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead className="text-right">Order Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((Items) => (
            <TableRow key={Items._id}>
              <TableCell className="font-medium"><Link href={`/order-success?id=${Items._id}`}>{Items.orderNumber}</Link></TableCell>
              <TableCell>{Items.orderStatus}</TableCell>
              <TableCell className="text-center">
                {Items?.orderItems?.length || 0}
              </TableCell>
              <TableCell>
                {PriceIntoCurrency(Items.totalAmount, myStoreAtom?.storeSettings.currency.default || "PKR")}
              </TableCell>
              <TableCell className="text-right">
                {new Date(Items.orderDate).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderSide;
