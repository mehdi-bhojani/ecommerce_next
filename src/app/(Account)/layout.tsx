import Header from "@/components/website/header/Header";
import HelpFooter from "@/components/website/footer/HelpFooter";
import HelpText from "@/components/website/HelpPageComponents/HelpText";
import { Provider } from 'jotai'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
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
       {children}
     
       </div>
     
      {/* <HelpFooter/> */}
    
        </body>
    </html>
  );
}
