import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from 'next/headers';
import { CountryProvider } from '@/lib/country-context';
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
          {children}
        </CountryProvider>
      </body>
    </html>
  );
}
