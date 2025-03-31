import { getServerSession } from "next-auth";
import { authConfig } from "./auth-config";

export const authOptions = authConfig;

export const auth = () => getServerSession(authOptions);
