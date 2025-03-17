import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

import { QueryProvider } from "@/components/query-provider";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
});

//portfolio main
export const orbitron = Orbitron({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-orbitron",
  preload: false,
});

export const metadata: Metadata = {
  title: "Reichima Portfolio",
  description: "栃木のゆるふわWebエンジニアのポートフォリオ",
  manifest: "/site.manifest.json",
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
      <body className={cn(orbitron.className, "min-h-screen antialiased")}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
