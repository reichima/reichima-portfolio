import Image from "next/image";
import Link from "next/link";
import { CiMail } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-slate-900">
      <div className="mx-auto max-w-6xl px-8 pt-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="bg-portfolio-primary absolute inset-0 animate-pulse rounded-full opacity-75 blur-sm"></div>
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={48}
                  height={48}
                  className="relative drop-shadow-[0_0_0.5rem_var(--portfolio-primary)]"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold text-white">
                Reichima Portfolio
              </h3>
            </div>
            <p className="leading-relaxed text-white/80"></p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <nav className="flex flex-col space-y-2">
              <Link
                href="#home"
                className="hover:text-portfolio-primary text-white/70 transition-colors"
              >
                Home
              </Link>
              <Link
                href="#about"
                className="hover:text-portfolio-primary text-white/70 transition-colors"
              >
                About
              </Link>
              <Link
                href="#works"
                className="hover:text-portfolio-primary text-white/70 transition-colors"
              >
                Works
              </Link>
              <Link
                href="#contact"
                className="hover:text-portfolio-primary text-white/70 transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Connect</h4>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/reichima"
                target="_blank"
                className="rounded-lg"
                aria-label="GitHubプロフィールを開く"
              >
                <div className="rounded-lg bg-gray-300 p-3 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-gray-400">
                  <FaGithub className="size-6" />
                </div>
              </Link>
              <Link
                href="https://x.com/reichimacom"
                target="_blank"
                className="rounded-lg"
                aria-label="X(Twitter)プロフィールを開く"
              >
                <div className="rounded-lg bg-gray-300 p-3 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-gray-400">
                  <FaXTwitter className="size-6" />
                </div>
              </Link>
            </div>
            <div className="space-y-2 text-sm text-white/70">
              <Link
                href="mailto:rei1gggg@gmail.com"
                className="hover:text-portfolio-primary flex items-center gap-2 space-x-2 text-white/70 transition-colors"
              >
                <CiMail className="size-6" />
                rei1gggg@gmail.com
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between space-y-4 px-8 py-6 md:flex-row md:space-y-0">
          <p className="text-sm text-white/60">
            © 2026 Reichima. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            {/* <Link
              href="#"
              className="text-white/60 transition-colors hover:text-portfolio-primary"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-white/60 transition-colors hover:text-portfolio-primary"
            >
              Terms of Service
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
