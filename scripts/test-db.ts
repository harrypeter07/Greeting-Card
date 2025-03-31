import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables from .env file
config({ path: resolve(__dirname, "../.env") });

import dbConnect from "../lib/db-connect";

async function testConnection() {
	try {
		console.log("Testing MongoDB connection...");
		await dbConnect();
		console.log("✅ Connection test successful!");
		process.exit(0);
	} catch (error) {
		console.error("❌ Connection test failed:", error);
		process.exit(1);
	}
}

testConnection();
