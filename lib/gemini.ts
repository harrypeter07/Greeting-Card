import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GOOGLE_API_KEY) {
	throw new Error(
		"Please define the GOOGLE_API_KEY environment variable inside .env"
	);
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY, {
	apiVersion: "v1beta",
});

export const geminiModel = genAI.getGenerativeModel({
	model: "gemini-1.0-pro",
});
