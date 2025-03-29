"use client"

import { SessionProvider } from "next-auth/react"
import { AuthProvider } from "./Auth/AuthContext"
import { ModalProvider } from "./Modal/ModalContext"
import { UsersProvider } from "./Users/UsersContext"
import { CharactersProvider } from "./Characters/CharactersContext"
import { MapsProvider } from "./Maps/MapsContext"
import { NotificationsProvider } from "./Notifications/NotificationsContext"
import { CampaignsProvider } from "./Campaigns/CampaignsContext"
import { ToastProvider } from "./Toaster/ToasterContext"
import { SheetsProvider } from "./Sheets/SheetsContext"
import { PostsProvider } from "./Posts/PostsContext"
import { TableRollsProvider } from "./Table/Rolls/TableRollsContext"
import { TableSheetsProvider } from "./Table/Sheets/TableSheetsContext"

const providers = [
  AuthProvider,
  ToastProvider,
  CampaignsProvider,
  PostsProvider,
  TableSheetsProvider,
  TableRollsProvider,
  NotificationsProvider,
  UsersProvider,
  SheetsProvider,
  CharactersProvider,
  MapsProvider,
  ModalProvider,
]

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
