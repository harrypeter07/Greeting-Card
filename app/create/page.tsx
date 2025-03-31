"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/components/auth-provider";
import { toast } from "sonner";

const animations = [
	{ id: "fade", name: "Fade" },
	{ id: "slide", name: "Slide" },
	{ id: "bounce", name: "Bounce" },
	{ id: "zoom", name: "Zoom" },
];

const templates = [
	{ id: "eid1", name: "Eid Template 1" },
	{ id: "eid2", name: "Eid Template 2" },
	{ id: "eid3", name: "Eid Template 3" },
];

export default function CreatePage() {
	const router = useRouter();
	const { user } = useAuth();
	const [formData, setFormData] = useState({
		title: "",
		message: "",
		template: templates[0]?.id || "",
		design: {
			colors: ["#000000", "#ffffff"],
			font: "Arial",
			layout: "standard",
			background: "#ffffff",
		},
		aiGenerated: false,
		imageUrl: "",
		animation: animations[0]?.id || "fade",
		category: "eid",
		isPublic: false,
		recipientName: "",
		recipientEmail: "",
		scheduledDate: "",
		theme: "eid",
		font: "Arial",
		colors: ["#000000", "#ffffff"],
		userId: user?.id || "",
	});
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await fetch("/api/cards", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error("Failed to create card");
			}

			const data = await response.json();
			toast.success("Card created successfully!");
			router.push(`/cards/${data.id}`);
		} catch (error) {
			console.error("Error creating card:", error);
			toast.error("Failed to create card. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value, type } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]:
				type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
		}));
	};

	return (
		<div className="container max-w-2xl mx-auto py-10">
			<Card>
				<CardHeader>
					<CardTitle>Create New Card</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="space-y-2">
							<Label htmlFor="title">Title</Label>
							<Input
								id="title"
								name="title"
								value={formData.title}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="message">Message</Label>
							<Textarea
								id="message"
								name="message"
								value={formData.message}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="template">Template</Label>
							<Select
								value={formData.template}
								onValueChange={(value) =>
									setFormData((prev) => ({ ...prev, template: value }))
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select a template" />
								</SelectTrigger>
								<SelectContent>
									{templates.map((template) => (
										<SelectItem key={template.id} value={template.id}>
											{template.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="animation">Animation</Label>
							<Select
								value={formData.animation}
								onValueChange={(value) =>
									setFormData((prev) => ({ ...prev, animation: value }))
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select an animation" />
								</SelectTrigger>
								<SelectContent>
									{animations.map((animation) => (
										<SelectItem key={animation.id} value={animation.id}>
											{animation.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="imageUrl">Image URL (Optional)</Label>
							<Input
								id="imageUrl"
								name="imageUrl"
								type="url"
								value={formData.imageUrl}
								onChange={handleChange}
							/>
						</div>

						<div className="flex items-center space-x-2">
							<Switch
								id="isPublic"
								checked={formData.isPublic}
								onCheckedChange={(checked) =>
									setFormData((prev) => ({ ...prev, isPublic: checked }))
								}
							/>
							<Label htmlFor="isPublic">Make card public</Label>
						</div>

						<Button type="submit" className="w-full" disabled={loading}>
							{loading ? "Creating..." : "Create Card"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
