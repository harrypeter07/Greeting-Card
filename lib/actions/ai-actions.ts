"use server";

import { geminiModel } from "../gemini";

export async function generateAiContent(prompt: string) {
	try {
		const enhancedPrompt = `Generate an Eid greeting message based on the following prompt: "${prompt}". 
    The message should be warm, festive, and appropriate for Eid celebrations. 
    Keep it under 200 characters.`;

		const result = await geminiModel.generateContent(enhancedPrompt);
		const response = await result.response;
		const text = response.text();

		return { text };
	} catch (error) {
		console.error("Error generating AI content:", error);
		return { error: "Failed to generate content" };
	}
}
