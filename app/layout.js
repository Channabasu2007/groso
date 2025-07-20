import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: ` ${process.env.NEXT_PUBLIC_WEBSITE_NAME}  - Smart AI Grocery Buyer`,
  description:
    "Turn your favorite dishes or videos into smart grocery lists instantly. Groso uses AI to simplify meal planning and shopping.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
      
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
