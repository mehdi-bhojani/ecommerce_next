import Header from "@/components/website/header/Header";
import MinHeader from "@/components/website/header/MinHeader";
import HelpFooter from "@/components/website/footer/HelpFooter";
import HelpText from "@/components/website/HelpPageComponents/HelpText";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
       <MinHeader/>
       <HelpText />
       <div className="bg-gray-100 w-full">
       {children}
       </div>
     
      <HelpFooter/>
     
    
        </body>
    </html>
  );
}
