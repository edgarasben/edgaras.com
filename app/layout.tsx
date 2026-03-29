import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const arrayFont = localFont({
  src: [
    {
      path: "../public/fonts/Array-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Array-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-array",
});

export const metadata: Metadata = {
  title: "EDGARAS.COM",
  description: "Personal website of Edgaras Benediktavičius",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${arrayFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
