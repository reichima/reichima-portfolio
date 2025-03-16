"use client";

import Header from "@/app/(portfolio)/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-screen">
      <Header />
      <div className="flex-grow">{children}</div>
    </div>
  );
}
