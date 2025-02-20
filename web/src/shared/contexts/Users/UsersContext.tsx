"use client"

import React, { createContext, useContext, ReactNode, useState } from "react"
import { MockAPI } from "@/shared/requests/MockAPI"

interface UsersState {
  cachedUsers: IUser[]
  getByUsername: (username: string) => Promise<IUser | void>
  update: (updatedUser: Partial<IUser>) => Promise<IUser | void>
}

const defaultState: UsersState = {
  cachedUsers: [],
  getByUsername: async () => {},
  update: async () => {},
}

const UsersContext = createContext<UsersState>(defaultState)

export const UsersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const api = new MockAPI()

  const [cachedUsers, setCachedUsers] = useState<IUser[]>([])

  const getByUsername = async (username: string) => {
    const findCachedUser = cachedUsers.find(
      (user) => user.username === username
    )
    if (findCachedUser) return findCachedUser
    return await api.user
      .list({ username })
      .then((user) => {
        user && setCachedUsers((prev) => [...prev, user[0]])
        return user[0]
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const update = async (updatedUser: Partial<IUser>) => {
    return await api.user
      .update(updatedUser)
      .then((user) => {
        setCachedUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)))
        return user
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  return (
    <UsersContext.Provider value={{ cachedUsers, getByUsername, update }}>
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
