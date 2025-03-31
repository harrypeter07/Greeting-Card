import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Authentication | Eid Greeting Platform",
	description: "Sign in to create and manage your Eid greeting cards",
};

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
