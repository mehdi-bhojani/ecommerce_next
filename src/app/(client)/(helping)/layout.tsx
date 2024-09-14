import Header from "@/components/website/header/Header";
import MinHeader from "@/components/website/header/MinHeader";
import HelpFooter from "@/components/website/footer/HelpFooter";
import HelpText from "@/components/website/HelpPageComponents/HelpText";
import ResponsiveHeader from "@/components/website/header/ResponsiveHeader";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
      <Header />
        <ResponsiveHeader />
       <HelpText />
       <div className="bg-gray-100 w-full">
       {children}
       </div>
     
      <HelpFooter/>
     
    
        </body>
    </html>
  );
}
