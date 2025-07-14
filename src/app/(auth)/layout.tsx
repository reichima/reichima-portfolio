"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-neutral-100">
      <div className="mx-auto max-w-(--breakpoint-2xl) p-4">
        <nav className="flex items-center justify-between">
          <Image src="/flog.png" alt="カエルロゴ" width={60} height={60} />
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-8">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
