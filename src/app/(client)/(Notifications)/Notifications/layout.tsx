import Header from "@/components/website/header/Header";
import HelpFooter from "@/components/website/footer/HelpFooter";
import ResponsiveHeader from "@/components/website/header/ResponsiveHeader";
import ResponsiveFooter from "@/components/website/footer/ResponsiveFooter";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <Header />
        <ResponsiveHeader/>
        {children}
        <ResponsiveFooter/>
        <HelpFooter/>
        </body>
    </html>
  );
}
