import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Link from "next/link";

const formSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(8, { message: "8文字以上入力してください" })
		.max(256),
});

export const SignInCard = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};
	return (
		<Card className="w-full h-full md:w-[487px] border-none shadow-none">
			<CardHeader className="flex items-center justify-center text-center p-7">
				<CardTitle className="text-2xl font-bold">ログイン</CardTitle>
			</CardHeader>
			<div className="px-7 mb-2">
				<DottedSeparator />
			</div>
			<CardContent className="p-7">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											type="email"
											placeholder="メールアドレスを入力してください"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											type="password"
											placeholder="パスワードを入力してください"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button size="lg" className="w-full">
							ログイン
						</Button>
					</form>
				</Form>
			</CardContent>
			<div className="px-7 mb-2">
				<DottedSeparator />
			</div>
			<CardContent className="p-7 flex flex-col gap-y-4">
				<Button variant="secondary" size="lg" className="w-full">
					<FaGoogle className="mr-2 size-5" />
					Googleログイン
				</Button>
				<Button variant="secondary" size="lg" className="w-full">
					<FaGithub className="mr-2 size-5" />
					Githubログイン
				</Button>
			</CardContent>
			<div className="px-7 mb-2">
				<DottedSeparator />
			</div>
			<CardContent className="p-7">
				<div className="text-center">
					新規登録は
					<Link href="/sign-up">
						<span className="text-blue-700 underline">こちら</span>
					</Link>
				</div>
			</CardContent>
		</Card>
	);
};
