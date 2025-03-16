import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-black/80 px-6 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* ナビゲーション */}
          <div>
            <h3 className="font-orbitron mb-4 text-lg">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#home"
                  className="hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#works"
                  className="hover:text-primary transition-colors"
                >
                  Works
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* SNSリンク */}
          <div>
            <h3 className="font-orbitron mb-4 text-lg">Social</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://github.com"
                  target="_blank"
                  className="hover:text-primary transition-colors"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  className="hover:text-primary transition-colors"
                >
                  Twitter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* コピーライト */}
        <div className="mt-8 border-t border-white/10 pt-8 text-center">
          <p className="font-orbitron text-sm">
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
