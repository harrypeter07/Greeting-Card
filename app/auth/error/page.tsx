"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthErrorPage() {
	const searchParams = useSearchParams();
	const error = searchParams.get("error");

	return (
		<div className="container flex h-screen w-screen flex-col items-center justify-center">
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<div className="flex flex-col space-y-2 text-center">
					<h1 className="text-2xl font-semibold tracking-tight">
						Authentication Error
					</h1>
					<p className="text-sm text-muted-foreground">
						{error === "CredentialsSignin"
							? "Invalid email or password"
							: "An error occurred during authentication"}
					</p>
				</div>
				<Button asChild>
					<Link href="/signin">Try Again</Link>
				</Button>
			</div>
		</div>
	);
}
