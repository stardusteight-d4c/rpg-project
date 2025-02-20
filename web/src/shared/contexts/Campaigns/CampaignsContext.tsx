"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { campaigns as campaignsMock } from "./mock-data"
import { MockAPI } from "@/shared/requests/MockAPI"

interface CampaignsState {
  userCampaigns: ICampaign[]
  add: (campaign: CampaignCreate) => Promise<ICampaign | void>
  getUserCampaigns: (userId: string) => Promise<Array<ICampaign> | void>
  getById: (campaingId: string) => Promise<ICampaign | undefined>
  update: (campaign: Partial<ICampaign>) => Promise<ICampaign | void>
  deleteById: (campaignId: string) => Promise<void>
}

const defaultState: CampaignsState = {
  userCampaigns: [],
  add: async () => {},
  getUserCampaigns: async (userId: string) => [],
  getById: async (campaignId: string) => undefined,
  update: async (campaign: Partial<ICampaign>) => {},
  deleteById: async (campaignId: string) => {},
}

const CampaignsContext = createContext<CampaignsState>(defaultState)

export const CampaignsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const api = new MockAPI()
  const [cachedCampaigns, setCachedCampaigns] = useState<ICampaign[]>([])
  const [userCampaigns, setUserCampaigns] = useState<ICampaign[]>([])

  const getUserCampaigns = async (userId: string) => {
    return userCampaigns.length === 0
      ? await api.campaign
          .getUserCampaigns(userId)
          .then((campaigns) => {
            setUserCampaigns(campaigns)
            return campaigns
          })
          .catch((error) => {
            throw new Error(error.message)
          })
      : userCampaigns
  }

  const getById = async (campaingId: string) => {
    const findCachedCampaign = cachedCampaigns.find(
      (cachedCampaign) => cachedCampaign.id === campaingId
    )

    return findCachedCampaign
      ? findCachedCampaign
      : await api.campaign
          .getById(campaingId)
          .then((campaing) => {
            campaing && setCachedCampaigns((prev) => [...prev, campaing])
            return campaing
          })
          .catch((error) => {
            throw new Error(error.message)
          })
  }

  const deleteById = async (campaignId: string) => {
    return api.campaign
      .delete(campaignId)
      .then(() => {
        setCachedCampaigns((prev) =>
          prev.filter((campaign) => campaign.id !== campaignId)
        )
        setUserCampaigns((prev) =>
          prev.filter((campaign) => campaign.id !== campaignId)
        )
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const update = async (campaign: Partial<ICampaign>) => {
    return await api.campaign
      .update(campaign)
      .then((updatedCampaign) => {
        setCachedCampaigns((prev) =>
          prev.map((c) => (c.id === updatedCampaign.id ? updatedCampaign : c))
        )
        setUserCampaigns((prev) =>
          prev.map((c) => (c.id === updatedCampaign.id ? updatedCampaign : c))
        )
        return updatedCampaign
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const add = async (campaign: CampaignCreate) => {
    return await api.campaign
      .create(campaign)
      .then((createdCampaign) => {
        setUserCampaigns((prev) => [createdCampaign, ...prev])
        setCachedCampaigns((prev) => [createdCampaign, ...prev])
        return createdCampaign
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  return (
    <CampaignsContext.Provider
      value={{
        userCampaigns,
        add,
        deleteById,
        getUserCampaigns,
        getById,
        update,
      }}
    >
      {children}
    </CampaignsContext.Provider>
  )
}

export const useCampaigns = () => {
  const context = useContext(CampaignsContext)
  if (!context) {
    throw new Error("useCampaigns must be used within a CampaignsProvider")
  }
  return context
}
