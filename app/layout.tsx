"use client";

import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import { Navbar } from "@/components/navbar/navbar";
import { Hero } from "@/components/hero/hero";
import { useEffect } from "react";
import dbConnect from "@/lib/db-connect";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

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
					<Toaster />
				</AuthProvider>
			</body>
		</html>
	);
}

import "./globals.css";
