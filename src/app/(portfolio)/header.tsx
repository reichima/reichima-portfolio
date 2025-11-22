"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed z-50 flex h-28 w-full flex-wrap items-center justify-between bg-white/5 p-6 backdrop-blur-md",
          isMenuOpen ? "border-none" : "border-b border-white/10 shadow-xl",
        )}
      >
        <div className="flex flex-shrink-0 items-center text-white">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-purple-500 opacity-75 blur-md"></div>
              <Image
                className="relative drop-shadow-[0_0_1rem_#a855f7] transition-all duration-300 hover:scale-110"
                src="/logo.png"
                alt="start Logo"
                width={64}
                height={64}
                priority
              />
            </div>
          </Link>
        </div>

        {/* ハンバーガーメニューボタン */}
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/20"
          >
            <div className="relative h-6 w-6">
              <GiHamburgerMenu
                className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                  isMenuOpen
                    ? "scale-0 rotate-180 opacity-0"
                    : "scale-100 rotate-0 opacity-100"
                }`}
              />
              <X
                className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                  isMenuOpen
                    ? "scale-100 rotate-0 opacity-100"
                    : "scale-0 -rotate-180 opacity-0"
                }`}
              />
            </div>
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>

        {/* デスクトップ用メニュー */}
        <div className="hidden w-full flex-grow lg:flex lg:w-auto lg:items-center">
          <div className="flex justify-around text-sm lg:flex-grow">
            <Link
              href="#home"
              className="font-orbitron group relative mt-4 mr-4 block rounded-lg px-4 py-2 text-white/90 transition-all duration-300 hover:text-white lg:mt-0 lg:inline-block"
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 rounded-lg border border-white/20 bg-white/10 opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:opacity-100"></div>
            </Link>
            <Link
              href="#about"
              className="font-orbitron group relative mt-4 mr-4 block rounded-lg px-4 py-2 text-white/90 transition-all duration-300 hover:text-white lg:mt-0 lg:inline-block"
            >
              <span className="relative z-10">About</span>
              <div className="absolute inset-0 rounded-lg border border-white/20 bg-white/10 opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:opacity-100"></div>
            </Link>
            <Link
              href="#works"
              className="font-orbitron group relative mt-4 mr-4 block rounded-lg px-4 py-2 text-white/90 transition-all duration-300 hover:text-white lg:mt-0 lg:inline-block"
            >
              <span className="relative z-10">Works</span>
              <div className="absolute inset-0 rounded-lg border border-white/20 bg-white/10 opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:opacity-100"></div>
            </Link>
            <Link
              href="#contact"
              className="font-orbitron group relative mt-4 mr-4 block rounded-lg px-4 py-2 text-white/90 transition-all duration-300 hover:text-white lg:mt-0 lg:inline-block"
            >
              <span className="relative z-10">Contact</span>
              <div className="absolute inset-0 rounded-lg border border-white/20 bg-white/10 opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:opacity-100"></div>
            </Link>
            <Link
              href="#special"
              className="font-orbitron group relative mt-4 block rounded-lg px-4 py-2 text-white/90 transition-all duration-300 hover:text-white lg:mt-0 lg:inline-block"
            >
              <span className="relative z-10">Special</span>
              <div className="absolute inset-0 rounded-lg border border-white/20 bg-white/10 opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:opacity-100"></div>
            </Link>
          </div>
        </div>
      </header>

      {/* モバイル用メニュー */}
      <div
        className={`fixed top-28 left-0 z-40 w-full border-b border-white/10 bg-white/5 shadow-xl backdrop-blur-md transition-all duration-500 ease-in-out lg:hidden ${
          isMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-4 opacity-0"
        }`}
      >
        <div className="flex flex-col space-y-2 p-6">
          <Link
            href="#home"
            onClick={closeMenu}
            className="font-orbitron group relative block rounded-lg px-4 py-3 text-white/90 transition-all duration-300 hover:text-white"
          >
            <span className="relative z-10">Home</span>
            <div className="absolute inset-0 rounded-lg border border-white/20 bg-white/10 opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:opacity-100"></div>
          </Link>
          <Link
            href="#about"
            onClick={closeMenu}
            className="font-orbitron group relative block rounded-lg px-4 py-3 text-white/90 transition-all duration-300 hover:text-white"
          >
            <span className="relative z-10">About</span>
            <div className="absolute inset-0 rounded-lg border border-white/20 bg-white/10 opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:opacity-100"></div>
          </Link>
          <Link
            href="#works"
            onClick={closeMenu}
            className="font-orbitron group relative block rounded-lg px-4 py-3 text-white/90 transition-all duration-300 hover:text-white"
          >
            <span className="relative z-10">Works</span>
            <div className="absolute inset-0 rounded-lg border border-white/20 bg-white/10 opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:opacity-100"></div>
          </Link>
          <Link
            href="#contact"
            onClick={closeMenu}
            className="font-orbitron group relative block rounded-lg px-4 py-3 text-white/90 transition-all duration-300 hover:text-white"
          >
            <span className="relative z-10">Contact</span>
            <div className="absolute inset-0 rounded-lg border border-white/20 bg-white/10 opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:opacity-100"></div>
          </Link>
          <Link
            href="#special"
            onClick={closeMenu}
            className="font-orbitron group relative block rounded-lg px-4 py-3 text-white/90 transition-all duration-300 hover:text-white"
          >
            <span className="relative z-10">Special</span>
            <div className="absolute inset-0 rounded-lg border border-white/20 bg-white/10 opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:opacity-100"></div>
          </Link>
        </div>
      </div>
    </>
  );
}
