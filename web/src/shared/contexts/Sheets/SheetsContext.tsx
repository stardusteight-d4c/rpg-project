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
  getUserSheets: (userId: string) => Promise<ISheet[] | void>
}

const defaultState: SheetsState = {
  userSheets: [],
  add: async (sheet: ISheet) => {},
  update: async (sheet: Partial<ISheet>) => {},
  getUserSheets: async (userId: string) => {},
}

const SheetsContext = createContext<SheetsState>(defaultState)

export const SheetsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const api = new MockAPI()

  const [userSheets, setUserSheets] = useState<ISheet[]>([])

  const getUserSheets = async (userId: string) => {
    return await api.sheet
      .getUserSheets(userId)
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
      .add(sheet)
      .then((createdSheet) => {
        setUserSheets((prev) => [...prev, createdSheet])
        return createdSheet
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
    <SheetsContext.Provider value={{ userSheets, getUserSheets, add, update }}>
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
