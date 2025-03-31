"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Sign In | Eid Greeting Platform",
	description: "Sign in to create and manage your Eid greeting cards",
};

export default function SignInPage() {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/design";

	return (
		<div className="container flex items-center justify-center min-h-screen py-8">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Welcome to Eid Card Creator</CardTitle>
					<CardDescription>
						Sign in to create and save your cards
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Button
						className="w-full"
						onClick={() => signIn("google", { callbackUrl })}
					>
						Sign in with Google
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
