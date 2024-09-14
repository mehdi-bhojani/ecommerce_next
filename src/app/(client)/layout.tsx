import { Inter } from "next/font/google";
import NextAuthProvider from "@/shared/providers/next-auth/Provider";
import { useAtom, useStore } from "jotai";
import { storeAtom } from "@/shared/atoms/storeAtom";
import { Metadata } from "next";
import { loadStoreSetting } from "@/shared/helpers/help";
// import { Provider } from "jotai";
const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const store = await loadStoreSetting();

  return {
    title: {
      default: store.storeSettings.name,
      template: `%s | ${store.storeSettings.name}`,
    },
    description: store.storeSettings.description,
    icons: {
      icon: store.storeSettings.favicon,
    },
    // other metadata...
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
