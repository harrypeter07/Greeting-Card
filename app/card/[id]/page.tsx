import { getCardById } from "@/lib/actions/card-actions"
import { CardViewer } from "@/components/card-viewer/card-viewer"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface CardPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: CardPageProps): Promise<Metadata> {
  try {
    const { card } = await getCardById(params.id)

    if (!card) {
      return {
        title: "Card Not Found",
      }
    }

    return {
      title: `${card.title} | Eid Greeting Card`,
      description: card.message.substring(0, 160),
    }
  } catch (error) {
    return {
      title: "Eid Greeting Card",
    }
  }
}

export default async function CardPage({ params }: CardPageProps) {
  try {
    const { card } = await getCardById(params.id)

    if (!card) {
      notFound()
    }

    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">{card.title}</h1>
        <CardViewer card={card} />
      </div>
    )
  } catch (error) {
    notFound()
  }
}

