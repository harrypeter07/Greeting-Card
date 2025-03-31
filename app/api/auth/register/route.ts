import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/db/connectMongo";
import { User } from "@/lib/db";
import { hash } from "bcryptjs";

export async function POST(request: Request) {
	try {
		const { name, email, password } = await request.json();

		// Validate input
		if (!name || !email || !password) {
			return NextResponse.json(
				{ message: "Missing required fields" },
				{ status: 400 }
			);
		}

		// Connect to MongoDB
		await connectMongo();

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return NextResponse.json(
				{ message: "User already exists" },
				{ status: 400 }
			);
		}

		// Hash password
		const hashedPassword = await hash(password, 12);

		// Create new user
		const user = await User.create({
			name,
			email,
			password: hashedPassword,
		});

		// Remove password from response
		const { password: _, ...userWithoutPassword } = user.toObject();

		return NextResponse.json(
			{
				message: "User created successfully",
				user: userWithoutPassword,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Registration error:", error);
		return NextResponse.json(
			{ message: "Error creating user" },
			{ status: 500 }
		);
	}
}
