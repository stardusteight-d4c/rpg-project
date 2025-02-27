"use client"

import React, { createContext, useContext, ReactNode, useState } from "react"
import { MockAPI } from "@/shared/requests/MockAPI"

interface SheetsState {
  userSheets: Map<string, ISheet>
  add: (sheet: ISheet) => Promise<ISheet | void>
  update: (sheet: Partial<ISheet>) => Promise<ISheet | void>
  getUserSheets: (userId: string) => Promise<ISheet[]>
  remove: (sheetId: string) => Promise<void>
}

const defaultState: SheetsState = {
  userSheets: new Map(),
  add: async () => {},
  update: async () => {},
  getUserSheets: async () => [],
  remove: async () => {},
}

const SheetsContext = createContext<SheetsState>(defaultState)

export const SheetsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const api = new MockAPI()
  const [userSheets, setUserSheets] = useState<Map<string, ISheet>>(new Map())

  const updateCache = (sheets: ISheet[]) => {
    setUserSheets((prev) => {
      const newCache = new Map(prev)
      sheets.forEach((sheet) => newCache.set(sheet.id, sheet))
      return newCache
    })
  }

  const getUserSheets = async (userId: string) => {
    return await api.sheet
      .list({ ownerId: userId })
      .then((sheets) => {
        updateCache(sheets)
        return sheets
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const add = async (sheet: ISheet) => {
    return await api.sheet
      .create(sheet)
      .then((createdSheet) => {
        updateCache([createdSheet])
        return createdSheet
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const remove = async (sheetId: string) => {
    return api.sheet
      .delete(sheetId)
      .then(() => {
        setUserSheets((prev) => {
          const newCache = new Map(prev)
          newCache.delete(sheetId)
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
        updateCache([updatedSheet])
        return updatedSheet
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  return (
    <SheetsContext.Provider
      value={{ userSheets, getUserSheets, add, update, remove }}
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
