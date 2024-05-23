import type { Metadata } from "next";
import { Inter, Oswald, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const oswald = Oswald({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stalker Gear",
  description: "We use this to stalk!!!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-screen flex">
      <body className={cn(oswald.className, "flex flex-col flex-grow")} >
        <Navbar />
        <div className="p-4 flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
