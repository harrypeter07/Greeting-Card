import { CardEditor } from "@/components/card-editor/card-editor"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Design Your Eid Card",
  description: "Create a personalized Eid greeting card",
}

export default function DesignPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Design Your Eid Greeting Card</h1>
      <CardEditor />
    </div>
  )
}

