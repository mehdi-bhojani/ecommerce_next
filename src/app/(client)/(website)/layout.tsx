"use client";

import Header from "@/components/website/header/Header";
import Footer from "@/components/website/footer/Footer";
import ResponsiveHeader from "@/components/website/header/ResponsiveHeader";
import ResponsiveFooter from "@/components/website/footer/ResponsiveFooter";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div id="layout-wrapper">
          <Header />
          <ResponsiveHeader />
          <main>{children}</main>
          <ResponsiveFooter />
          <Footer />
        </div>
      </body>
    </html>
  );
}