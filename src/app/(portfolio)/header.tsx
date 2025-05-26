import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed z-50 flex h-28 w-full flex-wrap items-center justify-between bg-gradient-to-r from-slate-900/80 via-purple-900/80 to-slate-900/80 p-6 shadow backdrop-blur-md">
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
      <div className="block lg:hidden">
        <button className="flex items-center rounded-lg border border-purple-400/50 bg-white/10 px-3 py-2 text-white backdrop-blur-md transition-all duration-300 hover:border-purple-400 hover:bg-white/20">
          <svg
            className="h-3 w-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v15z" />
          </svg>
        </button>
      </div>
      <div className="w-full flex-grow lg:flex lg:w-auto lg:items-center">
        <div className="flex justify-around text-sm lg:flex-grow">
          <Link
            href="#home"
            className="font-orbitron group relative mt-4 mr-4 block text-white/90 transition-all duration-300 hover:text-white lg:mt-0 lg:inline-block"
          >
            <span className="relative z-10">Home</span>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </Link>
          <Link
            href="#about"
            className="font-orbitron group relative mt-4 mr-4 block text-white/90 transition-all duration-300 hover:text-white lg:mt-0 lg:inline-block"
          >
            <span className="relative z-10">About</span>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </Link>
          <Link
            href="#works"
            className="font-orbitron group relative mt-4 mr-4 block text-white/90 transition-all duration-300 hover:text-white lg:mt-0 lg:inline-block"
          >
            <span className="relative z-10">Works</span>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </Link>
          <Link
            href="#contact"
            className="font-orbitron group relative mt-4 mr-4 block text-white/90 transition-all duration-300 hover:text-white lg:mt-0 lg:inline-block"
          >
            <span className="relative z-10">Contact</span>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </Link>
          <Link
            href="#special"
            className="font-orbitron group relative mt-4 block text-white/90 transition-all duration-300 hover:text-white lg:mt-0 lg:inline-block"
          >
            <span className="relative z-10">Special</span>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </Link>
        </div>
      </div>
    </header>
  );
}
