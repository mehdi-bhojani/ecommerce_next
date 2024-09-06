"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/website/header/Header";
import Footer from "@/components/website/footer/Footer";
import ResponsiveHeader from "@/components/website/header/ResponsiveHeader";
import ResponsiveFooter from "@/components/website/footer/ResponsiveFooter";
const Notfound = () => {
  const router = useRouter();
  return (
    <div>
      <Header />
      <ResponsiveHeader />

      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
        <div className="relative flex items-center justify-center h-1/2">
          <div className=" ">
            <Image
              style={{ width: "471px" }}
              src="/assets/home/404.svg"
              alt="404 Illustration"
              className="w-full h-1/2 "
              width={100}
              height={100}
            />
          </div>
        </div>
        <p className="text-lg text-gray-600 mt-4">
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          // onClick={() => {router.push('/')}}
          className="mt-6 bg-red-500 text-white px-4 py-2  hover:bg-red-600 transition"
        >
          Go Back
        </Link>
      </div>

      <ResponsiveFooter />
      <Footer />
    </div>
  );
};

export default Notfound;
