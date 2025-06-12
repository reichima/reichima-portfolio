"use client";

import { cn } from "@/lib/utils";
import { PiggyBank } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoHome, GoHomeFill } from "react-icons/go";
const routes = [
  {
    label: "Home",
    href: "/home",
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: "家計簿",
    href: "/money",
    icon: PiggyBank,
    activeIcon: PiggyBank,
  },
];

export const AdminNavigation = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col">
      {routes.map((route) => {
        const isActive = pathname === route.href;
        const Icon = isActive ? route.activeIcon : route.icon;

        return (
          <Link
            key={route.label}
            href={route.href}
            className="mb-2"
          >
            <div
              className={cn(
                "flex items-center gap-2.5 rounded-xl p-3 font-medium transition-all duration-200",
                isActive 
                  ? "bg-white text-neutral-700 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]" 
                  : "text-neutral-600 hover:bg-white/50 hover:shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.8)]"
              )}
            >
              <Icon className="size-5" />
              <span>{route.label}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
};
