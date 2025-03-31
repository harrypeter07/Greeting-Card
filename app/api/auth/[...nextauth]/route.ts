import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/lib/db";
import { compare } from "bcryptjs";
import { connectMongo } from "@/lib/db/connectMongo";

export const authOptions = {
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/signin",
	},
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				await connectMongo();

				const user = await User.findOne({
					email: credentials.email,
				});

				if (!user || !user.password) {
					return null;
				}

				const isPasswordValid = await compare(
					credentials.password,
					user.password
				);

				if (!isPasswordValid) {
					return null;
				}

				return {
					id: user._id.toString(),
					email: user.email,
					name: user.name,
				};
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			if (token) {
				session.user.id = token.id;
			}
			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
