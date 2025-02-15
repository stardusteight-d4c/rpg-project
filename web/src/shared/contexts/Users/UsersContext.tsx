"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { matchUsers } from "./mock-data"

interface UsersState {
  users: User[]
  addUser: (user: User) => void
  getByUsername: (username: string) => User | undefined
}

const defaultState: UsersState = {
  users: [],
  addUser: () => {},
  getByUsername: () => undefined,
}

const UsersContext = createContext<UsersState>(defaultState)

export const UsersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>(matchUsers)

  const getByUsername = (username: string) => {
    return users.find((user) => user.username === username)
  }

  const addUser = (user: User) => {
    setUsers((prev) => [...prev, user])
  }

  return (
    <UsersContext.Provider value={{ users, addUser, getByUsername }}>
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
