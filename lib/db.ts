import mongoose from "mongoose";
import { connectMongo } from "./db/connectMongo";

if (!process.env.MONGODB_URI) {
	throw new Error(
		"Please define the MONGODB_URI environment variable inside .env"
	);
}

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

export async function db() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		};

		try {
			cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
				console.log("✅ MongoDB Connected Successfully!");
				return mongoose;
			});
		} catch (error) {
			console.error("❌ MongoDB Connection Error:", error);
			throw error;
		}
	}

	try {
		cached.conn = await cached.promise;
	} catch (e) {
		cached.promise = null;
		throw e;
	}

	return cached.conn;
}

// Create User model
const UserSchema = new mongoose.Schema(
	{
		name: String,
		email: { type: String, unique: true },
		emailVerified: Date,
		password: String,
		image: String,
	},
	{
		timestamps: true,
	}
);

export const User = mongoose.models.User || mongoose.model("User", UserSchema);

// Create Account model
const AccountSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		type: String,
		provider: String,
		providerAccountId: String,
		refresh_token: String,
		access_token: String,
		expires_at: Number,
		token_type: String,
		scope: String,
		id_token: String,
		session_state: String,
	},
	{
		timestamps: true,
	}
);

export const Account =
	mongoose.models.Account || mongoose.model("Account", AccountSchema);

// Create Session model
const SessionSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		sessionToken: { type: String, unique: true },
		expires: Date,
	},
	{
		timestamps: true,
	}
);

export const Session =
	mongoose.models.Session || mongoose.model("Session", SessionSchema);

// Create VerificationToken model
const VerificationTokenSchema = new mongoose.Schema(
	{
		identifier: String,
		token: { type: String, unique: true },
		expires: Date,
	},
	{
		timestamps: true,
	}
);

export const VerificationToken =
	mongoose.models.VerificationToken ||
	mongoose.model("VerificationToken", VerificationTokenSchema);
