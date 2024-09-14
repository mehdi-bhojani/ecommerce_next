"use client";

import {
  getTotalPriceFromDB,
  updatePaymentStatus,
} from "@/lib/actions/actions";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";

function PageContent() {
  const [loading, setLoading] = useState(true); // Start with loading true
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract search parameters safely
  const paramsAmount = parseInt(searchParams.get("amount") || "0");
  const orderId = searchParams.get("orderid");
  const transactionId = searchParams.get("payment_intent");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (!orderId || !transactionId) {
          console.log("No order ID or transaction ID found");
          router.push("/error?message=No%20order%20ID%20or%20transaction%20ID%20found");
          return;
        }

        const totalAmount = await getTotalPriceFromDB(orderId);
        if (totalAmount === null || totalAmount !== paramsAmount) {
          console.log("Error verifying payment: Amount mismatch", totalAmount, paramsAmount);
          router.push(
            "/error?message=Error%20verifying%20payment%3A%20Amount%20mismatch"
          );
          return;
        }

        const paymentUpdated = await updatePaymentStatus(orderId, transactionId);
        if (paymentUpdated) {
          router.push("/order-success?id=" + orderId);
        } else {
          router.push("/error?message=Failed%20to%20update%20payment%20status");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        router.push("/error?message=An%20unexpected%20error%20occurred");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [router, orderId, transactionId, paramsAmount]);

  if (loading) {
    return <div><h1>Processing your payment, please wait...</h1></div>;
  }

  return null; // Empty state as navigation will handle further flow
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
