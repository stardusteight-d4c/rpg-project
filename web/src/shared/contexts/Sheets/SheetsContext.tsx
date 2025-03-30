"use client"

import React, { createContext, useContext, ReactNode, useState } from "react"
import { MockAPI } from "@/shared/requests/MockAPI"
import { sortArrayOfMapObjectByCreatedAt } from "@/shared/utils"

interface SheetsState {
  lastRequestProfileSheetsData: Map<string, ListResponseDTO<ISheet>>
  add: (sheet: ISheet) => Promise<ISheet | void>
  update: (sheet: Partial<ISheet>) => Promise<ISheet | void>
  remove: (sheetId: string) => Promise<void>
  getSheetsByUser: (
    queryParams: SheetQueryParams
  ) => Promise<ListResponseDTO<ISheet> | void>
  toggleSheetInCampaign: (sheetId: string, tableId: string) => Promise<void>
}

const defaultState: SheetsState = {
  lastRequestProfileSheetsData: new Map(),
  add: async () => {},
  update: async () => {},
  getSheetsByUser: async () => ({ items: [], totalItems: 0, totalPages: 0 }),
  remove: async () => {},
  toggleSheetInCampaign: async () => {},
}

const SheetsContext = createContext<SheetsState>(defaultState)

export const SheetsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const api = new MockAPI().initializeRoutes()
  const [lastRequestProfileSheetsData, setLastRequestProfileSheetsData] =
    useState<Map<string, ListResponseDTO<ISheet>>>(new Map())

  const sortSheetsMap = (sheetsMap: Map<string, ISheet>) => {
    return new Map(
      sortArrayOfMapObjectByCreatedAt(Array.from(sheetsMap.entries()))
    )
  }

  const addSheetInLocalState = (createdSheet: ISheet) => {
    setLastRequestProfileSheetsData((prev) => {
      const newCache = new Map(prev)
      const prevProfilePostsRequest = newCache.get(createdSheet.owner.id)

      if (prevProfilePostsRequest) {
        newCache.set(createdSheet.owner.id, {
          totalItems: prevProfilePostsRequest.items.length + 1,
          totalPages: Math.ceil(
            (prevProfilePostsRequest.items.length + 1) /
              prevProfilePostsRequest.pageSize!
          ),
          items: [createdSheet, ...prevProfilePostsRequest.items],
        })
      } else {
        newCache.set(createdSheet.owner.id, {
          totalItems: 1,
          totalPages: 1,
          items: [createdSheet],
        })
      }

      return newCache
    })
  }

  const updateSheetInLocalState = (updatedSheet: ISheet) => {
    setLastRequestProfileSheetsData((prev) => {
      const newCache = new Map(prev)
      const prevProfileRequest = newCache.get(updatedSheet.owner.id)

      if (prevProfileRequest) {
        newCache.set(updatedSheet.owner.id, {
          ...prevProfileRequest,
          items: Array.from(
            sortSheetsMap(
              new Map(prevProfileRequest.items.map((p) => [p.id, p])).set(
                updatedSheet.id,
                updatedSheet
              )
            ).values()
          ),
        })
      }
      return newCache
    })
  }

  const getSheetsByUser = async (queryParams: SheetQueryParams) => {
    const { ownerId, pageSize } = queryParams
    if (!ownerId || !pageSize) return

    return await api.sheet
      .list(queryParams)
      .then((res) => {
        setLastRequestProfileSheetsData((prev) => {
          const newCache = new Map(prev)
          const prevProfileRequest = newCache.get(ownerId)

          if (prevProfileRequest) {
            const updatedItems = new Map()

            prevProfileRequest.items.forEach((item) => {
              updatedItems.set(item.id, item)
            })

            res.items.forEach((item) => {
              updatedItems.set(item.id, item)
            })

            newCache.set(ownerId, {
              ...res,
              currentPage: Math.ceil(updatedItems.size / pageSize),
              items: Array.from(updatedItems.values()),
            })
          } else {
            newCache.set(ownerId, {
              ...res,
              items: res.items,
            })
          }

          return newCache
        })
        return res
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const add = async (sheet: ISheet) => {
    return await api.sheet
      .create(sheet)
      .then((createdSheet) => {
        addSheetInLocalState(createdSheet)
        return createdSheet
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const remove = async (sheetId: string) => {
    return await api.sheet
      .delete(sheetId)
      .then(() => {
        setLastRequestProfileSheetsData((prev) => {
          const newCache = new Map(prev)
          newCache.forEach((profileData, userId) => {
            const filteredSheets = profileData.items.filter(
              (sheet) => sheet.id !== sheetId
            )
            newCache.set(userId, {
              ...profileData,
              items: filteredSheets,
            })
          })
          return newCache
        })
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const update = async (sheet: Partial<ISheet>) => {
    return await api.sheet
      .update(sheet)
      .then((updatedSheet) => {
        updateSheetInLocalState(updatedSheet)
        return updatedSheet
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const toggleSheetInCampaign = async (sheetId: string, tableId: string) => {
    return await api.sheet
      .toggleSheetInCampaign(sheetId, tableId)
      .then((updatedSheets) => {
        updatedSheets.map((updatedSheet) =>
          updateSheetInLocalState(updatedSheet)
        )
      })
  }

  return (
    <SheetsContext.Provider
      value={{
        lastRequestProfileSheetsData,
        getSheetsByUser,
        add,
        update,
        remove,
        toggleSheetInCampaign,
      }}
    >
      {children}
    </SheetsContext.Provider>
  )
}

export const useSheets = () => {
  const context = useContext(SheetsContext)
  if (!context) {
    throw new Error("useSheets must be used within a SheetsProvider")
  }
  return context
}
