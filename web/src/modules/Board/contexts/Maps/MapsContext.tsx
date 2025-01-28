"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { maps as mockMaps } from "./mock-data"

interface MapsState {
  maps: IMap[]
  addMap: (map: IMap) => void
}

const defaultState: MapsState = {
  maps: [],
  addMap: () => {},
}

const MapsContext = createContext<MapsState>(defaultState)

export const MapsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [maps, setMaps] = useState<IMap[]>(mockMaps)

  const addMap = (user: IMap) => {
    setMaps((prev) => [...prev, user])
  }

  return (
    <MapsContext.Provider value={{ maps, addMap }}>
      {children}
    </MapsContext.Provider>
  )
}

export const useMaps = () => {
  const context = useContext(MapsContext)
  if (!context) {
    throw new Error("useMaps must be used within a MapsProvider")
  }
  return context
}
