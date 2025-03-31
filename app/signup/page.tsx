"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function SignUpPage() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		setIsLoading(true);

		const formData = new FormData(e.currentTarget);
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const confirmPassword = formData.get("confirmPassword") as string;

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			setIsLoading(false);
			return;
		}

		try {
			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					email,
					password,
				}),
			});

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.message || "Failed to create account");
			}

			// Redirect to sign in page after successful registration
			router.push("/signin?registered=true");
		} catch (error) {
			setError(
				error instanceof Error ? error.message : "Failed to create account"
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="container max-w-md mx-auto py-10">
			<Card>
				<CardHeader>
					<CardTitle>Create an Account</CardTitle>
					<CardDescription>
						Enter your details to create your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								name="name"
								type="text"
								placeholder="Enter your name"
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="Enter your email"
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								name="password"
								type="password"
								placeholder="Create a password"
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="confirmPassword">Confirm Password</Label>
							<Input
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								placeholder="Confirm your password"
								required
							/>
						</div>
						{error && <div className="text-sm text-destructive">{error}</div>}
						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? "Creating account..." : "Create Account"}
						</Button>
						<div className="text-center text-sm">
							Already have an account?{" "}
							<Link href="/signin" className="text-primary hover:underline">
								Sign in
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
