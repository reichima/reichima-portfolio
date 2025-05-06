import { cn } from "@/lib/utils";
import { PiggyBank, SettingsIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";
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
  {
    label: "My Tasks",
    href: "/tasks",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
  },
  {
    label: "Members",
    href: "/members",
    icon: UsersIcon,
    activeIcon: UsersIcon,
  },
];

export const AdminNavigation = () => {
  return (
    <nav className="flex flex-col">
      {routes.map((route) => {
        const isActive = false;
        const Icon = isActive ? route.activeIcon : route.icon;

        return (
          <Link
            key={route.label}
            href={route.href}
            className="flex items-center space-x-2 text-gray-500 hover:text-gray-900"
          >
            <div
              className={cn(
                "hover:text-primary flex items-center gap-2.5 rounded-md p-2.5 font-medium text-neutral-500 transition",
                isActive && "text-primary bg-white shadow-sm hover:opacity-100",
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
