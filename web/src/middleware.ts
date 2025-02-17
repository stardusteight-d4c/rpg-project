import { NextRequest, NextResponse } from "next/server"

export async function middleware(req: NextRequest) {
  // const currentSession = req.cookies.get("currentSession")?.value
  // // ver se tokens são válidos etc...

  // if (currentSession && req.nextUrl.pathname.startsWith("/auth")) {
  //   return NextResponse.redirect(new URL("/feed", req.url))
  // }

  // if (currentSession && req.nextUrl.pathname === "/") {
  //   return NextResponse.redirect(new URL("/feed", req.url))
  // }


  // if (!currentSession && !req.nextUrl.pathname.startsWith("/auth")) {
  //   return NextResponse.redirect(new URL("/auth/signin", req.url))
  // }


  return NextResponse.next()
}

export const config = {
  matcher: ["/auth/:path*", "/feed/:path*", "/"],
}

