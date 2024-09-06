import Header from "@/components/website/header/Header";
import HelpFooter from "@/components/website/footer/HelpFooter";
import HelpText from "@/components/website/HelpPageComponents/HelpText";
import { Provider } from "jotai";

import { Toaster } from "react-hot-toast";
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
        <Header />
        <ResponsiveHeader />
        <div className="bg-gray-100 w-full mt-20 md:mt-0 mb-20 md:mb-0">
          <Toaster />
          {children}
        </div>
        <ResponsiveFooter />
        <HelpFooter />
      </body>
    </html>
  );
}
