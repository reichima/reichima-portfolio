"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
              <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-75 blur-md"></div>
              <Image
                className="relative drop-shadow-[0_0_1rem_#a855f7] transition-all duration-300 hover:scale-110"
                src="/m-logo.png"
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
            className="flex items-center rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/20"
          >
            <svg
              className={`h-5 w-5 fill-current transition-transform duration-300 ${isMenuOpen ? "rotate-45" : ""}`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              {isMenuOpen ? (
                <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
              ) : (
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              )}
            </svg>
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
        className={`fixed top-28 left-0 z-40 w-full border-b border-white/10 bg-white/5 shadow-xl backdrop-blur-md transition-all duration-300 lg:hidden ${
          isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
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
