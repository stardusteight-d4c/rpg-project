"use client"

import { SessionProvider } from "next-auth/react"
import { providers } from "../contexts"
import { ToastContainer } from "react-toastify"

export const Providers = ({
  children,
  session,
}: {
  children: React.ReactNode
  session?: any
}) => {
  return (
    <SessionProvider session={session}>
      <ToastContainer
        position="top-right"
        theme="dark"
        toastStyle={{
          backgroundColor: "#101010",
          color: "#fff",
          fontWeight: "500",
          fontSmooth: "antialiased",
          lineHeight: '18px'
          
        }}
      />
      {providers.reduceRight(
        (acc, Provider) => (
          <Provider>{acc}</Provider>
        ),
        children
      )}
    </SessionProvider>
  )
}
