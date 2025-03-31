"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
	{ name: "Home", href: "/" },
	{ name: "Design", href: "/design" },
	{ name: "Gallery", href: "/gallery" },
	{ name: "Collaborators", href: "/collaborators" },
];

export function Navbar() {
	const { user, status, signIn, signOut } = useAuth();
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<Link href="/" className="flex items-center space-x-2">
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 200, damping: 10 }}
							className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
						>
							Eid Cards
						</motion.div>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-8">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={`relative text-sm font-medium transition-colors hover:text-primary ${
									pathname === item.href
										? "text-primary"
										: "text-muted-foreground"
								}`}
							>
								{item.name}
								{pathname === item.href && (
									<motion.div
										layoutId="navbar-indicator"
										className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
										transition={{ type: "spring", stiffness: 300, damping: 30 }}
									/>
								)}
							</Link>
						))}
					</div>

					{/* Auth Buttons */}
					<div className="hidden md:flex items-center space-x-4">
						{status === "authenticated" ? (
							<>
								<Link href="/my-creations">
									<Button variant="outline" size="sm">
										My Creations
									</Button>
								</Link>
								<Button variant="ghost" size="sm" onClick={signOut}>
									Sign Out
								</Button>
							</>
						) : (
							<Button size="sm" onClick={signIn}>
								Sign In
							</Button>
						)}
					</div>

					{/* Mobile Menu Button */}
					<button
						className="md:hidden p-2"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className="md:hidden py-4 space-y-4"
					>
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={`block text-sm font-medium transition-colors hover:text-primary ${
									pathname === item.href
										? "text-primary"
										: "text-muted-foreground"
								}`}
								onClick={() => setIsMenuOpen(false)}
							>
								{item.name}
							</Link>
						))}
						{status === "authenticated" ? (
							<>
								<Link href="/my-creations" className="block">
									<Button variant="outline" size="sm" className="w-full">
										My Creations
									</Button>
								</Link>
								<Button
									variant="ghost"
									size="sm"
									className="w-full"
									onClick={signOut}
								>
									Sign Out
								</Button>
							</>
						) : (
							<Button size="sm" className="w-full" onClick={signIn}>
								Sign In
							</Button>
						)}
					</motion.div>
				)}
			</div>
		</nav>
	);
}
