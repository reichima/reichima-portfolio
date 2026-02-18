import type { Metadata } from "next";
import Script from "next/script";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

import { QueryProvider } from "@/components/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reichima.com"),
  title: "Reichima Portfolio",
  description: "栃木のとあるWebエンジニアのポートフォリオ",
  openGraph: {
    type: "website",
    url: "https://reichima.com",
    title: "Reichima Portfolio",
    description: "栃木のとあるWebエンジニアのポートフォリオ",
    siteName: "Reichima Portfolio",
    locale: "ja_JP",
    images: [
      {
        url: "/images/portfolio/ogp.png",
        width: 1024,
        height: 630,
        alt: "Reichima Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reichima Portfolio",
    description: "栃木のとあるWebエンジニアのポートフォリオ",
    images: ["/images/portfolio/ogp.png"],
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/@react-grab/mcp/dist/client.global.js"
            strategy="lazyOnload"
          />
        )}
      </head>
      <body
        className={cn(
          notoSansJP.className,
          "min-h-screen bg-slate-900 antialiased",
        )}
      >
        <QueryProvider>{children}</QueryProvider>
        <Toaster richColors />
        <Analytics />
      </body>
    </html>
  );
}
