"use client"

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
  addMap: (map: IMap) => void
  deleteMap: (id: string) => void
  updateMap: (id: string, updatedMap: IMap) => void
  updateCopyMap: (id: string, updatedMap: Partial<IMap>) => void
  moveSheet: (sheetPosition: SheetPosition) => Promise<SheetPosition>
}

const defaultState: MapsState = {
  maps: new Map(),
  copyMaps: [],
  activeMap: undefined,
  addMap: () => {},
  deleteMap: () => {},
  updateMap: () => {},
  updateCopyMap: () => {},
  moveSheet: async () => ({} as SheetPosition),
}

const MapsContext = createContext<MapsState>(defaultState)

export const MapsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
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
      const updateCacheArr = Array.from(prev.values())
      updateCacheArr.map((map) =>
        map.id === activeMap.id ? { ...map, active: false } : map
      )
      updateCacheArr.map((cachedMap) => {
        updateCache.set(cachedMap.id, cachedMap)
      })
      return updateCache
    })
  }

  const addMap = (createdMap: IMap) => {
    // Fazer rota mockada para map

    setMaps((prev) => {
      const updateCache = new Map(prev)
      updateCache.set(createdMap.id, createdMap)
      return updateCache
    })

    if (createdMap.active) {
      if (activeMap) removeOldActiveMap()
      setActiveMap(createdMap)
    }
  }

  const deleteMap = (id: string) => {
    // Fazer rota mockada para map

    setMaps((prev) => {
      const updateCache = new Map(prev)
      const map = updateCache.get(id)
      if (!map) throw new Error("Map not found")
      if (map.active) setActiveMap(undefined)
      updateCache.delete(id)
      return updateCache
    })
  }

  const updateCopyMap = (id: string, updatedMap: Partial<IMap>) => {
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

  const updateMap = (id: string, updatedMap: IMap) => {
    // Fazer rota mockada para map

    if (updatedMap.type === "scenario") {
      delete updatedMap.gridSize
      delete updatedMap.visibility
      delete updatedMap.positions
    }

    if (!activeMap) {
      setMaps((prev) => {
        const updateCache = new Map(prev)
        updateCache.set(updatedMap.id, updatedMap)
        return updateCache
      })
      return
    }

    if (updatedMap.active) {
      if (updatedMap.id !== activeMap.id) removeOldActiveMap()
      setActiveMap(updatedMap)
    } else if (activeMap.id === updatedMap.id) {
      setActiveMap(undefined)
    }

    setMaps((prev) => {
      const updateCache = new Map(prev)
      updateCache.set(updatedMap.id, updatedMap)
      return updateCache
    })
  }

  const moveSheet = async (sheetPosition: SheetPosition) => {
    // setMaps(())
    return {} as any
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
