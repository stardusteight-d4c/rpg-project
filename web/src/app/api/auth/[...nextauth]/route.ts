import { authOptions } from "@/shared/libs/next_auth"
import NextAuth from "next-auth"

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}