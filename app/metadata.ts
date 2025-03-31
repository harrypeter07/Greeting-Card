import { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		default: "AI Greeting Card Creator",
		template: "%s | AI Greeting Card Creator",
	},
	description: "Create beautiful greeting cards with AI assistance",
	keywords: [
		"AI",
		"greeting cards",
		"card maker",
		"AI-powered",
		"digital cards",
	],
	authors: [{ name: "Your Name" }],
	creator: "Your Name",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://your-domain.com",
		title: "AI Greeting Card Creator",
		description: "Create beautiful greeting cards with AI assistance",
		siteName: "AI Greeting Card Creator",
	},
	twitter: {
		card: "summary_large_image",
		title: "AI Greeting Card Creator",
		description: "Create beautiful greeting cards with AI assistance",
		creator: "@yourusername",
	},
	icons: {
		icon: "/favicon.ico",
	},
};
