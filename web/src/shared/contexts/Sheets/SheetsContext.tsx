"use client"

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react"
import { MockAPI } from "@/shared/requests/MockAPI"

interface SheetsState {
  userSheets: ISheet[]
  add: (sheet: ISheet) => Promise<ISheet | void>
  update: (sheet: Partial<ISheet>) => Promise<ISheet | void>
  getUserSheets: (userId: string) => Promise<ISheet[]>
  remove: (sheetId: string) => Promise<void>
}

const defaultState: SheetsState = {
  userSheets: [],
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
  const [userSheets, setUserSheets] = useState<ISheet[]>([])

  const getUserSheets = async (userId: string) => {
    return await api.sheet
      .list({ ownerId: userId })
      .then((sheets) => {
        setUserSheets(sheets)
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
        setUserSheets((prev) => [...prev, createdSheet])
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
        setUserSheets((prev) => prev.filter((sheet) => sheet.id !== sheetId))
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const update = async (sheet: Partial<ISheet>) => {
    return await api.sheet
      .update(sheet)
      .then((updatedSheet) => {
        setUserSheets((prev) =>
          prev.map((s) => (s.id === updatedSheet.id ? updatedSheet : s))
        )
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
