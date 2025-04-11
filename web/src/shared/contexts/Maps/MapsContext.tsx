"use client"

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react"

import { MockAPI } from "@/shared/requests/MockAPI"

interface MapsState {
  maps: Map<string, IMap>
  activeMap: IMap | undefined
  create: (map: IMap) => Promise<void>
  remove: (id: string) => Promise<void>
  update: (updatedData: PartialMapWithID<IMap>) => Promise<void>
  moveSheet: (newSheetPosition: SheetPosition) => Promise<SheetPosition>
}

const defaultState: MapsState = {
  maps: new Map(),
  activeMap: undefined,
  create: async () => {},
  remove: async () => {},
  update: async () => {},
  moveSheet: async () => ({} as SheetPosition),
}

const MapsContext = createContext<MapsState>(defaultState)

export const MapsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const api = new MockAPI().initializeRoutes()

  const [maps, setMaps] = useState<Map<string, IMap>>(new Map())
  const [activeMap, setActiveMap] = useState<IMap | undefined>(undefined)

  useEffect(() => {
    setActiveMap(maps.values().find((map) => map.active === true))
  }, [maps])

  const removeOldActiveMap = () => {
    if (!activeMap) return
    setMaps((prev) =>
      new Map(prev).set(activeMap.id, {
        ...activeMap,
        active: false,
      })
    )
  }

  const create = async (createdMap: IMap) => {
    return api.map.create(createdMap).then(() => {
      setMaps((prev) => new Map(prev).set(createdMap.id, createdMap))
      if (createdMap.active) {
        activeMap && removeOldActiveMap()
        setActiveMap(createdMap)
      }
    })
  }

  const remove = async (id: string) => {
    return api.map.delete(id).then(() => {
      const removedMap = maps.get(id)
      removedMap && removedMap.active && setActiveMap(undefined)
      setMaps((prev) => {
        const updateCache = new Map(prev)
        updateCache.delete(id)
        return updateCache
      })
    })
  }

  // if (map.type === "scenario") {
  //   delete map.gridSize
  //   delete map.visibility
  //   delete map.positions
  // }

  const update = async (updatedData: PartialMapWithID<IMap>) => {
    return api.map.update(updatedData).then((updatedMap) => {
      setMaps((prev) => new Map(prev).set(updatedData.id, updatedMap))
      if (updatedMap.active) {
        if (activeMap && updatedData.id !== activeMap.id) removeOldActiveMap()
        setActiveMap(updatedMap)
      }
    })
  }

  const moveSheet = async (newSheetPosition: SheetPosition) => {
    return api.map.moveSheet(newSheetPosition).then(() => {
      let map = maps.get(newSheetPosition.mapId)
      if (!map) throw new Error("Map not found.")
      setMaps((prev) => {
        const updateCache = new Map(prev)
        const filteredSheetsPositions = map.positions?.filter(
          (position) => position.sheetId !== newSheetPosition.sheetId
        )
        map.positions = [newSheetPosition, ...(filteredSheetsPositions ?? [])]
        updateCache.set(map.id, map)
        return updateCache
      })
      return newSheetPosition
    })
  }

  return (
    <MapsContext.Provider
      value={{
        maps,
        create,
        activeMap,
        remove,
        update,
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
