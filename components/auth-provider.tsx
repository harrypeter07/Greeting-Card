"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";

export function AuthProvider({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<AuthConsumer>{children}</AuthConsumer>
		</SessionProvider>
	);
}

export const AuthContext = createContext<{
	signIn: () => Promise<void>;
	signOut: () => Promise<void>;
	user: any | null;
	status: "loading" | "authenticated" | "unauthenticated";
}>({
	signIn: async () => {},
	signOut: async () => {},
	user: null,
	status: "loading",
});

export function AuthConsumer({ children }: { children: React.ReactNode }) {
	const { data: session, status } = useSession();
	const [user, setUser] = useState<any | null>(null);
	const router = useRouter();

	useEffect(() => {
		if (session?.user) {
			console.log("Full session:", session);
			console.log("Session user:", session.user);
			setUser({
				...session.user,
				id: session.user.id,
			});
		} else {
			console.log("No session or user found");
			setUser(null);
		}
	}, [session]);

	const handleSignIn = async () => {
		try {
			console.log("Initiating sign in...");
			await signIn("google", {
				callbackUrl: "/design",
				redirect: true,
			});
		} catch (error) {
			console.error("Sign in error:", error);
		}
	};

	const handleSignOut = async () => {
		try {
			await signOut({ callbackUrl: "/" });
			router.refresh();
		} catch (error) {
			console.error("Sign out error:", error);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				signIn: handleSignIn,
				signOut: handleSignOut,
				user,
				status: status,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
