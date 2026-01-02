import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function ProfileCard() {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
      <div className="flex flex-col items-center gap-6 sm:flex-row">
        <div className="relative shrink-0">
          <div className="absolute inset-0 animate-pulse rounded-full bg-purple-500 opacity-50 blur-md"></div>
          <Image
            src="/images/portfolio/profile.png"
            alt="Reichima"
            width={100}
            height={100}
            className="relative rounded-full border-2 border-white/20"
          />
        </div>
        <div className="text-center sm:text-left">
          <h3 className="mb-2 text-xl font-bold text-white">Reichima</h3>
          <p className="mb-3 text-sm text-white/80">
            1997年生まれ 栃木でWebエンジニアをしています。
            <br />
            最近は回転サーブを練習しています。
          </p>
          <div className="flex justify-center gap-3 sm:justify-start">
            <Link
              href="https://github.com/reichima"
              target="_blank"
              className="rounded-lg bg-white/10 p-2 text-white/80 transition-all duration-300 hover:bg-white/20 hover:text-white"
              aria-label="GitHub"
            >
              <FaGithub className="size-5" />
            </Link>
            <Link
              href="https://x.com/reichimacom"
              target="_blank"
              className="rounded-lg bg-white/10 p-2 text-white/80 transition-all duration-300 hover:bg-white/20 hover:text-white"
              aria-label="X (Twitter)"
            >
              <FaXTwitter className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
