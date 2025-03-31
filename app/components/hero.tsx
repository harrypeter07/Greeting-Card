import { Button } from "@/components/ui/button";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import Link from "next/link";

export function Hero() {
	const words = [
		{
			text: "Create",
		},
		{
			text: "beautiful",
		},
		{
			text: "greeting",
		},
		{
			text: "cards",
		},
		{
			text: "with",
		},
		{
			text: "AI.",
		},
	];

	return (
		<div className="relative min-h-[80vh] flex items-center justify-center bg-grid-pattern">
			<div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
			<div className="relative z-10 text-center space-y-8 px-4">
				<h1 className="text-4xl md:text-6xl font-bold">
					<TypewriterEffect words={words} />
				</h1>
				<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
					Transform your ideas into stunning greeting cards with the power of
					artificial intelligence. Create personalized cards for any occasion in
					minutes.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Link href="/create">
						<Button size="lg" className="w-full sm:w-auto">
							Start Creating
						</Button>
					</Link>
					<Link href="/gallery">
						<Button size="lg" variant="outline" className="w-full sm:w-auto">
							View Gallery
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
