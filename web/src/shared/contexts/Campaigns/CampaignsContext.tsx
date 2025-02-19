"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { campaigns as campaignsMock } from "./mock-data"
import { MockAPI } from "@/shared/requests/MockAPI"

interface CampaignsState {
  userCampaigns: ICampaign[]
  addCampaign: (campaign: CampaignCreate) => Promise<ICampaign | void>
  getUserCampaigns: (userId: string) => Promise<Array<ICampaign> | void>
  getById: (campaingId: string) => Promise<ICampaign | undefined>
  // getBy: ({
  //   key,
  //   value,
  // }: {
  //   key: keyof ICampaign
  //   value: any
  // }) => ICampaign | undefined
  // getAllBy: ({
  //   key,
  //   value,
  // }: {
  //   key: keyof ICampaign
  //   value: any
  // }) => ICampaign[]
}

const defaultState: CampaignsState = {
  userCampaigns: [],
  addCampaign: async () => {},
  getUserCampaigns: async (userId: string) => [],
  getById: async (campaignId: string) => undefined,
  // getBy: () => undefined,
  // getAllBy: () => [],
}

const CampaignsContext = createContext<CampaignsState>(defaultState)

export const CampaignsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const api = new MockAPI()
  const [cachedCampaigns, setCachedCampaigns] = useState<ICampaign[]>([])
  const [userCampaigns, setUserCampaigns] = useState<ICampaign[]>([])

  // const getBy = ({ key, value }: { key: keyof ICampaign; value: any }) => {
  //   return campaigns.find((campaign) => campaign[key] === value)
  // }

  // const getAllBy = ({ key, value }: { key: keyof ICampaign; value: any }) => {
  //   return campaigns.filter((campaign) => campaign[key] === value)
  // }

  const getUserCampaigns = async (userId: string) => {
    return userCampaigns.length !== 0
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

  const addCampaign = async (campaign: CampaignCreate) => {
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
        addCampaign,
        getUserCampaigns,
        getById,
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
