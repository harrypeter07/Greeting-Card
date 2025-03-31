import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Our Team",
	description:
		"Meet the talented individuals behind the AI Greeting Card Creator",
};

("use client");

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const collaborators = [
	{
		name: "John Doe",
		role: "Lead Developer",
		image: "/avatars/john.jpg",
		bio: "Full-stack developer with 5+ years of experience in web development.",
		github: "https://github.com/johndoe",
		linkedin: "https://linkedin.com/in/johndoe",
	},
	{
		name: "Jane Smith",
		role: "UI/UX Designer",
		image: "/avatars/jane.jpg",
		bio: "Creative designer passionate about creating beautiful user experiences.",
		github: "https://github.com/janesmith",
		linkedin: "https://linkedin.com/in/janesmith",
	},
	{
		name: "Mike Johnson",
		role: "AI Engineer",
		image: "/avatars/mike.jpg",
		bio: "AI specialist focused on natural language processing and computer vision.",
		github: "https://github.com/mikejohnson",
		linkedin: "https://linkedin.com/in/mikejohnson",
	},
];

export default function CollaboratorsPage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="text-center mb-12">
				<h1 className="text-4xl font-bold mb-4">Our Team</h1>
				<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
					Meet the talented individuals behind this project. We're passionate
					about creating beautiful greeting cards with AI.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{collaborators.map((collaborator, index) => (
					<motion.div
						key={collaborator.name}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1 }}
					>
						<Card className="p-6 text-center">
							<div className="relative w-32 h-32 mx-auto mb-4">
								<img
									src={collaborator.image}
									alt={collaborator.name}
									className="rounded-full object-cover w-full h-full"
								/>
							</div>
							<h3 className="text-xl font-semibold mb-1">
								{collaborator.name}
							</h3>
							<p className="text-primary mb-4">{collaborator.role}</p>
							<p className="text-muted-foreground mb-6">{collaborator.bio}</p>
							<div className="flex justify-center space-x-4">
								<Link href={collaborator.github} target="_blank">
									<Button variant="outline" size="sm">
										GitHub
									</Button>
								</Link>
								<Link href={collaborator.linkedin} target="_blank">
									<Button variant="outline" size="sm">
										LinkedIn
									</Button>
								</Link>
							</div>
						</Card>
					</motion.div>
				))}
			</div>

			<div className="mt-16 text-center">
				<h2 className="text-2xl font-bold mb-4">Want to Join Our Team?</h2>
				<p className="text-muted-foreground mb-6">
					We're always looking for talented individuals to join our project.
				</p>
				<Link href="/contact">
					<Button>Contact Us</Button>
				</Link>
			</div>
		</div>
	);
}
