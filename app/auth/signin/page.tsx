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
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const SignInPage = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const { data: session, status } = useSession();
	const callbackUrl = searchParams.get("callbackUrl") || "/design";
	const error = searchParams.get("error");

	useEffect(() => {
		if (status === "authenticated") {
			router.push(callbackUrl);
		}
	}, [status, callbackUrl, router]);

	if (status === "loading") {
		return (
			<div className="container flex items-center justify-center min-h-screen py-8">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle>Loading...</CardTitle>
						<CardDescription>
							Please wait while we check your session.
						</CardDescription>
					</CardHeader>
				</Card>
			</div>
		);
	}

	return (
		<div className="container flex items-center justify-center min-h-screen py-8">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Welcome to Eid Card Creator</CardTitle>
					<CardDescription>
						{error === "OAuthSignin"
							? "There was a problem signing in with Google. Please try again."
							: "Sign in to create and save your cards"}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Button
						className="w-full"
						onClick={() =>
							signIn("google", {
								callbackUrl,
								redirect: true,
							})
						}
					>
						Sign in with Google
					</Button>
				</CardContent>
			</Card>
		</div>
	);
};

export default SignInPage;
