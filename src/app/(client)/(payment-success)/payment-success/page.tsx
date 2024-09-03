"use client";

import {
  getTotalPriceFromDB,
  updatePaymentStatus,
} from "@/lib/actions/actions";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const [loading, setLoading] = useState(false);
  const searchParams: URLSearchParams = useSearchParams();
  const router = useRouter();
  const paramsAmount = parseInt(searchParams.get("amount") || '0');
  const orderId = searchParams.get("orderid");
  const transactionId = searchParams.get("payment_intent");

  useEffect(() => {
    const VarifyPayment = async () => {
      setLoading(true);
      if (orderId === null || transactionId === null) {
        console.log("No order id found");
        // router.push("/error?message=No%20order%20id%20found");
        return;
      }
      const totalAmount = await getTotalPriceFromDB(orderId);
      if (totalAmount === null || totalAmount !== paramsAmount) {
        console.log("Error fetching total amount i.e", totalAmount, paramsAmount);
        // router.push(
        //   "/error?message=Error%20Payment%20Verifying%20amount%20please%20contact%20support"
        // );
        return;
      }
      if (await updatePaymentStatus(orderId, transactionId)) {
        router.push("/order-success?id=" + orderId);
      }

      setLoading(false);
      return;
    };
    VarifyPayment();
  }, [router, searchParams]);
  return (
    <div>
      <div>
        <h1>Kindly Wait until we Process Payment...</h1>{" "}
      </div>
    </div>
  );
}

export default Page;
