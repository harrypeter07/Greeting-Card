"use client";

import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { animations } from "@/lib/schema";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function CreatePage() {
	const { user } = useAuth();
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		imageUrl: "",
		animation: animations[0].id,
	});
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!user) {
			window.location.href = "/auth/signin";
			return;
		}

		setLoading(true);
		try {
			const response = await fetch("/api/cards", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...formData,
					userId: user.id,
				}),
			});

			if (!response.ok) throw new Error("Failed to create card");

			window.location.href = "/gallery";
		} catch (error) {
			console.error("Error creating card:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="text-center mb-12">
				<h1 className="text-4xl font-bold mb-4">Create a Card</h1>
				<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
					Create a beautiful greeting card with your chosen animation style.
				</p>
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="max-w-2xl mx-auto"
			>
				<Card className="p-8">
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="space-y-2">
							<label
								htmlFor="title"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Title
							</label>
							<Input
								id="title"
								name="title"
								value={formData.title}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="description"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Description
							</label>
							<Textarea
								id="description"
								name="description"
								value={formData.description}
								onChange={handleChange}
								required
								className="min-h-[100px]"
							/>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="imageUrl"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Image URL
							</label>
							<Input
								id="imageUrl"
								name="imageUrl"
								value={formData.imageUrl}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="animation"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Animation Style
							</label>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
								{animations.map((animation) => (
									<div
										key={animation.id}
										className={cn(
											"p-4 border rounded-lg cursor-pointer transition-colors",
											formData.animation === animation.id
												? "border-primary bg-primary/10"
												: "border-border hover:border-primary/50"
										)}
										onClick={() =>
											setFormData((prev) => ({
												...prev,
												animation: animation.id,
											}))
										}
									>
										<h4 className="font-medium mb-1">{animation.name}</h4>
										<p className="text-sm text-muted-foreground">
											{animation.description}
										</p>
									</div>
								))}
							</div>
						</div>

						<Button type="submit" className="w-full" disabled={loading}>
							{loading ? "Creating..." : "Create Card"}
						</Button>
					</form>
				</Card>
			</motion.div>
		</div>
	);
}
