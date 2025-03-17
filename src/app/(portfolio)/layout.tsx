"use client";

import Header from "@/app/(portfolio)/header";
import { cn } from "@/lib/utils";
import { Orbitron } from "next/font/google";
export const orbitron = Orbitron({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-orbitron",
  preload: false,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn(orbitron.className, "relative h-screen")}>
      <Header />
      <div className="flex-grow">{children}</div>
    </div>
  );
}
