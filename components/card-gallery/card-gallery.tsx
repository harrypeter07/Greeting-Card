"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { deleteCard } from "@/lib/actions/card-actions";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";

interface CardItem {
	id: string;
	title: string;
	message: string;
	template: string;
	createdAt: string;
}

interface CardGalleryProps {
	initialCards: CardItem[];
}

export function CardGallery({ initialCards }: CardGalleryProps) {
	const { toast } = useToast();
	const { status, signIn } = useAuth();
	const [cards, setCards] = useState<CardItem[]>(initialCards);
	const [isDeleting, setIsDeleting] = useState<string | null>(null);

	const handleDeleteCard = async (cardId: string) => {
		if (confirm("Are you sure you want to delete this card?")) {
			setIsDeleting(cardId);
			try {
				await deleteCard(cardId);
				setCards(cards.filter((card) => card.id !== cardId));
				toast({
					title: "Card deleted",
					description: "Your card has been deleted successfully",
				});
			} catch (error) {
				console.error("Error deleting card:", error);
				toast({
					title: "Error",
					description: "Failed to delete your card. Please try again.",
					variant: "destructive",
				});
			} finally {
				setIsDeleting(null);
			}
		}
	};

	const getTemplateBackground = (template: string) => {
		switch (template) {
			case "classic":
				return "bg-gradient-to-r from-green-100 to-green-300";
			case "modern":
				return "bg-gradient-to-r from-blue-100 to-blue-300";
			case "festive":
				return "bg-gradient-to-r from-yellow-100 to-yellow-300";
			default:
				return "bg-gradient-to-r from-green-100 to-green-300";
		}
	};

	if (status !== "authenticated") {
		return (
			<div className="text-center py-12">
				<h2 className="text-xl font-semibold mb-4">
					Sign in to view your cards
				</h2>
				<p className="text-muted-foreground mb-6">
					You need to sign in to view and manage your saved Eid greeting cards.
				</p>
				<Button onClick={signIn}>Sign in</Button>
			</div>
		);
	}

	if (cards.length === 0) {
		return (
			<div className="text-center py-12">
				<h2 className="text-xl font-semibold mb-4">No cards yet</h2>
				<p className="text-muted-foreground mb-6">
					You haven&apos;t created any Eid greeting cards yet. Start creating
					your first card now!
				</p>
				<Link href="/design">
					<Button>Create Card</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{cards.map((card) => (
				<Card key={card.id} className="overflow-hidden">
					<CardHeader className={getTemplateBackground(card.template)}>
						<CardTitle className="text-center">{card.title}</CardTitle>
					</CardHeader>
					<CardContent className="pt-6">
						<p className="text-sm line-clamp-3">{card.message}</p>
						<p className="text-xs text-muted-foreground mt-2">
							Created: {new Date(card.createdAt).toLocaleDateString()}
						</p>
					</CardContent>
					<CardFooter className="flex justify-between">
						<Link href={`/card/${card.id}`}>
							<Button variant="outline" size="sm">
								View
							</Button>
						</Link>
						<Button
							variant="destructive"
							size="sm"
							onClick={() => handleDeleteCard(card.id)}
							disabled={isDeleting === card.id}
						>
							{isDeleting === card.id ? "Deleting..." : "Delete"}
						</Button>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
