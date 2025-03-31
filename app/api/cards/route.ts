import { auth } from "@/auth";
import { db } from "@/lib/db";
import { cardSchema } from "@/lib/schema";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const cards = await db.card.findMany({
			orderBy: {
				createdAt: "desc",
			},
		});

		return NextResponse.json(cards);
	} catch (error) {
		console.error("[CARDS_GET]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}

export async function POST(req: Request) {
	try {
		const session = await auth();
		if (!session?.user) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const body = await req.json();
		const validatedData = cardSchema.parse(body);

		const card = await db.card.create({
			data: {
				...validatedData,
				userId: session.user.id,
			},
		});

		return NextResponse.json(card);
	} catch (error) {
		console.error("[CARD_POST]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
