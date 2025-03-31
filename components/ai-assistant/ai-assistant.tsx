"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { generateAiContent } from "@/lib/actions/ai-actions"

interface AIAssistantProps {
  onSuggestion: (suggestion: string) => void
  suggestion: string
  onApplySuggestion: () => void
}

export function AIAssistant({ onSuggestion, suggestion, onApplySuggestion }: AIAssistantProps) {
  const { toast } = useToast()
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateContent = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Enter a prompt to generate AI content",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    try {
      const result = await generateAiContent(prompt)
      if (result.text) {
        onSuggestion(result.text)
      } else {
        toast({
          title: "Error",
          description: "Failed to generate content. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error generating AI content:", error)
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="prompt">AI Prompt</Label>
        <Textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="E.g., Generate an Eid greeting message for my family"
          rows={3}
        />
      </div>

      <Button onClick={handleGenerateContent} disabled={isGenerating || !prompt.trim()}>
        {isGenerating ? "Generating..." : "Generate Content"}
      </Button>

      {suggestion && (
        <Card className="mt-4">
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium mb-2">AI Suggestion:</h3>
            <p className="text-sm text-muted-foreground mb-4">{suggestion}</p>
            <Button size="sm" onClick={onApplySuggestion}>
              Apply Suggestion
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="text-xs text-muted-foreground mt-2">
        <p>Example prompts:</p>
        <ul className="list-disc pl-4 space-y-1 mt-1">
          <li>Generate a warm Eid greeting for close friends</li>
          <li>Write a formal Eid message for colleagues</li>
          <li>Create a poetic Eid greeting with Islamic references</li>
        </ul>
      </div>
    </div>
  )
}

