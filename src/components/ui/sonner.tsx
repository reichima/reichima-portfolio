"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "dark" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white/10 group-[.toaster]:text-white group-[.toaster]:border-white/20 group-[.toaster]:shadow-xl group-[.toaster]:backdrop-blur-md group-[.toaster]:rounded-xl",
          description: "group-[.toast]:text-white/80",
          actionButton:
            "group-[.toast]:bg-gradient-to-r group-[.toast]:from-purple-500 group-[.toast]:to-pink-500 group-[.toast]:text-white group-[.toast]:border-0 group-[.toast]:rounded-lg",
          cancelButton:
            "group-[.toast]:bg-white/20 group-[.toast]:text-white/90 group-[.toast]:border-white/20 group-[.toast]:rounded-lg group-[.toast]:backdrop-blur-md",
          success:
            "group-[.toast]:border-green-400/50 group-[.toast]:bg-green-500/10",
          error:
            "group-[.toast]:border-red-400/50 group-[.toast]:bg-red-500/10",
          warning:
            "group-[.toast]:border-yellow-400/50 group-[.toast]:bg-yellow-500/10",
          info: "group-[.toast]:border-blue-400/50 group-[.toast]:bg-blue-500/10",
        },
        style: {
          backdropFilter: "blur(16px)",
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
