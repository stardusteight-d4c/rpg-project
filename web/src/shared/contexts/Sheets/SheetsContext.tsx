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
}

const defaultState: SheetsState = {
  lastRequestProfileSheetsData: new Map(),
  add: async () => {},
  update: async () => {},
  getSheetsByUser: async () => ({ items: [], totalItems: 0, totalPages: 0 }),
  remove: async () => {},
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
      const updatedCache = new Map(prev)
      const prevProfilePostsRequest = updatedCache.get(createdSheet.owner.id)

      if (prevProfilePostsRequest) {
        updatedCache.set(createdSheet.owner.id, {
          totalItems: prevProfilePostsRequest.items.length + 1,
          totalPages: Math.ceil(
            (prevProfilePostsRequest.items.length + 1) /
              prevProfilePostsRequest.pageSize!
          ),
          items: [createdSheet, ...prevProfilePostsRequest.items],
        })
      } else {
        updatedCache.set(createdSheet.owner.id, {
          totalItems: 1,
          totalPages: 1,
          items: [createdSheet],
        })
      }

      return updatedCache
    })
  }

  const getSheetsByUser = async (queryParams: SheetQueryParams) => {
    const { ownerId, pageSize } = queryParams
    if (!ownerId || !pageSize) return

    return await api.sheet
      .list(queryParams)
      .then((res) => {
        setLastRequestProfileSheetsData((prev) => {
          const updatedCache = new Map(prev)
          const prevProfileRequest = updatedCache.get(ownerId)

          if (prevProfileRequest) {
            const updatedItems = new Map()

            prevProfileRequest.items.forEach((item) => {
              updatedItems.set(item.id, item)
            })

            res.items.forEach((item) => {
              updatedItems.set(item.id, item)
            })

            updatedCache.set(ownerId, {
              ...res,
              currentPage: Math.ceil(updatedItems.size / pageSize),
              items: Array.from(updatedItems.values()),
            })
          } else {
            updatedCache.set(ownerId, {
              ...res,
              items: res.items,
            })
          }

          return updatedCache
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
          const updatedCache = new Map(prev)
          updatedCache.forEach((profileData, userId) => {
            const filteredSheets = profileData.items.filter(
              (sheet) => sheet.id !== sheetId
            )
            updatedCache.set(userId, {
              ...profileData,
              items: filteredSheets,
            })
          })
          return updatedCache
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
        setLastRequestProfileSheetsData((prev) => {
          const updatedCache = new Map(prev)
          const prevProfileRequest = updatedCache.get(updatedSheet.owner.id)

          if (prevProfileRequest) {
            updatedCache.set(updatedSheet.owner.id, {
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
          return updatedCache
        })

        return updatedSheet
      })
      .catch((error) => {
        throw new Error(error.message)
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
