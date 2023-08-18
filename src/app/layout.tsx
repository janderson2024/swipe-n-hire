import "@uploadthing/react/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getCompanyName } from "@/components/Logo";

const inter = Inter({ subsets: ["latin"] });

const title = getCompanyName() + " Careers";
const description = "A swift and intuitive web app for HR recruiters that simplifies posting, reviewing and notifying job applicants. This website acts as an example company page and was created in 6 weeks through the TechWise program.";

export const metadata: Metadata = {
  title: title,
  description: description,
  viewport: {
    width: "device-width",
    height: "device-height",
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
  },
  authors: [
    { name: "Monica Tuttle" },
    { name: "Dennis Bowen" },
    { name: "Joshua Anderson" },
  ],
  openGraph: {
    title: title,
    description: description,
    url: "https://swipe-n-hire.com",
    images: [
      { url: "/purple-icon.png", width: 192, height: 192 },
      { url: "/white-icon.png", width: 192, height: 192 },
    ],
    locale: "en-US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
