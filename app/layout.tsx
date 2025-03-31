import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import { Navbar } from "@/components/navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Eid Greeting Cards",
	description: "Create beautiful Eid greeting cards with AI assistance",
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
					<main className="pt-16">{children}</main>
				</AuthProvider>
			</body>
		</html>
	);
}

import "./globals.css";
