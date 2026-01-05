"use client";

import Header from "@/app/(portfolio)/header";
import { cn } from "@/lib/utils";
import { Black_Ops_One, Orbitron, VT323 } from "next/font/google";

const orbitron = Orbitron({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-orbitron",
  preload: false,
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  preload: false,
});

const blackOpsOne = Black_Ops_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-black-ops-one",
  preload: false,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative h-screen",
        orbitron.variable,
        vt323.variable,
        blackOpsOne.variable,
      )}
    >
      <Header />
      <div className="flex-grow">{children}</div>
    </div>
  );
}
