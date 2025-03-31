import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

if (!MONGODB_URI) {
	throw new Error(
		"Please define the MONGODB_URI environment variable inside .env"
	);
}

if (!DB_NAME) {
	throw new Error("Please define the DB_NAME environment variable inside .env");
}

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: true,
		};

		const connectionString = `${MONGODB_URI}${DB_NAME}`;

		cached.promise = mongoose
			.connect(connectionString, opts)
			.then((mongoose) => {
				console.log("✅ MongoDB Connected Successfully!");
				return mongoose;
			})
			.catch((error) => {
				console.error("❌ MongoDB Connection Error:", error);
				throw error;
			});
	}

	try {
		cached.conn = await cached.promise;
		return cached.conn;
	} catch (e) {
		cached.promise = null;
		throw e;
	}
}

export default dbConnect;
