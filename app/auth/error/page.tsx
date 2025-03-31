"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";

export default function AuthErrorPage() {
	const searchParams = useSearchParams();
	const error = searchParams.get("error");

	return (
		<div className="container flex items-center justify-center min-h-screen py-8">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Authentication Error</CardTitle>
					<CardDescription>
						{error === "AccessDenied"
							? "You do not have permission to sign in."
							: "An error occurred during authentication."}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Button
						className="w-full"
						onClick={() => signIn("google", { callbackUrl: "/design" })}
					>
						Try Again
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
