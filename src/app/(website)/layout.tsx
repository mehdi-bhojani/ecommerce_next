import Header from "@/components/website/header/Header";
import Footer from "@/components/website/footer/Footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer/>
        </body>
    </html>
  );
}
