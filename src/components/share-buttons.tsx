"use client";

import { LinkIcon } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from "sonner";

type ShareButtonsProps = {
  title: string;
};

export default function ShareButtons({ title }: ShareButtonsProps) {
  const handleShare = (platform: "x" | "copy") => {
    const url = window.location.href;
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    switch (platform) {
      case "x":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
          "_blank",
          "noopener,noreferrer",
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        toast.success("URLをコピーしました");
        break;
    }
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={() => handleShare("x")}
        className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm text-white/80 transition-all duration-300 hover:bg-white/20 hover:text-white"
        aria-label="Xでシェア"
      >
        <FaXTwitter className="h-4 w-4" />
        <span className="hidden sm:inline">X</span>
      </button>
      <button
        onClick={() => handleShare("copy")}
        className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm text-white/80 transition-all duration-300 hover:bg-white/20 hover:text-white"
        aria-label="URLをコピー"
      >
        <LinkIcon className="h-4 w-4" />
        <span className="hidden sm:inline">コピー</span>
      </button>
    </div>
  );
}
