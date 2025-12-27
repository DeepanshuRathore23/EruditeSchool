import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

export default NextAuth(authConfig).auth

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - /login
     * - /api/auth
     * - /_next
     * - static files
     */
    "/((?!login|api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
}
