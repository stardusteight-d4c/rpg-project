import type { Metadata } from "next"
import { Roboto_Condensed, Delius } from "next/font/google"
import "./globals.css"
import { ModalProvider } from "@/modules/Board/contexts/ModalContext"
import { UsersProvider } from "@/modules/Board/contexts/Users/UsersContext"
import { CharactersProvider } from "@/modules/Board/contexts/Characters/CharactersContext"
import { MapsProvider } from "@/modules/Board/contexts/Maps/MapsContext"
import { NotificationsProvider } from "@/modules/Board/contexts/Notifications/NotificationsContext"
import { RollsProvider } from "@/modules/Board/contexts/Rolls/RollsContext"

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoCondensed.className} ${delius.variable} overflow-hidden antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

const Providers = ({ children }: { children: React.ReactNode }) => (
  <RollsProvider>
    <NotificationsProvider>
      <UsersProvider>
        <CharactersProvider>
          <MapsProvider>
            <ModalProvider>{children}</ModalProvider>
          </MapsProvider>
        </CharactersProvider>
      </UsersProvider>
    </NotificationsProvider>
  </RollsProvider>
)
