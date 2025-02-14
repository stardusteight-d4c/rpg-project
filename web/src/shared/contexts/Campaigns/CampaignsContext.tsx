"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import {  campaigns as campaignsMock } from "./mock-data"

interface CampaignsState {
  campaigns: Campaign[]
  addCampaign: (campaign: Campaign) => void
  getBy: ({
    key,
    value,
  }: {
    key: keyof Campaign
    value: any
  }) => Campaign | undefined
  getAllBy: ({ key, value }: { key: keyof Campaign; value: any }) => Campaign[]
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
  const [campaigns, setCamapaigns] = useState<Campaign[]>(campaignsMock)

  const getBy = ({ key, value }: { key: keyof Campaign; value: any }) => {
    return campaigns.find((campaign) => campaign[key] === value)
  }

  const getAllBy = ({ key, value }: { key: keyof Campaign; value: any }) => {
    return campaigns.filter((campaign) => campaign[key] === value)
  }

  const addCampaign = (campaign: CampaignCreate) => {
    setCamapaigns((prevCampaign) => [
      {
        ...campaign,
        id: crypto.randomUUID(),
        duration: "0",
        status: "inactive",
        players: [],
        createdAt: new Date().toISOString(),
      },
      ...prevCampaign,
    ])
  }

  return (
    <CampaignsContext.Provider
      value={{
        campaigns,
        addCampaign,
        getBy,
        getAllBy
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
