"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth-provider";
import { gsap } from "gsap";
import { saveCard } from "@/lib/actions/card-actions";
import { AIAssistant } from "@/components/ai-assistant/ai-assistant";

const TEMPLATES = [
	{
		id: "classic",
		name: "Classic",
		background: "bg-gradient-to-r from-green-100 to-green-300",
	},
	{
		id: "modern",
		name: "Modern",
		background: "bg-gradient-to-r from-blue-100 to-blue-300",
	},
	{
		id: "festive",
		name: "Festive",
		background: "bg-gradient-to-r from-yellow-100 to-yellow-300",
	},
];

export function CardEditor() {
	const { user, status, signIn } = useAuth();
	const { toast } = useToast();
	const [title, setTitle] = useState("My Eid Card");
	const [message, setMessage] = useState(
		"Eid Mubarak! Wishing you joy, peace, and prosperity."
	);
	const [template, setTemplate] = useState(TEMPLATES[0].id);
	const [aiSuggestion, setAiSuggestion] = useState("");
	const cardRef = useRef<HTMLDivElement>(null);
	const [isSaving, setIsSaving] = useState(false);

	// Initialize GSAP animations
	useEffect(() => {
		if (cardRef.current) {
			// Clear any existing animations
			gsap.killTweensOf(cardRef.current.querySelectorAll("*"));

			// Create new animations based on the template
			const elements = cardRef.current.querySelectorAll(".animate-element");

			if (template === "classic") {
				gsap.fromTo(
					elements,
					{ y: -20, opacity: 0 },
					{ y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.out" }
				);
			} else if (template === "modern") {
				gsap.fromTo(
					elements,
					{ scale: 0.8, opacity: 0 },
					{
						scale: 1,
						opacity: 1,
						stagger: 0.2,
						duration: 0.8,
						ease: "back.out(1.7)",
					}
				);
			} else if (template === "festive") {
				gsap.fromTo(
					elements,
					{ rotation: -5, opacity: 0 },
					{
						rotation: 0,
						opacity: 1,
						stagger: 0.2,
						duration: 1.2,
						ease: "elastic.out(1, 0.3)",
					}
				);

				// Add floating animation for decorative elements
				gsap.to(".decoration", {
					y: -10,
					duration: 2,
					repeat: -1,
					yoyo: true,
					ease: "sine.inOut",
					stagger: 0.3,
				});
			}
		}
	}, [template]);

	const handleSaveCard = async () => {
		if (status === "unauthenticated") {
			toast({
				title: "Authentication Required",
				description: "Please sign in to save your card",
				variant: "destructive",
			});
			signIn();
			return;
		}

		setIsSaving(true);
		try {
			await saveCard({
				title,
				message,
				template,
				design: {
					background: getTemplateBackground(),
					// Add any other design properties here
				},
				aiGenerated: false,
			});

			toast({
				title: "Success!",
				description: "Your card has been saved",
			});
		} catch (error) {
			console.error("Error saving card:", error);
			toast({
				title: "Error",
				description: "Failed to save card. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsSaving(false);
		}
	};

	const getTemplateBackground = () => {
		return (
			TEMPLATES.find((t) => t.id === template)?.background ||
			TEMPLATES[0].background
		);
	};

	const handleApplyAiSuggestion = () => {
		if (aiSuggestion) {
			setMessage(aiSuggestion);
			setAiSuggestion("");
		}
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
			<div>
				<Tabs defaultValue="content">
					<TabsList className="mb-4">
						<TabsTrigger value="content">Content</TabsTrigger>
						<TabsTrigger value="template">Template</TabsTrigger>
						<TabsTrigger value="ai">AI Assistant</TabsTrigger>
					</TabsList>

					<TabsContent value="content" className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="title">Card Title</Label>
							<Input
								id="title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Enter card title"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="message">Message</Label>
							<Textarea
								id="message"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								placeholder="Enter your Eid greeting message"
								rows={5}
							/>
						</div>
					</TabsContent>

					<TabsContent value="template" className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="template">Select Template</Label>
							<Select value={template} onValueChange={setTemplate}>
								<SelectTrigger>
									<SelectValue placeholder="Select a template" />
								</SelectTrigger>
								<SelectContent>
									{TEMPLATES.map((t) => (
										<SelectItem key={t.id} value={t.id}>
											{t.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</TabsContent>

					<TabsContent value="ai" className="space-y-4">
						<AIAssistant
							onSuggestion={setAiSuggestion}
							suggestion={aiSuggestion}
							onApplySuggestion={handleApplyAiSuggestion}
						/>
					</TabsContent>
				</Tabs>

				<div className="mt-8 flex flex-col space-y-4">
					<Button onClick={handleSaveCard} disabled={isSaving}>
						{isSaving ? "Saving..." : "Save Card"}
					</Button>

					{status !== "authenticated" && (
						<Button variant="outline" onClick={signIn}>
							Sign in to save your cards
						</Button>
					)}
				</div>
			</div>

			<div>
				<h2 className="text-xl font-semibold mb-4">Preview</h2>
				<Card className="overflow-hidden">
					<CardContent className={`p-0 ${getTemplateBackground()}`}>
						<div
							ref={cardRef}
							className="aspect-[4/3] p-8 flex flex-col items-center justify-center text-center"
						>
							{template === "festive" && (
								<>
									<div className="decoration absolute top-4 left-4 text-3xl">
										🌙
									</div>
									<div className="decoration absolute top-4 right-4 text-3xl">
										✨
									</div>
									<div className="decoration absolute bottom-4 left-4 text-3xl">
										✨
									</div>
									<div className="decoration absolute bottom-4 right-4 text-3xl">
										🌙
									</div>
								</>
							)}

							<h2 className="animate-element text-2xl font-bold mb-4">
								{title}
							</h2>
							<p className="animate-element text-lg">{message}</p>

							{template === "classic" && (
								<div className="animate-element mt-6 text-3xl">🕌</div>
							)}

							{template === "modern" && (
								<div className="animate-element mt-6 flex space-x-2">
									<span className="text-3xl">🌙</span>
									<span className="text-3xl">✨</span>
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
