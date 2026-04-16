import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react"; // 1. Import Suspense
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "CUT IN HALF",
  description: "Experience the ultimate gourmet burger. Premium ingredients, industrial aesthetics, and flavor that hits different.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <body className={`${anton.variable} ${inter.variable} antialiased selection:bg-brand-yellow selection:text-black`}>
        <div className="grain" />
        <SmoothScroll>
          <Preloader />
          {/* 2. Wrap components that use search params or dynamic hooks in Suspense */}
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
          <CustomCursor />
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </SmoothScroll>
      </body>
    </html>
  );
}