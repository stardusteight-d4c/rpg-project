"use client"

import { usePathname } from "next/navigation"
import { Auth } from "./components"

export function AuthModule() {
  const pathname = usePathname()

  if (pathname === "/auth/signup") return <Auth.SignUp />
  if (pathname === "/auth/signin") return <Auth.SignIn />
}
