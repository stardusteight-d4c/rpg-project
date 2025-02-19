"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { rolls as mockRolls } from "./mock-data"

interface RollsState {
  rolls: IRoll[]
  openDiceModal: boolean
  setOpenDiceModal: (value: boolean) => void
  addRoll: (roll: IRoll) => void
}

const defaultState: RollsState = {
  rolls: [],
  openDiceModal: false,
  setOpenDiceModal: () => {},
  addRoll: () => {},
}

const RollsContext = createContext<RollsState>(defaultState)

export const RollsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [rolls, setRolls] = useState<IRoll[]>(mockRolls)
  const [openDiceModal, setOpenDiceModal] = useState<boolean>(false)

  const addRoll = (roll: IRoll) => {
    setRolls((prev) => [...prev, roll])
  }

  return (
    <RollsContext.Provider
      value={{ rolls, addRoll, openDiceModal, setOpenDiceModal }}
    >
      {children}
    </RollsContext.Provider>
  )
}

export const useRolls = () => {
  const context = useContext(RollsContext)
  if (!context) {
    throw new Error("useRolls must be used within a RollsProvider")
  }
  return context
}
