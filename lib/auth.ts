import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectMongo } from "@/lib/db/connectMongo";
import { User } from "@/lib/db/models/User.model";

export const authOptions = {
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

					// Check if user exists
					const existingUser = await User.findOne({ googleId: user.id });

					if (!existingUser) {
						// Create new user
						await User.create({
							googleId: user.id,
							name: user.name,
							email: user.email,
							cards: [],
						});
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
					const user = await User.findOne({ googleId: token.sub });
					console.log("Found user in DB:", user);

					if (user && session.user) {
						session.user.id = user._id.toString();
						session.user.email = user.email;
						session.user.name = user.name;
						session.user.googleId = token.sub;
						console.log("Final session user:", session.user);
					} else {
						console.error("User not found in DB or no session user");
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
	},
};

export const auth = () => getServerSession(authOptions);
