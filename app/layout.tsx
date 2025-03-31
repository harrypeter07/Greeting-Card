"use client";

import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import { Navbar } from "@/components/navbar/navbar";
import { Hero } from "@/components/hero/hero";
import { useEffect } from "react";
import dbConnect from "@/lib/db-connect";

const inter = Inter({ subsets: ["latin"] });

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	useEffect(() => {
		const initDb = async () => {
			try {
				await dbConnect();
			} catch (error) {
				console.error("Failed to connect to MongoDB:", error);
			}
		};
		initDb();
	}, []);

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<AuthProvider>
					<Navbar />
					<main>
						<Hero />
						{children}
					</main>
				</AuthProvider>
			</body>
		</html>
	);
}

import "./globals.css";
