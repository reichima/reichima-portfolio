"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
	children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
	const pathname = usePathname();
	const isSignIn = pathname === "/sign-in";

	return (
		<main className="bg-neutral-100 min-h-screen">
			<div className="mx-auto max-w-screen-2xl p-4">
				<nav className="flex justify-between items-center">
					<Image src="/flog.png" alt="カエルロゴ" width={60} height={60} />
					<Button variant="secondary">
						<Link href={isSignIn ? "/sign-up" : "/sign-in"}>
							{isSignIn ? "新規登録" : "ログイン"}
						</Link>
					</Button>
				</nav>
				<div className="flex flex-col justify-center items-center pt-4 md:pt-8">
					{children}
				</div>
			</div>
		</main>
	);
};

export default AuthLayout;
