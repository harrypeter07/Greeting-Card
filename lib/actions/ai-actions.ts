"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generateAiContent(prompt: string) {
  try {
    const enhancedPrompt = `Generate an Eid greeting message based on the following prompt: "${prompt}". 
    The message should be warm, festive, and appropriate for Eid celebrations. 
    Keep it under 200 characters.`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: enhancedPrompt,
      system: "You are a helpful assistant specializing in creating warm, culturally appropriate Eid greetings.",
    })

    return { text }
  } catch (error) {
    console.error("Error generating AI content:", error)
    return { error: "Failed to generate content" }
  }
}

