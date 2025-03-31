import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Collaborators | Greeting Card Generator",
	description:
		"Connect with other greeting card creators and collaborate on amazing designs.",
};

export default function CollaboratorsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
