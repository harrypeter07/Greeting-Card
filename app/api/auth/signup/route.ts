import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req: Request) {
	try {
		const { name, email, password } = await req.json();

		// Check if user already exists
		const existingUser = await db.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return NextResponse.json(
				{ error: "User already exists" },
				{ status: 400 }
			);
		}

		// Hash password
		const hashedPassword = await hash(password, 12);

		// Create user
		const user = await db.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				emailVerified: null,
				image: null,
			},
		});

		// Remove password from response
		const { password: _, ...userWithoutPassword } = user;

		return NextResponse.json(
			{
				success: true,
				message: "User created successfully",
				user: userWithoutPassword,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Signup error:", error);
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 500 }
		);
	}
}
