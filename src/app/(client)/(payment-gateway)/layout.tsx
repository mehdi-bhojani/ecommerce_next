"use client"

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
