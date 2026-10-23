import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ScrollToTop from "./components/ScrollToTop";
import HashNavigationHandler from "./components/HashNavigationHandler";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BrandVaani | Digital Marketing & Business Growth Agency",
  description:
    "BrandVaani is a digital marketing agency providing SEO, Social Media Marketing, Google Ads, Content Marketing, Email Marketing, and Web Design & Development.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="scroll-smooth min-h-full flex flex-col bg-white text-[#0B1120]">
        <HashNavigationHandler />
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar />
        <main className="flex-1 w-full overflow-x-clip">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
