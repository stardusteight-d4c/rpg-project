"use client"

import { MockAPI } from "@/shared/requests/MockAPI"
import React, { createContext, useContext, useState, ReactNode } from "react"

interface RollsState {
  rolls: Map<string, { rolls: Map<string, IRoll> }>
  openDiceModal: boolean
  setOpenDiceModal: (value: boolean) => void
  addRoll: (roll: IRoll) => Promise<IRoll>
  getRolls: (queryParams: RollsQueryParams) => Promise<ListResponseDTO<IRoll>>
}

const RollsContext = createContext<RollsState | undefined>(undefined)

export const RollsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const api = new MockAPI().initializeRoutes()
  const [openDiceModal, setOpenDiceModal] = useState<boolean>(false)
  const [rolls, setRolls] = useState<
    Map<string, { rolls: Map<string, IRoll> }>
  >(new Map())

  const updateRollsCache = (
    prev: Map<string, { rolls: Map<string, IRoll> }>,
    campaignId: string,
    newRolls: IRoll[] | IRoll
  ): Map<string, { rolls: Map<string, IRoll> }> => {
    const updatedCache = new Map(prev)
    const existingRolls = updatedCache.get(campaignId)
    if (Array.isArray(newRolls)) {
      if (existingRolls) {
        newRolls.forEach((roll) => {
          existingRolls.rolls.set(roll.id, roll)
        })
        updatedCache.set(campaignId, existingRolls)
      } else {
        const rollsMap = new Map<string, IRoll>()
        newRolls.forEach((roll) => {
          rollsMap.set(roll.id, roll)
        })
        updatedCache.set(campaignId, { rolls: rollsMap })
      }
    } else {
      if (existingRolls) {
        existingRolls.rolls.set(newRolls.id, newRolls)
        updatedCache.set(campaignId, existingRolls)
      } else {
        updatedCache.set(campaignId, {
          rolls: new Map().set(newRolls.id, newRolls),
        })
      }
    }
    return updatedCache
  }

  const addRoll = async (roll: IRoll) => {
    return api.campaign
      .roll(roll)
      .then((createdRoll) => {
        setRolls((prev) =>
          updateRollsCache(prev, createdRoll.campaignId, createdRoll)
        )
        return createdRoll
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  const getRolls = async (queryParams: RollsQueryParams) => {
    const { campaignId, currentPage, pageSize } = queryParams
    if (!campaignId) throw new Error("campaignId is required.")
    return api.campaign
      .rolls({
        campaignId,
        currentPage,
        pageSize,
      })
      .then((rollsPagination) => {
        setRolls((prev) =>
          updateRollsCache(prev, campaignId, rollsPagination.items)
        )
        return rollsPagination
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  return (
    <RollsContext.Provider
      value={{ rolls, addRoll, getRolls, openDiceModal, setOpenDiceModal }}
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
