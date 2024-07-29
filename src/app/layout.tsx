import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Wrapper } from "./wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopClues.in",
  description: "Grocery and Electronics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Wrapper>
          <Navbar />
          {children}
          <Toaster />
        </Wrapper>
      </body>
    </html>
  );
}
