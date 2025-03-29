"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

interface TableSheetsState {
  activePlayerSheet: ISheet | undefined
  activeTableSheets: ISheet[]
}

const defaultState: TableSheetsState = {
  activePlayerSheet: undefined,
  activeTableSheets: [],
}

const TableSheetsContext = createContext<TableSheetsState>(defaultState)

export const TableSheetsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activePlayerSheet, setActivePlayerSheet] = useState<
    ISheet | undefined
  >(undefined)
  const [activeTableSheets, setActiveTableSheets] = useState<ISheet[]>([])

  return (
    <TableSheetsContext.Provider
      value={{ activeTableSheets, activePlayerSheet }}
    >
      {children}
    </TableSheetsContext.Provider>
  )
}

export const useTableSheets = () => {
  const context = useContext(TableSheetsContext)
  if (!context) {
    throw new Error("useTableSheets must be used within a TableSheetsProvider")
  }
  return context
}
