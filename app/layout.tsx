import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SaleTrackr — Track Clothing Sales & Save",
  description:
    "Paste any product URL. We monitor it for sales and price drops. Get notified when the price drops.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-white text-[#1A1A1A]`}>
        {children}
      </body>
    </html>
  );
}
