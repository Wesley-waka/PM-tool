import authOptions from "@/app/auth/authOptions";
import nextAuth from "next-auth";

const handler = nextAuth(authOptions);

export {handler as GET, handler as POST}