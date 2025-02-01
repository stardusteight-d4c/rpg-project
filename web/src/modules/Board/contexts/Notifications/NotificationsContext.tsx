"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { notifications as mockNotifications } from "./mock-data"

interface NotificationsState {
  notifications: INotification[]
  addNotification: (notification: INotification) => void
}

const defaultState: NotificationsState = {
  notifications: [],
  addNotification: () => {},
}

const NotificationsContext = createContext<NotificationsState>(defaultState)

export const NotificationsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] =
    useState<INotification[]>(mockNotifications)

  const addNotification = (notification: INotification) => {
    setNotifications((prev) => [notification, ...prev])
  }

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification }}>
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
