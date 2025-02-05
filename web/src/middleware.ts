import { NextRequest, NextResponse } from "next/server"
import { useAuth } from "./shared/contexts/Auth/AuthContext"

export async function middleware(req: NextRequest) {
  // const { getToken } = useAuth()
  // const token = getToken()

  // if (!token && !req.nextUrl.pathname.startsWith("/auth")) {
  //   return NextResponse.redirect(new URL("/auth/signin", req.url))
  // }

  // if (token && req.nextUrl.pathname.startsWith("/auth")) {
  //   return NextResponse.redirect(
  //     new URL("/table/118c3962-fbbc-4dc0-8381-0f0d0a1afa38", req.url)
  //   )
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ["/auth/:path*"],
}
