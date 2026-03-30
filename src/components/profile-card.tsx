import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const PROFILE = {
  name: "Reichima",
  image: "/images/portfolio/profile.png",
  links: [
    {
      href: "https://github.com/reichima",
      label: "GitHub",
      icon: FaGithub,
    },
    {
      href: "https://x.com/reichimacom",
      label: "X (Twitter)",
      icon: FaXTwitter,
    },
  ],
} as const;

type ProfileCardProps = {
  variant?: "default" | "sidebar";
};

export default function ProfileCard({ variant = "default" }: ProfileCardProps) {
  if (variant === "sidebar") {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex flex-col items-center text-center">
          <Image
            src={PROFILE.image}
            alt={PROFILE.name}
            width={56}
            height={56}
            className="rounded-full border border-white/15"
          />
          <p className="mt-3 text-sm font-semibold text-white">
            {PROFILE.name}
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-white/45">
            1997年生まれ
            <br />
            栃木のWebエンジニア
            <br />
            回転サーブを練習しています
          </p>
          <div className="mt-3 flex gap-2">
            {PROFILE.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                className="rounded-md bg-white/5 p-1.5 text-white/40 transition-colors duration-150 hover:bg-white/10 hover:text-white/70"
                aria-label={link.label}
              >
                <link.icon className="size-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
      <div className="flex flex-col items-center gap-6 sm:flex-row">
        <div className="relative shrink-0">
          <div className="bg-portfolio-primary absolute inset-0 animate-pulse rounded-full opacity-50 blur-md"></div>
          <Image
            src={PROFILE.image}
            alt={PROFILE.name}
            width={100}
            height={100}
            className="relative rounded-full border-2 border-white/20"
          />
        </div>
        <div className="text-center sm:text-left">
          <h3 className="mb-2 text-xl font-bold text-white">{PROFILE.name}</h3>
          <p className="mb-3 text-sm text-white/80">
            1997年生まれ 栃木のWebエンジニア
            <br />
            今年こそは積みゲーを減らします
          </p>
          <div className="flex justify-center gap-3 sm:justify-start">
            {PROFILE.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                className="rounded-lg bg-white/10 p-2 text-white/80 transition-all duration-300 hover:bg-white/20 hover:text-white"
                aria-label={link.label}
              >
                <link.icon className="size-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
