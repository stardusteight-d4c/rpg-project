import type { Metadata } from "next"
import { Roboto_Condensed, Delius } from "next/font/google"
import { getServerSession } from "next-auth"
import { Providers } from "@/shared/providers/Providers"
import "./globals.css"
import { authOptions } from "@/shared/libs/next_auth"

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
})

const delius = Delius({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-delius",
})

export const metadata: Metadata = {
  title: "Campfire",
  description: "Online Tabletop RPG",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body
        className={`${robotoCondensed.className} ${delius.variable} overflow-hidden antialiased`}
      >
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  )
}
