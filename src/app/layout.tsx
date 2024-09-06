import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/shared/providers/next-auth/Provider";
import { Provider } from "jotai";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "dfk collection",
  description: "Generated by dfk collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>
          <NextAuthProvider>{children}</NextAuthProvider>
        </body>
      </Provider>
    </html>
  );
}
