"use client"

import { MockAPI } from "@/shared/requests/MockAPI"
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react"

interface MapsState {
  maps: Map<string, IMap>
  copyMaps: IMap[]
  activeMap: IMap | undefined
  addMap: (map: IMap) => Promise<void>
  deleteMap: (id: string) => Promise<void>
  updateMap: (map: Partial<IMap>) => Promise<void>
  updateCopyMap: (updatedMap: Partial<IMap>) => void
  moveSheet: (newSheetPosition: SheetPosition) => Promise<SheetPosition>
}

const defaultState: MapsState = {
  maps: new Map(),
  copyMaps: [],
  activeMap: undefined,
  addMap: async () => {},
  deleteMap: async () => {},
  updateMap: async () => {},
  updateCopyMap: () => {},
  moveSheet: async () => ({} as SheetPosition),
}

const MapsContext = createContext<MapsState>(defaultState)

export const MapsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const api = new MockAPI().initializeRoutes()
  const [maps, setMaps] = useState<Map<string, IMap>>(new Map())
  const [copyMaps, setCopyMaps] = useState<IMap[]>([])
  const [activeMap, setActiveMap] = useState<IMap | undefined>(undefined)

  useEffect(() => {
    setActiveMap(maps.values().find((map) => map.active === true))
  }, [maps])

  const removeOldActiveMap = () => {
    if (!activeMap) return

    setMaps((prev) => {
      const updateCache = new Map(prev)
      const cacheArr = Array.from(prev.values())
      const updateCacheArr = cacheArr.map((map) =>
        map.id === activeMap.id ? { ...map, active: false } : map
      )
      updateCacheArr.map((cachedMap) => {
        updateCache.set(cachedMap.id, cachedMap)
      })
      return updateCache
    })
  }

  const addMap = async (createdMap: IMap) => {
    await api.map.create(createdMap).then(() => {
      setMaps((prev) => {
        const updateCache = new Map(prev)
        updateCache.set(createdMap.id, createdMap)
        return updateCache
      })

      if (createdMap.active) {
        if (activeMap) removeOldActiveMap()
        setActiveMap(createdMap)
      }
    })
  }

  const deleteMap = async (id: string) => {
    await api.map.delete(id).then(() => {
      setMaps((prev) => {
        const updateCache = new Map(prev)
        const map = updateCache.get(id)
        if (!map) throw new Error("Map not found")
        if (map.active) setActiveMap(undefined)
        updateCache.delete(id)
        return updateCache
      })
    })
  }

  const updateCopyMap = (updatedMap: Partial<IMap>) => {
    const { id } = updatedMap
    if (!id) return

    setCopyMaps((prevMaps) => {
      const isScenario = updatedMap.type === "scenario"
      const existingMapIndex = prevMaps.findIndex((map) => map.id === id)
      if (isScenario) {
        delete updatedMap.gridSize
        delete updatedMap.visibility
        delete updatedMap.positions
      }
      if (existingMapIndex !== -1) {
        return prevMaps.map((map) =>
          map.id === id ? { ...map, ...updatedMap } : map
        )
      }
      return [...prevMaps, { id, ...updatedMap } as IMap]
    })
  }

  const updateMap = async (map: Partial<IMap>) => {
    const { id } = map

    if (!id) throw new Error("Id is required")
    if (map.type === "scenario") {
      delete map.gridSize
      delete map.visibility
      delete map.positions
    }

    return await api.map.update(map).then((updatedMap) => {
      if (!activeMap) {
        setMaps((prev) => {
          const updateCache = new Map(prev)
          updateCache.set(id, updatedMap)
          return updateCache
        })
        return
      }

      if (updatedMap.active) {
        if (id !== activeMap.id) removeOldActiveMap()
        setActiveMap(updatedMap)
      } else if (activeMap.id === id) {
        setActiveMap(undefined)
      }

      setMaps((prev) => {
        const updateCache = new Map(prev)
        updateCache.set(id, updatedMap)
        return updateCache
      })
    })
  }

  const moveSheet = async (newSheetPosition: SheetPosition) => {
    let updateMap = maps.get(newSheetPosition.mapId)

    if (!updateMap) throw new Error("map not found.")

    setMaps((prev) => {
      const updateCache = new Map(prev)
      const filteredSheetsPositions = updateMap.positions?.filter(
        (position) => position.sheetId !== newSheetPosition.sheetId
      )

      updateMap.positions = [
        newSheetPosition,
        ...(filteredSheetsPositions ?? []),
      ]
      updateCache.set(updateMap.id, updateMap)

      return updateCache
    })

    await api.map.moveSheet(newSheetPosition)

    return newSheetPosition
  }

  return (
    <MapsContext.Provider
      value={{
        maps,
        copyMaps,
        addMap,
        activeMap,
        deleteMap,
        updateMap,
        updateCopyMap,
        moveSheet,
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
