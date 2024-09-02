"use client";

import PaymentCheckout from "@/components/payment/paymentCheckout";
import { convertToSubcurrency, PriceIntoCurrency } from "@/shared/helpers/help";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "@/shared/hooks/useCart";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { get } from "http";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
export default function Page() {
  const [amount, setAmount] = useState(0);
  const { getTotalPrice } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();
  const paramsAmount = parseInt(searchParams.get("amount") || '0');
  const orderId = searchParams.get("orderId");

  if(searchParams === undefined) {
    router.push("/error?message=No%20search%20params%20found");
  }
  // if(paramsAmount !== getTotalPrice()) {
  //   router.push("/error?message=Amount%20mismatch");
  // }
  if(paramsAmount === 0) {
    router.push("/error?message=Amount%20is%200");
  }

  useEffect(() => {
    setAmount(paramsAmount | getTotalPrice());
  }, [getTotalPrice]);

  return (
    amount != 0 && (
      <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2">DFK Collection</h1>
          <h2 className="text-2xl">
            has requested
            <span className="font-bold">
              {PriceIntoCurrency(amount, "PKR")}
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
          <PaymentCheckout amount={amount} />
        </Elements>
      </main>
    )
  );
}
