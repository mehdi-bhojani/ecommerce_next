import type { Metadata } from "next";

// import "../globals.css";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center my-5">
        <div className="w-full rounded-2xl border px-6 py-10 xs:px-8 md:p-12 lg:px-16 max-w-[650px] mx-auto bg-white shadow">
          {children}
        </div>
      </main>
      <Toaster />
    </>
  );
}
