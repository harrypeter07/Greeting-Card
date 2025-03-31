"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"
import { Share2, Download } from "lucide-react"
import html2canvas from "html2canvas"

interface CardViewerProps {
  card: {
    id: string
    title: string
    message: string
    template: string
    design: any
    createdAt: string
  }
}

export function CardViewer({ card }: CardViewerProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      // Clear any existing animations
      gsap.killTweensOf(cardRef.current.querySelectorAll("*"))

      // Create new animations based on the template
      const elements = cardRef.current.querySelectorAll(".animate-element")

      if (card.template === "classic") {
        gsap.fromTo(
          elements,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.out" },
        )
      } else if (card.template === "modern") {
        gsap.fromTo(
          elements,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.2, duration: 0.8, ease: "back.out(1.7)" },
        )
      } else if (card.template === "festive") {
        gsap.fromTo(
          elements,
          { rotation: -5, opacity: 0 },
          { rotation: 0, opacity: 1, stagger: 0.2, duration: 1.2, ease: "elastic.out(1, 0.3)" },
        )

        // Add floating animation for decorative elements
        gsap.to(".decoration", {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.3,
        })
      }
    }
  }, [card.template])

  const getTemplateBackground = () => {
    switch (card.template) {
      case "classic":
        return "bg-gradient-to-r from-green-100 to-green-300"
      case "modern":
        return "bg-gradient-to-r from-blue-100 to-blue-300"
      case "festive":
        return "bg-gradient-to-r from-yellow-100 to-yellow-300"
      default:
        return "bg-gradient-to-r from-green-100 to-green-300"
    }
  }

  const handleDownload = async () => {
    if (cardRef.current) {
      try {
        const canvas = await html2canvas(cardRef.current)
        const image = canvas.toDataURL("image/png")
        const link = document.createElement("a")
        link.href = image
        link.download = `${card.title.replace(/\s+/g, "-").toLowerCase()}.png`
        link.click()
      } catch (error) {
        console.error("Error downloading card:", error)
      }
    }
  }

  const handleShare = async () => {
    if (navigator.share && cardRef.current) {
      try {
        const canvas = await html2canvas(cardRef.current)
        canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], `${card.title}.png`, { type: "image/png" })
            await navigator.share({
              title: card.title,
              text: "Check out my Eid greeting card!",
              files: [file],
            })
          }
        })
      } catch (error) {
        console.error("Error sharing card:", error)
        // Fallback for browsers that don't support navigator.share
        alert("Copy this URL to share your card: " + window.location.href)
      }
    } else {
      // Fallback for browsers that don't support navigator.share
      alert("Copy this URL to share your card: " + window.location.href)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <Card className="overflow-hidden max-w-2xl w-full mb-6">
        <CardContent className={`p-0 ${getTemplateBackground()}`}>
          <div ref={cardRef} className="aspect-[4/3] p-8 flex flex-col items-center justify-center text-center">
            {card.template === "festive" && (
              <>
                <div className="decoration absolute top-4 left-4 text-3xl">🌙</div>
                <div className="decoration absolute top-4 right-4 text-3xl">✨</div>
                <div className="decoration absolute bottom-4 left-4 text-3xl">✨</div>
                <div className="decoration absolute bottom-4 right-4 text-3xl">🌙</div>
              </>
            )}

            <h2 className="animate-element text-2xl font-bold mb-4">{card.title}</h2>
            <p className="animate-element text-lg">{card.message}</p>

            {card.template === "classic" && <div className="animate-element mt-6 text-3xl">🕌</div>}

            {card.template === "modern" && (
              <div className="animate-element mt-6 flex space-x-2">
                <span className="text-3xl">🌙</span>
                <span className="text-3xl">✨</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-4">
        <Button onClick={handleShare} className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
        <Button onClick={handleDownload} variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>
    </div>
  )
}

