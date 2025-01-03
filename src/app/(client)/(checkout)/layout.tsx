import CheckoutHeader from "@/components/website/header/CheckoutHeader";
import Header from "@/components/website/header/Header";
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
          <div className="bg-gray-100 w-full">{children}</div>
        </body>
    </html>
  );
}
