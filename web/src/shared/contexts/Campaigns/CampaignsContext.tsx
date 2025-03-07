"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { MockAPI } from "@/shared/requests/MockAPI"

interface CampaignsState {
  userCampaigns: ICampaign[]
  campaign: ICampaign | undefined
  searchByName: (name: string) => Promise<ICampaign[]>
  add: (campaign: CampaignCreate) => Promise<ICampaign | void>
  getUserCampaigns: (userId: string) => Promise<Array<ICampaign> | void>
  getById: (campaignId: string) => Promise<ICampaign | undefined>
  update: (campaign: Partial<ICampaign>) => Promise<ICampaign | void>
  remove: (campaignId: string) => Promise<void>
}

const defaultState: CampaignsState = {
  userCampaigns: [],
  campaign: undefined,
  add: async () => {},
  searchByName: async () => [],
  getUserCampaigns: async () => [],
  getById: async () => undefined,
  update: async () => {},
  remove: async () => {},
}

const CampaignsContext = createContext<CampaignsState>(defaultState)

export const CampaignsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const api = new MockAPI()
  const [campaign, setCampaign] = useState<ICampaign | undefined>(undefined)
  const [cachedCampaigns, setCachedCampaigns] = useState<ICampaign[]>([])
  const [userCampaigns, setUserCampaigns] = useState<ICampaign[]>([])

  const getUserCampaigns = async (userId: string) => {
    return userCampaigns.length === 0
      ? await api.campaign
          .list({ ownerId: userId })
          .then((campaigns) => {
            setUserCampaigns(campaigns)
            return campaigns
          })
          .catch((error) => {
            throw new Error(error.message)
          })
      : userCampaigns
  }

  const searchByName = async (name: string) => {
    return await api.campaign
      .list({ name, search: true })
      .then((campaignsFound) => {
        campaignsFound &&
          setCachedCampaigns((prev) => [...prev, ...campaignsFound])
        return campaignsFound
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const getById = async (campaignId: string) => {
    const findCachedCampaign = cachedCampaigns.find(
      (cachedCampaign) => cachedCampaign.id === campaignId
    )
    findCachedCampaign && setCampaign(findCachedCampaign)
    return findCachedCampaign
      ? findCachedCampaign
      : await api.campaign
          .list({ campaignId: campaignId })
          .then((campaign) => {
            campaign && setCachedCampaigns((prev) => [...prev, campaign[0]]),
              setCampaign(campaign[0])

            return campaign[0]
          })
          .catch((error) => {
            throw new Error(error.message)
          })
  }

  const remove = async (campaignId: string) => {
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
        setCampaign(updatedCampaign)
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
        campaign,
        searchByName,
        userCampaigns,
        add,
        remove,
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
