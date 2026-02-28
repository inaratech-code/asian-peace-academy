import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ASIAN ACADEMY | For Peace Research and Development",
    template: "%s | ASIAN ACADEMY",
  },
  description:
    "Asian Academy for Peace Research and Development. Capacity building, knowledge generation, and linking practice, policy and academia in Nepal and the region.",
  keywords: ["peace", "research", "development", "Nepal", "capacity building", "academy", "Kathmandu"],
  openGraph: { type: "website", locale: "en_US" },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white font-sans antialiased text-slate-900">
        {children}
      </body>
    </html>
  );
}
