import { SignInForm } from "@/components/auth/sign-in-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Sign In | Eid Greeting Platform",
	description: "Sign in to create and manage your Eid greeting cards",
};

export default function SignInPage() {
	return (
		<div className="container mx-auto py-8 flex justify-center">
			<div className="max-w-md w-full">
				<h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
				<SignInForm />
			</div>
		</div>
	);
}
