"use client"

import { Inter } from "next/font/google";
import NextAuthProvider from "@/shared/providers/next-auth/Provider";
import { useAtom, useStore } from "jotai";
import { storeAtom } from "@/shared/atoms/storeAtom";
import { Metadata } from "next";
import { loadStoreSetting } from "@/shared/helpers/help";
// import { Provider } from "jotai";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
