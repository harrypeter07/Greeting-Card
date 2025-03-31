"use client";

import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CardData {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	animation: string;
	likes: number;
	likedBy: string[];
	userId: string;
	createdAt: string;
}

export default function GalleryPage() {
	const { user, status } = useAuth();
	const [cards, setCards] = useState<CardData[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCards = async () => {
			try {
				const response = await fetch("/api/cards");
				const data = await response.json();
				setCards(data);
			} catch (error) {
				console.error("Error fetching cards:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchCards();
	}, []);

	if (loading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="flex items-center justify-center min-h-[60vh]">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold">Gallery</h1>
				{status === "authenticated" && (
					<Link href="/create">
						<Button>Create New Card</Button>
					</Link>
				)}
			</div>

			{cards.length === 0 ? (
				<div className="text-center py-12">
					<h2 className="text-xl font-semibold mb-4">No cards yet</h2>
					<p className="text-muted-foreground mb-6">
						Be the first to create a beautiful greeting card!
					</p>
					{status === "authenticated" ? (
						<Link href="/create">
							<Button>Start Creating</Button>
						</Link>
					) : (
						<Button onClick={() => (window.location.href = "/auth/signin")}>
							Sign In to Create
						</Button>
					)}
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{cards.map((card, index) => (
						<motion.div
							key={card.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
						>
							<Card {...card} />
						</motion.div>
					))}
				</div>
			)}
		</div>
	);
}
