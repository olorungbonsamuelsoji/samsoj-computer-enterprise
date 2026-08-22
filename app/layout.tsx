import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { business } from "@/lib/config";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${business.name} | IT Equipment, Computer Repairs & Technology Solutions`,
  description: business.description,
  keywords: [
    "SAMSOJ",
    "Computer Enterprise",
    "Laptops Nigeria",
    "Desktop Computers",
    "Printers",
    "Computer Repairs",
    "IT Maintenance",
    "Networking Solutions",
    "CCTV Security Cameras",
    "POS Systems",
    "Web Design Nigeria",
  ],
  authors: [{ name: business.name }],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: `${business.name} | Technology Solutions You Can Rely On`,
    description: business.description,
    type: "website",
    locale: "en_NG",
    siteName: business.name,
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: `${business.name} Logo`,
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}