import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/design-system.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solace Advocates - Find Your Healthcare Advocate",
  description: "Connect with experienced healthcare advocates who will help you navigate your healthcare journey. Covered by Medicare and major insurance plans.",
  keywords: "healthcare advocate, patient advocate, medical navigation, healthcare support, Medicare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
