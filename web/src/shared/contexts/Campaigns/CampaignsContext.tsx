"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { campaigns as campaignsMock } from "./mock-data"
import { MockAPI } from "@/api/MockAPI"

interface CampaignsState {
  campaigns: ICampaign[]
  addCampaign: (campaign: CampaignCreate) => void
  getBy: ({
    key,
    value,
  }: {
    key: keyof ICampaign
    value: any
  }) => ICampaign | undefined
  getAllBy: ({
    key,
    value,
  }: {
    key: keyof ICampaign
    value: any
  }) => ICampaign[]
}

const defaultState: CampaignsState = {
  campaigns: [],
  addCampaign: () => {},
  getBy: () => undefined,
  getAllBy: () => [],
}

const CampaignsContext = createContext<CampaignsState>(defaultState)

export const CampaignsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const api = new MockAPI()
  const [campaigns, setCamapaigns] = useState<ICampaign[]>(campaignsMock)

  const getBy = ({ key, value }: { key: keyof ICampaign; value: any }) => {
    return campaigns.find((campaign) => campaign[key] === value)
  }

  const getAllBy = ({ key, value }: { key: keyof ICampaign; value: any }) => {
    return campaigns.filter((campaign) => campaign[key] === value)
  }

  const addCampaign = async (campaign: CampaignCreate) => {
    await api.campaign
      .create(campaign)
      .then((res) => setCamapaigns((prev) => [res, ...prev]))
  }

  return (
    <CampaignsContext.Provider
      value={{
        campaigns,
        addCampaign,
        getBy,
        getAllBy,
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
