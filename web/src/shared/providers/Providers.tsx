"use client"

import { ModalProvider } from "@/shared/contexts/ModalContext"
import { UsersProvider } from "@/shared/contexts/Users/UsersContext"
import { CharactersProvider } from "@/shared/contexts/Characters/CharactersContext"
import { MapsProvider } from "@/shared/contexts/Maps/MapsContext"
import { NotificationsProvider } from "@/shared/contexts/Notifications/NotificationsContext"
import { RollsProvider } from "@/shared/contexts/Rolls/RollsContext"
import { SessionProvider } from "next-auth/react"
import { AuthProvider } from "../contexts/Auth/AuthContext"
import { FeedProvider } from "../contexts/Feed/FeedContext"

export const Providers = ({
  children,
  session,
}: {
  children: React.ReactNode
  session?: any
}) => (
  <SessionProvider session={session}>
    <AuthProvider>
      <FeedProvider>
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
      </FeedProvider>
    </AuthProvider>
  </SessionProvider>
)
