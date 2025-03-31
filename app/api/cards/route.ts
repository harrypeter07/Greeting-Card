import { auth } from "@/auth";
import { connectMongo } from "@/lib/db/connectMongo";
import { Card } from "@/lib/db/models/Card.model";
import { cardSchema } from "@/lib/schema";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		await connectMongo();

		const cards = await Card.find()
			.sort({ createdAt: -1 })
			.populate("owner", "name email");

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

		await connectMongo();
		const body = await req.json();
		const validatedData = cardSchema.parse(body);

		const card = await Card.create({
			...validatedData,
			owner: session.user.id,
		});

		return NextResponse.json(card);
	} catch (error) {
		console.error("[CARD_POST]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
