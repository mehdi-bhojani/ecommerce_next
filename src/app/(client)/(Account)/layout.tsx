import Header from "@/components/website/header/Header";
import HelpFooter from "@/components/website/footer/HelpFooter";
import HelpText from "@/components/website/HelpPageComponents/HelpText";
import { Provider } from "jotai";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import AccountName from "@/components/website/AccountPageComponents/AccountName";
import { Separator } from "@/components/ui/separator";
import LeftSide from "@/components/website/AccountPageComponents/LeftSide";
import Heading from "@/components/website/AccountPageComponents/Heading";
import ResponsiveHeader from "@/components/website/header/ResponsiveHeader";
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
        <div className="bg-gray-100 w-full">
          <ToastContainer />
          <div className="bg-white flex w-full">
            <div className="w-full max-w-6xl bg-white shadow-md  p-2">
              <Heading />
              <AccountName />
              <Separator className="mb-2 hidden md:block" />
              <div className="flex">
                <LeftSide />
                <Separator orientation="vertical" />
                <div className="md:w-7/12 w-full">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
