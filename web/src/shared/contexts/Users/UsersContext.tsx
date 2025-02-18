"use client"

import React, { createContext, useContext, ReactNode, useState } from "react"
import { MockAPI } from "@/shared/requests/MockAPI"

interface UsersState {
  users: IUser[]
  getByUsername: (username: string) => Promise<IUser | void>
  update: (updatedUser: Partial<IUser>) => Promise<IUser | void>
}

const defaultState: UsersState = {
  users: [],
  getByUsername: async () => {},
  update: async () => {},
}

const UsersContext = createContext<UsersState>(defaultState)

export const UsersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const api = new MockAPI()
  
  const [users, setUsers] = useState<IUser[]>([])

  const getByUsername = async (username: string) => {
    const findCachedUser = users.find((user) => user.username === username)
    if (findCachedUser) return findCachedUser
    return await api.user
      .getByUsername(username)
      .then((user) => {
        user && setUsers((prev) => [...prev, user])
        return user
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const update = async (updatedUser: Partial<IUser>) => {
    return await api.user
      .update(updatedUser)
      .then((user) => {
        setUsers((prev) =>
          prev.map((u) => (u.id === updatedUser.id ? user : u))
        )
        return user
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  return (
    <UsersContext.Provider value={{ users, getByUsername, update }}>
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
