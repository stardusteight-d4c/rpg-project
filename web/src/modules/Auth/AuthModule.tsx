"use client"

import { usePathname } from "next/navigation"
import { Components } from "./components"

export function AuthModule() {
  const pathname = usePathname()

  if (pathname === "/auth/signup") return <Components.SignUp />
  if (pathname === "/auth/signin") return <Components.SignIn />
}
