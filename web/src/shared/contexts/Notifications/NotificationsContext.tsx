"use client"

import { MockAPI } from "@/shared/requests/MockAPI"
import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
} from "react"

interface NotificationsState {
  notify: Map<string, UserNotifications>
  sendNotification: (notification: INotification) => Promise<void>
  listNotifications: (
    queryParams: NotificationQueryParams & { navbar: boolean }
  ) => Promise<NotificationsResponseDTO>
}

const defaultState: NotificationsState = {
  notify: new Map(),
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
  const [notify, setNotify] = useState<Map<string, UserNotifications>>(
    new Map()
  )

  const listNotifications = async (
    queryParams: NotificationQueryParams & { navbar: boolean }
  ) => {
    const { navbar, recipientId } = queryParams
    if (!recipientId) throw new Error("recipientId is required.")
    return api.user
      .notifications(queryParams)
      .then((paginationNotifications) => {
        setNotify((prev) => {
          const updateCache = new Map(prev)
          const prevProfileNotifications = updateCache.get(recipientId)

          if (prevProfileNotifications) {
            updateCache.set(recipientId, {
              notifications: [
                ...paginationNotifications.notifications,
                ...prevProfileNotifications.notifications,
              ],
              viewed: navbar ? paginationNotifications.viewed : true,
            })
          } else {
            updateCache.set(recipientId, {
              notifications: paginationNotifications.notifications,
              viewed: navbar ? paginationNotifications.viewed : true,
            })
          }

          if (!navbar) {
            api.user.viewedNotifications(recipientId!, true)
          }

          console.log({updateCache});
          

          return updateCache
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
