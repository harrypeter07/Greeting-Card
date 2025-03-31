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
