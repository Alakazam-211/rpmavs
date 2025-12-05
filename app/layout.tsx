import type { Metadata } from "next";
import "./globals.css";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  weight: ['300', '400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-oswald',
});

export const metadata: Metadata = {
  title: "RPM Audio Visual Services Atlanta, GA – Expert Subcontractors for A/V Sellers and Consultants",
  description: "RPM represents the largest team of commercial audio visual expertise in the country for any single location. All the while, using zero outsourcing.",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={oswald.variable}>{children}</body>
    </html>
  );
}
