import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed z-50 flex h-28 w-full flex-wrap items-center justify-between bg-transparent p-6">
      <div className="flex flex-shrink-0 items-center text-white">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          <Image
            className="relative hidden md:block dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/m-logo.png"
            alt="start Logo"
            width={64}
            height={64}
            priority
          />
        </Link>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center rounded border border-white px-3 py-2 text-white hover:border-white hover:text-white">
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
            className="font-orbitron mt-4 mr-4 block text-white hover:text-white lg:mt-0 lg:inline-block"
          >
            Home
          </Link>
          <Link
            href="#about"
            className="font-orbitron mt-4 mr-4 block text-white hover:text-white lg:mt-0 lg:inline-block"
          >
            About
          </Link>
          <Link
            href="#works"
            className="font-orbitron mt-4 mr-4 block text-white hover:text-white lg:mt-0 lg:inline-block"
          >
            Works
          </Link>
          <Link
            href="#contact"
            className="font-orbitron mt-4 mr-4 block text-white hover:text-white lg:mt-0 lg:inline-block"
          >
            Contact
          </Link>
          <Link
            href="#special"
            className="font-orbitron mt-4 block text-white hover:text-white lg:mt-0 lg:inline-block"
          >
            Special
          </Link>
        </div>
      </div>
      <div className="text-center text-sm lg:flex-grow">
        <Button disabled={false} variant="primary">
          なんかに使うボタン
        </Button>
      </div>
    </header>
  );
}
