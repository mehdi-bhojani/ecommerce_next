"use client";
import Header from "@/components/website/header/Header";
import Footer from "@/components/website/footer/Footer";
import ResponsiveHeader from "@/components/website/header/ResponsiveHeader";
import ResponsiveFooter from "@/components/website/footer/ResponsiveFooter";
import { Provider } from "jotai";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <ResponsiveHeader />

        {children}
        <ResponsiveFooter />
        <Footer />
      </body>
    </html>
  );
}
