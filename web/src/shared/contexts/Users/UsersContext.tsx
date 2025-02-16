"use client"

import React, { createContext, useContext, ReactNode } from "react"
import { MockAPI } from "@/shared/requests/MockAPI"

interface UsersState {
  getByUsername: (username: string) => Promise<IUser | undefined>
}

const defaultState: UsersState = {
  getByUsername: async () => undefined,
}

const UsersContext = createContext<UsersState>(defaultState)

export const UsersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const api = new MockAPI()

  const getByUsername = async (username: string) => {
    return await api.user.getByUsername(username)
  }

  return (
    <UsersContext.Provider value={{ getByUsername }}>
      {children}
    </UsersContext.Provider>
  )
}

export const useUsers = () => {
  const context = useContext(UsersContext)
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider")
  }
  return context
}
