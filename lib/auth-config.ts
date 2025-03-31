import GoogleProvider from "next-auth/providers/google";
import { connectMongo } from "@/lib/db/connectMongo";
import { User } from "@/lib/db/models/User.model";

export const authConfig = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async signIn({ user, account }: any) {
			if (account?.provider === "google") {
				try {
					await connectMongo();
					console.log("Sign in attempt for user:", user);

					// Check if user exists
					const existingUser = await User.findOne({ googleId: user.id });
					console.log("Existing user check:", existingUser);

					if (!existingUser) {
						// Create new user
						const newUser = await User.create({
							googleId: user.id,
							name: user.name,
							email: user.email,
							cards: [],
						});
						console.log("Created new user:", newUser);
					} else {
						console.log("User already exists:", existingUser);
					}

					return true;
				} catch (error) {
					console.error("Error during sign in:", error);
					return false;
				}
			}
			return true;
		},
		async session({ session, token }: any) {
			if (token.sub) {
				try {
					await connectMongo();
					console.log("Token data:", token);
					let user = await User.findOne({ googleId: token.sub });
					console.log("Found user in DB:", user);

					if (!user) {
						// Create user if they don't exist
						user = await User.create({
							googleId: token.sub,
							name: token.name,
							email: token.email,
							cards: [],
						});
						console.log("Created new user in session callback:", user);
					}

					if (user && session.user) {
						session.user.id = user._id.toString();
						session.user.email = user.email;
						session.user.name = user.name;
						session.user.googleId = token.sub;
						console.log("Final session user:", session.user);
					} else {
						console.error("Failed to create or find user");
					}
				} catch (error) {
					console.error("Error fetching user session:", error);
				}
			} else {
				console.error("No token.sub found");
			}
			return session;
		},
		async jwt({ token, account, user }: any) {
			if (account && user) {
				token.accessToken = account.access_token;
				token.sub = user.id;
				token.email = user.email;
				token.name = user.name;
			}
			return token;
		},
	},
	pages: {
		signIn: "/auth/signin",
	},
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
};
