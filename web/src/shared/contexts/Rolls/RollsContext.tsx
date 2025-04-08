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

const defaultState: RollsState = {
  rolls: new Map(),
  openDiceModal: false,
  setOpenDiceModal: () => {},
  addRoll: async () => ({} as IRoll),
  getRolls: async () => ({} as ListResponseDTO<IRoll>),
}

const RollsContext = createContext<RollsState>(defaultState)

export const RollsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const api = new MockAPI().initializeRoutes()
  const [rolls, setRolls] = useState<
    Map<string, { rolls: Map<string, IRoll> }>
  >(new Map())
  const [openDiceModal, setOpenDiceModal] = useState<boolean>(false)

  const addRoll = async (roll: IRoll) => {
    return api.campaign.roll(roll).then((createdRoll) => {
      setRolls((prev) => {
        const campaignId = createdRoll.campaignId
        const updateCache = new Map(prev)
        const existingRolls = updateCache.get(campaignId)
        if (existingRolls) {
          existingRolls.rolls.set(createdRoll.id, createdRoll)
          updateCache.set(campaignId, existingRolls)
          console.log("updateCache-1", updateCache)
          return updateCache
        }

        updateCache.set(campaignId, {
          rolls: new Map().set(createdRoll.id, createdRoll),
        })
        console.log("updateCache-2", updateCache)
        return updateCache
      })
      return createdRoll
    }).catch((error) => error)
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
        setRolls((prev) => {
          const updateCache = new Map(prev)
          const existingRolls = updateCache.get(campaignId)
          if (existingRolls) {
            rollsPagination.items.map((roll) => {
              existingRolls.rolls.set(roll.id, roll)
            })
            updateCache.set(campaignId, existingRolls)
            console.log("updateCache-1", updateCache)
            return updateCache
          }

          const initialRolls = new Map()
          rollsPagination.items.map((roll) => {
            initialRolls.set(roll.id, roll)
          })
          updateCache.set(campaignId, {
            rolls: initialRolls,
          })

          console.log("updateCache-2", updateCache)
          return updateCache
        })

        return rollsPagination
      }).catch((error) => error)
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
