
"use client";

import PaymentCheckout from "@/components/payment/paymentCheckout";
import { convertToSubcurrency, PriceIntoCurrency } from "@/shared/helpers/help";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "@/shared/hooks/useCart";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getTotalPriceFromDB } from "@/lib/actions/actions";
import { useAtom } from "jotai";
import { storeAtom } from "@/shared/atoms/storeAtom";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

function PaymentPageContent() {
  const [amount, setAmount] = useState(0);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const orderId = searchParams.get("orderid");
  const [myStoreAtom] = useAtom(storeAtom);

  useEffect(() => {
    const getAmount = async () => {
      setLoading(true);
      if (!orderId) {
        router.push("/error?message=No%20order%20id%20found");
        return;
      }
      const totalAmount = await getTotalPriceFromDB(orderId);
      if (totalAmount === null) {
        router.push("/error?message=Error%20fetching%20total%20amount");
        return;
      }
      setAmount(totalAmount);
      setLoading(false);
    };
    getAmount();
  }, [router, orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    amount != 0 && (
      <div className="min-h-screen flex align-center">
        <main className="w-full mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold mb-2">DFK Collection</h1>
            <h2 className="text-2xl">
              has requested{" "}
              <span className="font-bold">
                {PriceIntoCurrency(
                  amount,
                  myStoreAtom?.storeSettings?.currency?.default || "PKR"
                )}
              </span>
            </h2>
          </div>

          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: convertToSubcurrency(amount),
              currency: "usd",
            }}
          >
            {orderId && <PaymentCheckout amount={amount} />}
          </Elements>
        </main>
      </div>
    )
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <PaymentPageContent />
    </Suspense>
  );
}
