import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Eid Greeting Platform</h1>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/gallery">
              <Button variant="ghost">Gallery</Button>
            </Link>
            <Link href="/design">
              <Button>Create Card</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Create Beautiful Eid Greeting Cards
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Design personalized Eid greeting cards with custom text, images, and animations. Share your
                    creations with friends and family.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/design">
                    <Button size="lg" className="px-8">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/gallery">
                    <Button size="lg" variant="outline" className="px-8">
                      View Gallery
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="aspect-square rounded-lg bg-gradient-to-br from-green-100 to-green-300 flex items-center justify-center">
                        <span className="text-4xl">🌙</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="aspect-square rounded-lg bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center">
                        <span className="text-4xl">✨</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="aspect-square rounded-lg bg-gradient-to-br from-purple-100 to-purple-300 flex items-center justify-center">
                        <span className="text-4xl">🎁</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="aspect-square rounded-lg bg-gradient-to-br from-yellow-100 to-yellow-300 flex items-center justify-center">
                        <span className="text-4xl">🕌</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Everything you need to create beautiful Eid greeting cards
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Personalized Cards</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Create custom greeting cards with your own text, images, and animations.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>AI-Generated Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Use AI to generate festive images or text prompts for your cards.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Easy Sharing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Share your creations via social media or email, or download them as images.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Eid Greeting Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

