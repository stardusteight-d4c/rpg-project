"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { maps as mockMaps } from "./mock-data"

interface MapsState {
  maps: IMap[]
  copyMaps: IMap[]
  activeMap: IMap | undefined
  addMap: (map: IMap) => void
  updateMap: (id: string, updatedMap: IMap) => void
  updateCopyMap: (id: string, updatedMap: Partial<IMap>) => void
}

const defaultState: MapsState = {
  maps: [],
  copyMaps: [],
  activeMap: undefined,
  addMap: () => {},
  updateMap: () => {},
  updateCopyMap: () => {},
}

const MapsContext = createContext<MapsState>(defaultState)

export const MapsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [maps, setMaps] = useState<IMap[]>(mockMaps)
  const [copyMaps, setCopyMaps] = useState<IMap[]>(mockMaps)
  const [activeMap, setActiveMap] = useState<IMap | undefined>(
    maps.find((map) => map.active === true)
  )

  const addMap = (user: IMap) => {
    setMaps((prev) => [...prev, user])
  }

  const updateCopyMap = (id: string, updatedMap: Partial<IMap>) => {
    setCopyMaps((prev) =>
      prev.map((map) => (map.id === id ? { ...map, ...updatedMap } : map))
    )
  }

  const updateMap = (id: string, updatedMap: IMap) => {
    console.log(updatedMap)

    if (updatedMap.type === "scenario") {
      delete updatedMap.grid_size
      delete updatedMap.visibility
    }

    if (activeMap) {
      if (updatedMap.active === true) {
        if (updatedMap.id !== activeMap?.id) {
          setMaps((prev) =>
            prev.map((map) =>
              map.id === activeMap.id ? { ...map, active: false } : map
            )
          )
        }
        setActiveMap(updatedMap)
      }
    }

    setMaps((prev) =>
      prev.map((map) => (map.id === id ? { ...updatedMap } : map))
    )
  }

  return (
    <MapsContext.Provider
      value={{ maps, copyMaps, addMap, activeMap, updateMap, updateCopyMap }}
    >
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
