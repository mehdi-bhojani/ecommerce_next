import CheckoutHeader from "@/components/website/header/CheckoutHeader";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
       <CheckoutHeader/>
   
       <div className="bg-gray-100 w-full">
       {children}
       </div>
     
     
     
    
        </body>
    </html>
  );
}
