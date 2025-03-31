"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";

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

	useEffect(() => {
		if (session?.user) {
			setUser(session.user);
		} else {
			setUser(null);
		}
	}, [session]);

	const handleSignIn = async () => {
		try {
			await signIn("google", { callbackUrl: "/gallery" });
		} catch (error) {
			console.error("Sign in error:", error);
		}
	};

	const handleSignOut = async () => {
		try {
			await signOut({ callbackUrl: "/" });
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
