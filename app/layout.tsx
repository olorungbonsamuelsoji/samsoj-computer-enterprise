import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getBusinessConfig } from "@/lib/db/settings-repository";
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

export async function generateMetadata(): Promise<Metadata> {
  const config = await getBusinessConfig();
  return {
    metadataBase: new URL(siteUrl),
    title: `${config.name} | IT Equipment, Computer Repairs & Technology Solutions`,
    description: config.description,
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
    authors: [{ name: config.name }],
    icons: {
      icon: "/logo.png",
      apple: "/logo.png",
    },
    openGraph: {
      title: `${config.name} | Technology Solutions You Can Rely On`,
      description: config.description,
      type: "website",
      locale: "en_NG",
      siteName: config.name,
      images: [
        {
          url: "/logo.png",
          width: 512,
          height: 512,
          alt: `${config.name} Logo`,
        },
      ],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const businessConfig = await getBusinessConfig();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      {/*
        Inline theme init to prevent flash of wrong theme before hydration.
        Explicitly sets or removes the dark class based on localStorage
        or system preference, so the first paint always matches the theme.
      */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var theme = localStorage.getItem('theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                var isDark = theme === 'dark' || (!theme && prefersDark);
                document.documentElement.classList.toggle('dark', isDark);
              } catch (e) {}
            })();
          `,
        }}
      />
      <body className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <Header businessConfig={businessConfig} />
        <div className="flex-1">{children}</div>
        <Footer businessConfig={businessConfig} />
      </body>
    </html>
  );
}