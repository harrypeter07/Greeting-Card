"use client";

import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CollaboratorsPage() {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/signin");
		}
	}, [status, router]);

	if (status === "loading") {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="max-w-4xl mx-auto"
			>
				<h1 className="text-4xl font-bold text-center mb-8">Collaborators</h1>
				<div className="bg-white rounded-lg shadow-lg p-6">
					<p className="text-gray-600 text-center">
						Connect with other greeting card creators and collaborate on amazing
						designs.
					</p>
					{/* Add collaborator features here */}
				</div>
			</motion.div>
		</div>
	);
}
