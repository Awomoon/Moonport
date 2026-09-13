import type { Metadata, Viewport } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { site } from "@/content/site";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { LiquidBackground } from "@/components/ui/LiquidBackground";
import { GooFilter } from "@/components/ui/GooFilter";
import { Cursor } from "@/components/ui/Cursor";
import { Preloader } from "@/components/ui/Preloader";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono-code",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "web developer",
    "front-end engineer",
    "Next.js",
    "TypeScript",
    "portfolio",
  ],
  openGraph: {
    type: "website",
    url: site.url,
    title: site.title,
    description: site.description,
    siteName: site.name,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#04050a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${mono.variable}`}>
      <body className="antialiased">
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:glass-solid focus:fixed focus:top-4 focus:left-4 focus:z-[120] focus:rounded-full focus:px-5 focus:py-3 focus:text-sm"
        >
          Skip to content
        </a>

        {/* Fixed chrome — must stay outside the smooth-scroll wrapper */}
        <GooFilter />
        <LiquidBackground />
        <ScrollProgress />
        <Preloader />
        <Cursor />
        <Navbar />

        <MotionProvider>
          <main>{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
