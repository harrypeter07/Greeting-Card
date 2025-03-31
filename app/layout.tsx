import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import { Navbar } from "@/components/navbar/navbar";
import { Hero } from "./components/hero";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "AI Greeting Card Creator",
	description: "Create beautiful greeting cards with AI",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
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
