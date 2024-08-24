import Header from "@/components/website/header/Header";
import HelpFooter from "@/components/website/footer/HelpFooter";
import HelpText from "@/components/website/HelpPageComponents/HelpText";
import { Provider } from 'jotai'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import AccountName from "@/components/website/AccountPageComponents/AccountName";
import { Separator } from "@/components/ui/separator";
import LeftSide from "@/components/website/AccountPageComponents/LeftSide";
import Heading from "@/components/website/AccountPageComponents/Heading";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
       <Header/>
       <div className="bg-gray-100 w-full">
       <ToastContainer/>   
       <div className="bg-white min-h-screen flex justify-center items-center">
      <div className="w-full max-w-6xl bg-white shadow-md  p-2">
      <Heading/>
      <AccountName/>
      <Separator className='mb-2'/>
        <div className="flex">
         <LeftSide/>
         <Separator className='   ' orientation="vertical" />
         <div className="w-7/12">
         {children}
         </div>
       
      
        </div>
       
      </div>
    </div>
      
     
       </div>
     
     
    
        </body>
    </html>
  );
}
