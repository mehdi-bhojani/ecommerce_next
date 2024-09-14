import Header from "@/components/website/header/Header";
import HelpFooter from "@/components/website/footer/HelpFooter";
import HelpText from "@/components/website/HelpPageComponents/HelpText";
import { Provider } from "jotai";
import { Toaster } from "react-hot-toast";
import AccountName from "@/components/website/AccountPageComponents/AccountName";
import { Separator } from "@/components/ui/separator";
import LeftSide from "@/components/website/AccountPageComponents/LeftSide";
import Heading from "@/components/website/AccountPageComponents/Heading";
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
        <div className="bg-gray-200 w-full mb-16 md:mb-0">
          <Toaster />
          <div className="bg-gray-100 min-h-screen flex justify-center items-center">
            <div className="w-full max-w-6xl min-h-screen p-4 md:my-24 md:px-10  bg-white shadow-lg  ">
              <Heading />
              <AccountName />
              <Separator className="mb-2 hidden md:block" />
              <div className="flex">
                <LeftSide />
                <Separator className="   " orientation="vertical" />
                <div className="md:w-7/12 w-full">{children}</div>
              </div>
            </div>
          </div>
        </div>
        <ResponsiveFooter />
      </body>
    </html>
  );
}
