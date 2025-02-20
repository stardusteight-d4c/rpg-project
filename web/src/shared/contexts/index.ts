import { ModalProvider } from "./ModalContext"
import { UsersProvider } from "./Users/UsersContext"
import { CharactersProvider } from "./Characters/CharactersContext"
import { MapsProvider } from "./Maps/MapsContext"
import { NotificationsProvider } from "./Notifications/NotificationsContext"
import { RollsProvider } from "./Rolls/RollsContext"
import { AuthProvider } from "./Auth/AuthContext"
import { FeedProvider } from "./Feed/FeedContext"
import { CampaignsProvider } from "./Campaigns/CampaignsContext"
import { ToastProvider } from "./Toaster/ToasterContext"
import { SheetsProvider } from "./Sheets/SheetsContext"
import { PostsProvider } from "./Posts/PostsContext"

export const providers = [
  AuthProvider,
  ToastProvider,
  CampaignsProvider,
  FeedProvider,
  PostsProvider,
  RollsProvider,
  NotificationsProvider,
  UsersProvider,
  SheetsProvider,
  CharactersProvider,
  MapsProvider,
  ModalProvider,
]
