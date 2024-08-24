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
       <div className="bg-gray-100 w-full h-full p-5">
       {children}
       </div>
        </body>
    </html>
  );
}
