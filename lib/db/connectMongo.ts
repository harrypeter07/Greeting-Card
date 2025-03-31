import mongoose from "mongoose";

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

export async function connectMongo() {
	if (cached.conn) {
		console.log("Using cached MongoDB connection");
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
