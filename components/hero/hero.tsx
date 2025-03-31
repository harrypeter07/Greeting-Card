"use client";

import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";
import Link from "next/link";

export function Hero() {
	const { status, signIn } = useAuth();

	return (
		<div className="relative py-20 flex items-center justify-center overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 bg-grid-pattern opacity-5" />

			{/* Content */}
			<div className="container mx-auto px-4 relative z-10">
				<div className="max-w-4xl mx-auto text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="mb-8"
					>
						<h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
							Create Beautiful
							<br />
							<TypeAnimation
								sequence={["Eid Greeting Cards", 2000, "Digital Wishes", 2000]}
								wrapper="span"
								speed={50}
								repeat={Infinity}
								className="text-primary"
							/>
						</h1>
						<p className="text-xl text-muted-foreground mb-8">
							Design stunning Eid greeting cards with our AI-powered platform.
							Share your warmest wishes with loved ones this Eid.
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="flex flex-col sm:flex-row gap-4 justify-center"
					>
						<Link href="/design">
							<Button size="lg" className="w-full sm:w-auto">
								Start Creating
							</Button>
						</Link>
						{status !== "authenticated" && (
							<Button
								size="lg"
								variant="outline"
								className="w-full sm:w-auto"
								onClick={signIn}
							>
								Sign In to Save
							</Button>
						)}
					</motion.div>

					{/* Features */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
					>
						<div className="p-6 rounded-lg bg-card border">
							<h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
							<p className="text-muted-foreground">
								Get smart suggestions for your greeting messages
							</p>
						</div>
						<div className="p-6 rounded-lg bg-card border">
							<h3 className="text-lg font-semibold mb-2">
								Beautiful Templates
							</h3>
							<p className="text-muted-foreground">
								Choose from a variety of stunning card designs
							</p>
						</div>
						<div className="p-6 rounded-lg bg-card border">
							<h3 className="text-lg font-semibold mb-2">Easy Sharing</h3>
							<p className="text-muted-foreground">
								Share your cards instantly with friends and family
							</p>
						</div>
					</motion.div>
				</div>
			</div>

			{/* Decorative Elements */}
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, delay: 0.6 }}
				className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"
			/>
		</div>
	);
}
