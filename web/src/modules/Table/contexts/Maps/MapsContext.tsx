"use client"

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react"
import { maps as mockMaps } from "./mock-data"

interface MapsState {
  maps: IMap[]
  copyMaps: IMap[]
  wallpaper: string | undefined
  activeMap: IMap | undefined
  addMap: (map: IMap) => void
  addWallpaper: (wallpaper_url: string) => void
  deleteMap: (id: string) => void
  updateMap: (id: string, updatedMap: IMap) => void
  updateCopyMap: (id: string, updatedMap: Partial<IMap>) => void
}

const defaultState: MapsState = {
  maps: [],
  wallpaper: undefined,
  copyMaps: [],
  activeMap: undefined,
  addMap: () => {},
  addWallpaper: () => {},
  deleteMap: () => {},
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
  const [wallpaper, setWallpaper] = useState<string | undefined>(undefined)

  useEffect(() => {
    setActiveMap(maps.find((map) => map.active === true))
  }, [maps])

  const addWallpaper = (wallpaper_url: string) => setWallpaper(wallpaper_url)

  const addMap = (createdMap: IMap) => {
    if (activeMap) {
      if (createdMap.active === true) {
        if (createdMap.id !== activeMap?.id) {
          setMaps((prev) =>
            prev.map((map) =>
              map.id === activeMap.id ? { ...map, active: false } : map
            )
          )
        }
        setActiveMap(createdMap)
      }
      setMaps((prev) => [...prev, createdMap])
    } else {
      setMaps((prev) => [...prev, createdMap])
    }
  }

  const deleteMap = (id: string) => {
    setMaps((prev) => prev.filter((map) => map.id !== id))
  }

  const updateCopyMap = (id: string, updatedMap: Partial<IMap>) => {
    setCopyMaps((prev) => {
      if (updatedMap.type === "scenario") {
        delete updatedMap.grid_size
        delete updatedMap.visibility
      }

      const existingMap = prev.find((map) => map.id === id)

      if (existingMap) {
        return prev.map((map) =>
          map.id === id ? { ...map, ...updatedMap } : map
        )
      } else {
        return [...prev, { id, ...updatedMap } as IMap]
      }
    })
  }

  const updateMap = (id: string, updatedMap: IMap) => {
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

    if (
      activeMap &&
      activeMap.id === updatedMap.id &&
      updatedMap.active === false
    ) {
      setActiveMap(undefined)
    }

    setMaps((prev) =>
      prev.map((map) => (map.id === id ? { ...updatedMap } : map))
    )
  }

  return (
    <MapsContext.Provider
      value={{
        maps,
        wallpaper,
        copyMaps,
        addMap,
        addWallpaper,
        activeMap,
        deleteMap,
        updateMap,
        updateCopyMap,
      }}
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
