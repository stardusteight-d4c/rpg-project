"use client"

import { MockAPI } from "@/shared/requests/MockAPI"
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  PropsWithChildren,
} from "react"

interface NotificationsState {
  notifications: Map<string, UserNotifications>
  sendNotification: (notification: INotification) => Promise<void>
  listNotifications: (
    recipientId: string
  ) => Promise<ListResponseDTO<UserNotifications>>
}

const defaultState: NotificationsState = {
  notifications: new Map(),
  sendNotification: async () => {},
  listNotifications: async () => ({
    items: [],
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 0,
  }),
}

const NotificationsContext = createContext<NotificationsState>(defaultState)

export const NotificationsProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const api = new MockAPI().initializeRoutes()
  const [notifications, setNotifications] = useState<
    Map<string, UserNotifications>
  >(new Map())

  const listNotifications = async (recipientId: string) => {
    return api.user
      .notifications({ recipientId })
      .then((paginationNotifications) => paginationNotifications)
  }

  const sendNotification = async (notification: INotification) => {
    api.user.sendNotification(notification)
  }

  return (
    <NotificationsContext.Provider
      value={{ notifications, listNotifications, sendNotification }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

export const useNotifications = () => {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationsProvider"
    )
  }
  return context
}
