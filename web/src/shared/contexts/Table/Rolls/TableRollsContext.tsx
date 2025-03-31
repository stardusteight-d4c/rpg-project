"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

interface TableRollsState {
  rolls: IRoll[]
  openDiceModal: boolean
  setOpenDiceModal: (value: boolean) => void
  addRoll: (roll: IRoll) => void
}

const defaultState: TableRollsState = {
  rolls: [],
  openDiceModal: false,
  setOpenDiceModal: () => {},
  addRoll: () => {},
}

const TableRollsContext = createContext<TableRollsState>(defaultState)

export const TableRollsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [rolls, setRolls] = useState<IRoll[]>([])
  const [openDiceModal, setOpenDiceModal] = useState<boolean>(false)

  const addRoll = (roll: IRoll) => {
    setRolls((prev) => [...prev, roll])
  }

  return (
    <TableRollsContext.Provider
      value={{ rolls, addRoll, openDiceModal, setOpenDiceModal }}
    >
      {children}
    </TableRollsContext.Provider>
  )
}

export const useTableRolls = () => {
  const context = useContext(TableRollsContext)
  if (!context) {
    throw new Error("useTableRolls must be used within a TableRollsProvider")
  }
  return context
}
