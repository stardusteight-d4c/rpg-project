"use client"

import { MockAPI } from "@/shared/requests/MockAPI"
import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
} from "react"

interface NotificationsState {
  notify: {
    notifications: Map<string, INotification>
    viewed: boolean
  }
  sendNotification: (notification: INotification) => Promise<void>
  listNotifications: (
    queryParams: NotificationQueryParams & { navbar: boolean }
  ) => Promise<NotificationsResponseDTO>
}

const defaultState: NotificationsState = {
  notify: {
    notifications: new Map(),
    viewed: true,
  },
  sendNotification: async () => {},
  listNotifications: async () => ({
    notifications: [],
    viewed: true,
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
  const [notify, setNotify] = useState<{
    notifications: Map<string, INotification>
    viewed: boolean
  }>({ notifications: new Map(), viewed: true })

  const listNotifications = async (
    queryParams: NotificationQueryParams & { navbar: boolean }
  ) => {
    const { navbar } = queryParams
    return api.user
      .notifications(queryParams)
      .then((paginationNotifications) => {
        setNotify((prev) => {
          let cachedNotifications = {
            notifications: new Map(prev.notifications),
            viewed: true,
          }

          paginationNotifications.notifications.map((notification) =>
            cachedNotifications.notifications.set(notification.id, notification)
          )

          if (navbar) {
            return {
              notifications: new Map(prev.notifications),
              viewed: paginationNotifications.viewed,
            }
          }

          // enviar requisição para marcar como viewed

          return cachedNotifications
        })

        return paginationNotifications
      })
  }

  const sendNotification = async (notification: INotification) => {
    await api.user.sendNotification(notification)
  }

  return (
    <NotificationsContext.Provider
      value={{ notify, listNotifications, sendNotification }}
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
