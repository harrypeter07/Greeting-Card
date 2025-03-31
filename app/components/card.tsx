"use client";

import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Card as UICard } from "@/components/ui/card";
import { Heart, HeartFilled } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
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

const animationVariants = {
	fade: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		transition: { duration: 0.5 },
	},
	slide: {
		initial: { x: -100, opacity: 0 },
		animate: { x: 0, opacity: 1 },
		transition: { duration: 0.5 },
	},
	bounce: {
		initial: { y: 50, opacity: 0 },
		animate: { y: 0, opacity: 1 },
		transition: { type: "spring", stiffness: 200, damping: 15 },
	},
	zoom: {
		initial: { scale: 0.5, opacity: 0 },
		animate: { scale: 1, opacity: 1 },
		transition: { duration: 0.5 },
	},
	flip: {
		initial: { rotateY: 180, opacity: 0 },
		animate: { rotateY: 0, opacity: 1 },
		transition: { duration: 0.5 },
	},
	rotate: {
		initial: { rotate: -180, opacity: 0 },
		animate: { rotate: 0, opacity: 1 },
		transition: { duration: 0.5 },
	},
};

export function Card({
	id,
	title,
	description,
	imageUrl,
	animation,
	likes: initialLikes,
	likedBy: initialLikedBy,
	userId,
	createdAt,
}: CardProps) {
	const { user } = useAuth();
	const [likes, setLikes] = useState(initialLikes);
	const [likedBy, setLikedBy] = useState(initialLikedBy);
	const [isLiking, setIsLiking] = useState(false);

	const hasLiked = user ? likedBy.includes(user.id) : false;

	const handleLike = async () => {
		if (!user) {
			window.location.href = "/auth/signin";
			return;
		}

		setIsLiking(true);
		try {
			const response = await fetch(`/api/cards/${id}/like`, {
				method: "POST",
			});

			if (!response.ok) throw new Error("Failed to like card");

			const data = await response.json();
			setLikes(data.likes);
			setLikedBy(data.likedBy);
		} catch (error) {
			console.error("Error liking card:", error);
		} finally {
			setIsLiking(false);
		}
	};

	return (
		<motion.div
			variants={animationVariants[animation as keyof typeof animationVariants]}
			initial="initial"
			animate="animate"
			className="group"
		>
			<UICard className="overflow-hidden transition-all duration-300 hover:shadow-lg">
				<div className="aspect-video relative">
					<img
						src={imageUrl}
						alt={title}
						className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
					/>
					<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
				</div>
				<div className="p-4">
					<h3 className="font-semibold mb-2">{title}</h3>
					<p className="text-sm text-muted-foreground mb-4">{description}</p>
					<div className="flex justify-between items-center">
						<div className="flex items-center space-x-2">
							<Button
								variant="ghost"
								size="sm"
								className={cn(
									"p-2 hover:bg-red-100",
									hasLiked && "text-red-500 hover:text-red-600"
								)}
								onClick={handleLike}
								disabled={isLiking}
							>
								{hasLiked ? (
									<HeartFilled className="h-5 w-5" />
								) : (
									<Heart className="h-5 w-5" />
								)}
								<span className="ml-1">{likes}</span>
							</Button>
						</div>
						<div className="text-sm text-muted-foreground">
							{new Date(createdAt).toLocaleDateString()}
						</div>
					</div>
				</div>
			</UICard>
		</motion.div>
	);
}
