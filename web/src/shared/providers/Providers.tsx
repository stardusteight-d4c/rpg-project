"use client"

import { SessionProvider } from "next-auth/react"
import { providers } from "../contexts"

export const Providers = ({
  children,
  session,
}: {
  children: React.ReactNode
  session?: any
}) => {
  return (
    <SessionProvider session={session}>
      {providers.reduceRight(
        (acc, Provider) => (
          <Provider>{acc}</Provider>
        ),
        children
      )}
    </SessionProvider>
  )
}
