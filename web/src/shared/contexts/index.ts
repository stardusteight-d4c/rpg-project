import { ModalProvider } from "@/shared/contexts/ModalContext"
import { UsersProvider } from "@/shared/contexts/Users/UsersContext"
import { CharactersProvider } from "@/shared/contexts/Characters/CharactersContext"
import { MapsProvider } from "@/shared/contexts/Maps/MapsContext"
import { NotificationsProvider } from "@/shared/contexts/Notifications/NotificationsContext"
import { RollsProvider } from "@/shared/contexts/Rolls/RollsContext"
import { AuthProvider } from "@/shared/contexts/Auth/AuthContext"
import { FeedProvider } from "@/shared/contexts/Feed/FeedContext"

export const providers = [
  AuthProvider,
  FeedProvider,
  RollsProvider,
  NotificationsProvider,
  UsersProvider,
  CharactersProvider,
  MapsProvider,
  ModalProvider,
]
