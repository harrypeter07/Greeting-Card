import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const session = await auth();
		if (!session?.user) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const card = await db.card.findUnique({
			where: { id: params.id },
			select: { likedBy: true },
		});

		if (!card) {
			return new NextResponse("Card not found", { status: 404 });
		}

		const hasLiked = card.likedBy.includes(session.user.id);

		const updatedCard = await db.card.update({
			where: { id: params.id },
			data: {
				likes: {
					increment: hasLiked ? -1 : 1,
				},
				likedBy: {
					set: hasLiked
						? card.likedBy.filter((id) => id !== session.user.id)
						: [...card.likedBy, session.user.id],
				},
			},
		});

		return NextResponse.json(updatedCard);
	} catch (error) {
		console.error("[CARD_LIKE]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
