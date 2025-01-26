"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { matchUsers } from "./mock-data"

interface MatchUsersState {
  users: IMatchUser[]
  addUser: (user: IMatchUser) => void
}

const defaultState: MatchUsersState = {
  users: [],
  addUser: () => {},
}

const MatchUsersContext = createContext<MatchUsersState>(defaultState)

export const MatchUsersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<IMatchUser[]>(matchUsers)

  const addUser = (user: IMatchUser) => {
    setUsers((prev) => [...prev, user])
  }

  return (
    <MatchUsersContext.Provider value={{ users, addUser }}>
      {children}
    </MatchUsersContext.Provider>
  )
}

export const useUsersMatch = () => {
  const context = useContext(MatchUsersContext)
  if (!context) {
    throw new Error("useUsersMatch must be used within a UsersMatchProvider")
  }
  return context
}
