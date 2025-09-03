import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies, headers } from 'next/headers';
import { CountryProvider } from '@/lib/country-context';
import { CountrySelector } from '@/components/ui/CountrySelector';
import { FloatingWhatsAppButton } from '@/components/ui/WhatsAppButton';
import Link from 'next/link';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Import Cars from Japan - Save Thousands | SADC Import Calculator",
  description: "Save N$60,000+ on Japanese car imports. Serving Namibia, South Africa, Botswana, and Zambia. Container sharing available.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get the country from headers (set by middleware)
  const headersList = await headers();
  const country = headersList.get('x-user-country') || 'namibia';
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CountryProvider initialCountry={country}>
          <header className="border-b bg-white sticky top-0 z-30">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                <Link href="/" className="flex items-center gap-2">
                  <span className="font-bold text-xl">ImportCalc</span>
                  <span className="text-sm text-gray-500">SADC</span>
                </Link>
                
                <div className="flex items-center gap-4">
                  <CountrySelector />
                  <nav className="hidden md:flex items-center gap-6">
                    <Link href="/calculator" className="hover:text-blue-600">Calculator</Link>
                    <Link href="/pricing" className="hover:text-blue-600">Pricing</Link>
                    <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
                  </nav>
                </div>
              </div>
            </div>
          </header>
          {children}
          <footer className="border-t bg-gray-50 mt-16">
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-600">
                  © 2025 ImportCalc SADC. All rights reserved.
                </div>
                <nav className="flex gap-6 text-sm">
                  <Link href="/terms" className="text-gray-600 hover:text-gray-900">Terms of Service</Link>
                  <Link href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link>
                  <Link href="/refund" className="text-gray-600 hover:text-gray-900">Refund Policy</Link>
                </nav>
              </div>
            </div>
          </footer>
          <FloatingWhatsAppButton />
        </CountryProvider>
      </body>
    </html>
  );
}
