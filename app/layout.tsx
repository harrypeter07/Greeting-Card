import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import { Navbar } from "@/components/navbar/navbar";
import { Hero } from "@/components/hero/hero";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.className} min-h-screen bg-background`}>
				<AuthProvider>
					<Navbar />
					<main className="flex-1">
						<Hero />
						<div className="container mx-auto px-4 py-8">{children}</div>
					</main>
					<Toaster />
				</AuthProvider>
			</body>
		</html>
	);
}
