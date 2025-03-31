"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { hash } from "bcryptjs";
import { connectMongo } from "@/lib/db/connectMongo";
import { User } from "@/lib/db/models/User.model";

const RegisterPage = () => {
	const router = useRouter();
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		if (formData.password !== formData.confirmPassword) {
			toast({
				title: "Error",
				description: "Passwords do not match",
				variant: "destructive",
			});
			setIsLoading(false);
			return;
		}

		try {
			await connectMongo();

			// Check if user already exists
			const existingUser = await User.findOne({ email: formData.email });
			if (existingUser) {
				toast({
					title: "Error",
					description: "User with this email already exists",
					variant: "destructive",
				});
				return;
			}

			// Hash password
			const hashedPassword = await hash(formData.password, 12);

			// Create new user
			await User.create({
				name: formData.name,
				email: formData.email,
				password: hashedPassword,
				cards: [],
			});

			toast({
				title: "Success",
				description: "Account created successfully. Please sign in.",
			});

			router.push("/auth/signin");
		} catch (error) {
			console.error("Registration error:", error);
			toast({
				title: "Error",
				description: "Failed to create account. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="container flex items-center justify-center min-h-screen py-8">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Create an Account</CardTitle>
					<CardDescription>
						Sign up to start creating your Eid cards
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								type="text"
								placeholder="Enter your name"
								value={formData.name}
								onChange={(e) =>
									setFormData({ ...formData, name: e.target.value })
								}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="Enter your email"
								value={formData.email}
								onChange={(e) =>
									setFormData({ ...formData, email: e.target.value })
								}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								placeholder="Create a password"
								value={formData.password}
								onChange={(e) =>
									setFormData({ ...formData, password: e.target.value })
								}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="confirmPassword">Confirm Password</Label>
							<Input
								id="confirmPassword"
								type="password"
								placeholder="Confirm your password"
								value={formData.confirmPassword}
								onChange={(e) =>
									setFormData({
										...formData,
										confirmPassword: e.target.value,
									})
								}
								required
							/>
						</div>
						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? "Creating account..." : "Create Account"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default RegisterPage;
