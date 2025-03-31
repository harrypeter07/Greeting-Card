"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		role: "",
		message: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Implement form submission
		console.log("Form submitted:", formData);
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
				<h1 className="text-4xl font-bold mb-4">Contact Us</h1>
				<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
					Interested in joining our team? Fill out the form below and we'll get
					back to you soon.
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
								htmlFor="name"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Name
							</label>
							<Input
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="email"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Email
							</label>
							<Input
								id="email"
								name="email"
								type="email"
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="role"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Role
							</label>
							<Input
								id="role"
								name="role"
								value={formData.role}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="message"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Message
							</label>
							<Textarea
								id="message"
								name="message"
								value={formData.message}
								onChange={handleChange}
								required
								className="min-h-[150px]"
							/>
						</div>

						<Button type="submit" className="w-full">
							Send Message
						</Button>
					</form>
				</Card>
			</motion.div>
		</div>
	);
}
