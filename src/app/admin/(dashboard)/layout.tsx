import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToasterProvider } from "@/lib/ToasterProvider";
import LeftSideBar from "@/components/admin/layout/LeftSideBar";
import TopBar from "@/components/admin/layout/TopBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce - Admin Dashboard",
  description: "Admin dashboard to data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider />
          <div className="flex max-lg:flex-col text-grey-1">
            <LeftSideBar />
            <TopBar />
            <div className="flex-1 ">{children}</div>
          </div>
        </body>
      </html>
  );
}
