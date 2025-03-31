import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongo } from "@/lib/db/connectMongo";
import { User } from "@/lib/db/models/User.model";
import { NextAuthOptions } from "next-auth";
import { compare } from "bcryptjs";

export const authConfig: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Invalid credentials");
				}

				try {
					await connectMongo();
					const user = await User.findOne({ email: credentials.email });

					if (!user) {
						throw new Error("No user found");
					}

					const isValid = await compare(credentials.password, user.password);

					if (!isValid) {
						throw new Error("Invalid password");
					}

					return {
						id: user._id.toString(),
						email: user.email,
						name: user.name,
					};
				} catch (error) {
					console.error("Auth error:", error);
					throw error;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
			}
			return session;
		},
	},
	pages: {
		signIn: "/auth/signin",
		error: "/auth/error",
	},
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	debug: process.env.NODE_ENV === "development",
};
