import NextAuth from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const { auth, signIn, signOut } = NextAuth(authOptions);
