"use server";

import { connectMongo } from "@/lib/db/connectMongo";
import { Card } from "@/lib/db/models/Card.model";
import { User } from "@/lib/db/models/User.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

interface SaveCardParams {
	title: string;
	message: string;
	template: string;
	design: any;
	aiGenerated: boolean;
}

export async function saveCard(params: SaveCardParams) {
	const session = await getServerSession(authOptions);

	if (!session?.user?.id) {
		console.error("Session state:", session);
		throw new Error("You must be signed in to save a card");
	}

	try {
		await connectMongo();

		const card = await Card.create({
			owner: session.user.id,
			title: params.title,
			message: params.message,
			template: params.template,
			design: params.design,
			aiGenerated: params.aiGenerated,
		});

		// Add card to user's cards array
		await User.findByIdAndUpdate(session.user.id, {
			$push: { cards: card._id },
		});

		revalidatePath("/gallery");

		return { success: true, cardId: card._id };
	} catch (error) {
		console.error("Error saving card:", error);
		throw new Error("Failed to save card");
	}
}

export async function getUserCards() {
	const session = await getServerSession(authOptions);

	if (!session?.user?.id) {
		return { cards: [] };
	}

	try {
		await connectMongo();

		const user = await User.findById(session.user.id).populate("cards");

		if (!user) {
			throw new Error("User not found");
		}

		return {
			cards: user.cards.map((card: any) => ({
				id: card._id.toString(),
				title: card.title,
				message: card.message,
				template: card.template,
				createdAt: card.createdAt,
			})),
		};
	} catch (error) {
		console.error("Error fetching user cards:", error);
		throw new Error("Failed to fetch cards");
	}
}

export async function deleteCard(cardId: string) {
	const session = await getServerSession(authOptions);

	if (!session?.user?.id) {
		throw new Error("You must be signed in to delete a card");
	}

	try {
		await connectMongo();

		// Find the card and check ownership
		const card = await Card.findById(cardId);

		if (!card) {
			throw new Error("Card not found");
		}

		if (card.owner.toString() !== session.user.id) {
			throw new Error("You do not have permission to delete this card");
		}

		// Remove card from user's cards array
		await User.findByIdAndUpdate(session.user.id, { $pull: { cards: cardId } });

		// Delete the card
		await Card.findByIdAndDelete(cardId);

		revalidatePath("/gallery");

		return { success: true };
	} catch (error) {
		console.error("Error deleting card:", error);
		throw new Error("Failed to delete card");
	}
}

export async function getCardById(cardId: string) {
	try {
		await connectMongo();

		const card = await Card.findById(cardId);

		if (!card) {
			return { card: null };
		}

		return {
			card: {
				id: card._id.toString(),
				title: card.title,
				message: card.message,
				template: card.template,
				design: card.design,
				createdAt: card.createdAt,
			},
		};
	} catch (error) {
		console.error("Error fetching card:", error);
		throw new Error("Failed to fetch card");
	}
}
