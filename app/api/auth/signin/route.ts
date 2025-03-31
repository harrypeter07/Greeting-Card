import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { db } from "@/lib/db";
import { signIn } from "@/auth";

export async function POST(req: Request) {
	try {
		const { email, password } = await req.json();

		// Find user
		const user = await db.user.findUnique({
			where: { email },
		});

		if (!user || !user.password) {
			return NextResponse.json(
				{ error: "Invalid credentials" },
				{ status: 401 }
			);
		}

		// Verify password
		const isValid = await compare(password, user.password);

		if (!isValid) {
			return NextResponse.json(
				{ error: "Invalid credentials" },
				{ status: 401 }
			);
		}

		// Sign in user
		const result = await signIn("credentials", {
			email,
			password,
			redirect: false,
		});

		if (result?.error) {
			return NextResponse.json(
				{ error: "Invalid credentials" },
				{ status: 401 }
			);
		}

		// Remove password from response
		const { password: _, ...userWithoutPassword } = user;

		return NextResponse.json(
			{
				success: true,
				message: "Signed in successfully",
				user: userWithoutPassword,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Signin error:", error);
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 500 }
		);
	}
}
