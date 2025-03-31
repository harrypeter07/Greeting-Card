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

interface MongooseConnection {
	conn: typeof mongoose | null;
	promise: Promise<typeof mongoose> | null;
}

declare global {
	var mongoose: MongooseConnection;
}

// Initialize the global mongoose object if it doesn't exist
if (!global.mongoose) {
	global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
	if (global.mongoose.conn) {
		return global.mongoose.conn;
	}

	if (!global.mongoose.promise) {
		const opts = {
			bufferCommands: true,
		};

		// Construct the connection string with the database name
		const connectionString = `${MONGODB_URI}/${DB_NAME}`;

		global.mongoose.promise = mongoose
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
		global.mongoose.conn = await global.mongoose.promise;
		return global.mongoose.conn;
	} catch (e) {
		global.mongoose.promise = null;
		throw e;
	}
}

export default dbConnect;
