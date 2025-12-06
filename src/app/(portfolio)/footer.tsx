import Image from "next/image";
import Link from "next/link";
import { CiMail } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-white/5 bg-slate-900 p-8">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 h-32 w-32 animate-pulse rounded-full bg-purple-500 mix-blend-multiply blur-xl filter"></div>
        <div className="absolute right-1/4 bottom-0 h-32 w-32 animate-pulse rounded-full bg-pink-500 mix-blend-multiply blur-xl filter delay-700"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-full bg-purple-500 opacity-75 blur-sm"></div>
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={48}
                  height={48}
                  className="relative drop-shadow-[0_0_0.5rem_#a855f7]"
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
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link
                href="#home"
                className="text-white/70 transition-colors hover:text-purple-400"
              >
                Home
              </Link>
              <Link
                href="#about"
                className="text-white/70 transition-colors hover:text-purple-400"
              >
                About
              </Link>
              <Link
                href="#works"
                className="text-white/70 transition-colors hover:text-purple-400"
              >
                Works
              </Link>
              <Link
                href="#contact"
                className="text-white/70 transition-colors hover:text-purple-400"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Connect</h4>
            <div className="flex space-x-4">
              <Link href="https://github.com/reichima" target="_blank">
                <div className="rounded-lg bg-white/10 p-3 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/20">
                  <FaGithub className="size-6" />
                </div>
              </Link>
              <Link href="https://x.com/reichimacom" target="_blank">
                <div className="rounded-lg bg-white/10 p-3 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/20">
                  <FaXTwitter className="size-6" />
                </div>
              </Link>
            </div>
            <div className="space-y-2 text-sm text-white/70">
              <Link
                href="mailto:rei1gggg@gmail.com"
                className="flex items-center gap-2 space-x-2 text-white/70 transition-colors hover:text-purple-400"
              >
                <CiMail className="size-6" />
                rei1gggg@gmail.com
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-white/60">
              © 2025 Reichima. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              {/* <Link
                href="#"
                className="text-white/60 transition-colors hover:text-purple-400"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-white/60 transition-colors hover:text-purple-400"
              >
                Terms of Service
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
