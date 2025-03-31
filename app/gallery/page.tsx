import { CardGallery } from "@/components/card-gallery/card-gallery"
import { getUserCards } from "@/lib/actions/card-actions"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Your Eid Cards Gallery",
  description: "View and manage your saved Eid greeting cards",
}

export default async function GalleryPage() {
  const { cards } = await getUserCards()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Your Eid Cards Gallery</h1>
      <CardGallery initialCards={cards} />
    </div>
  )
}

