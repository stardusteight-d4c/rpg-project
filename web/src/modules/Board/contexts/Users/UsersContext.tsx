"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { matchUsers } from "./mock-data"

interface UsersState {
  users: IUser[]
  addUser: (user: IUser) => void
}

const defaultState: UsersState = {
  users: [],
  addUser: () => {},
}

const UsersContext = createContext<UsersState>(defaultState)

export const UsersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<IUser[]>(matchUsers)

  const addUser = (user: IUser) => {
    setUsers((prev) => [...prev, user])
  }

  return (
    <UsersContext.Provider value={{ users, addUser }}>
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
