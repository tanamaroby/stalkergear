import type { Metadata } from "next";
import { Inter, Oswald, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    <html lang="en">
      <body className={oswald.className}>
        <Navbar />
        <div className="p-4">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
