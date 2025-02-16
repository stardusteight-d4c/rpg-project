"use client"

import { SessionProvider } from "next-auth/react"
import { providers } from "../contexts"
import { ToastContainer } from "react-toastify"
import { ToastProvider, useToast } from "../contexts/Toaster/ToasterContext"

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
