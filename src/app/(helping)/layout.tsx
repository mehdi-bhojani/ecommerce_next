import Header from "@/components/website/header/Header";
import Footer from "@/components/website/footer/Footer";
import MinHeader from "@/components/website/header/MinHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
       <MinHeader/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
