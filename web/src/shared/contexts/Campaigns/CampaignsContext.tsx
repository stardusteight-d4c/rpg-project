"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { MockAPI } from "@/shared/requests/MockAPI"
import { sortArrayOfMapObjectByCreatedAt } from "@/shared/utils"

interface CampaignsState {
  lastRequestCampaignsData: Map<string, ICampaign>
  lastRequestProfileCampaignsData: Map<
    string,
    ListCampaignsResponseDTO<ICampaign>
  >
  searchByName: (name: string) => Promise<ICampaign[]>
  add: (campaign: CampaignCreate) => Promise<ICampaign | void>
  getCampaignsByUser: (
    queryParams: ListCampaignsDTO
  ) => Promise<ListCampaignsResponseDTO<ICampaign> | void>
  getById: (campaignId: string) => Promise<ICampaign | undefined>
  update: (campaign: Partial<ICampaign>) => Promise<ICampaign | void>
  remove: (campaignId: string) => Promise<void>
}

const defaultState: CampaignsState = {
  lastRequestCampaignsData: new Map(),
  lastRequestProfileCampaignsData: new Map(),
  add: async () => {},
  searchByName: async () => [],
  getCampaignsByUser: async () => {},
  getById: async () => undefined,
  update: async () => {},
  remove: async () => {},
}

const CampaignsContext = createContext<CampaignsState>(defaultState)

export const CampaignsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const api = new MockAPI().initializeRoutes()
  const [lastRequestCampaignsData, setLastRequestCampaignsData] = useState<
    Map<string, ICampaign>
  >(new Map())
  const [lastRequestProfileCampaignsData, setLastRequestProfileCampaignsData] =
    useState<Map<string, ListCampaignsResponseDTO<ICampaign>>>(new Map())

  const sortCampaignsMap = (campaginsMap: Map<string, ICampaign>) => {
    return new Map(
      sortArrayOfMapObjectByCreatedAt(Array.from(campaginsMap.entries()))
    )
  }

  // fazer por paginação
  const getCampaignsByUser = async ({ ownerId }: ListCampaignsDTO) => {
    if (!ownerId) return
    const existingUserCampaingsData =
      lastRequestProfileCampaignsData.get(ownerId)

    if (existingUserCampaingsData) {
      return existingUserCampaingsData
    }

    return await api.campaign
      .list({ ownerId })
      .then((campaigns) => {
        // setLastRequestProfileCampaignsData((prev) => {
        //   const updatedCache = new Map(prev)
        //   updatedCache.set(campaigns)
        // })
        return campaigns
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const searchByName = async (name: string) => {
    return await api.campaign
      .list({ name, search: true })
      .then((campaignsFound) => {
        setLastRequestCampaignsData((prev) => {
          const updatedCache = new Map(prev)
          campaignsFound.items.map((campaignFound) => {
            updatedCache.set(campaignFound.id, campaignFound)
          })
          return updatedCache
        })
        return campaignsFound.items
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const getById = async (campaignId: string) => {
    const prevCampaignRequestData = lastRequestCampaignsData.get(campaignId)

    if (prevCampaignRequestData) {
      return prevCampaignRequestData
    }

    return await api.campaign
      .list({ campaignId: campaignId })
      .then((campaign) => {
        setLastRequestCampaignsData((prev) => {
          const updatedCache = new Map(prev)
          updatedCache.set(campaign.items[0].id, campaign.items[0])
          return updatedCache
        })
        return campaign.items[0]
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const remove = async (campaignId: string) => {
    return await api.campaign
      .delete(campaignId)
      .then(() => {
        setLastRequestCampaignsData((prev) => {
          const updatedCache = new Map(prev)
          updatedCache.delete(campaignId)
          return updatedCache
        })

        setLastRequestProfileCampaignsData((prev) => {
          const updatedCache = new Map(prev)
          updatedCache.forEach((profileData, userId) => {
            const filteredCampaigns = profileData.items.filter(
              (campaign) => campaign.id !== campaignId
            )
            updatedCache.set(userId, {
              ...profileData,
              items: filteredCampaigns,
            })
          })
          return updatedCache
        })
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const update = async (campaign: Partial<ICampaign>) => {
    return await api.campaign
      .update(campaign)
      .then((updatedCampaign) => {
        setLastRequestCampaignsData((prev) => {
          const updatedCache = new Map(prev)
          const existingCampaing = updatedCache.get(campaign.id!)
          if (existingCampaing) {
            updatedCache.set(existingCampaing.id, {
              ...existingCampaing,
              ...updatedCampaign,
            })
          }
          return updatedCache
        })

        setLastRequestProfileCampaignsData((prev) => {
          const updatedCache = new Map(prev)
          const prevProfileRequest = updatedCache.get(updatedCampaign.owner.id)

          if (prevProfileRequest) {
            updatedCache.set(updatedCampaign.owner.id, {
              ...prevProfileRequest,
              items: Array.from(
                sortCampaignsMap(
                  new Map(prevProfileRequest.items.map((p) => [p.id, p])).set(
                    updatedCampaign.id,
                    updatedCampaign
                  )
                ).values()
              ),
            })
          }
          return updatedCache
        })

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
        setLastRequestCampaignsData((prev) => {
          const updatedCache = new Map(prev)
          updatedCache.set(createdCampaign.id, createdCampaign)
          return updatedCache
        })
        setLastRequestProfileCampaignsData((prev) => {
          const updatedCache = new Map(prev)
          const prevProfileCampaignRequest = updatedCache.get(
            createdCampaign.owner.id
          )

          if (prevProfileCampaignRequest) {
            updatedCache.set(createdCampaign.owner.id, {
              ...prevProfileCampaignRequest,
              items: [createdCampaign, ...prevProfileCampaignRequest?.items],
            })
          } else {
            updatedCache.set(createdCampaign.owner.id, {
              items: [createdCampaign],
              totalItems: 1,
              totalPages: 1,
            })
          }

          return updatedCache
        })
        return createdCampaign
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  return (
    <CampaignsContext.Provider
      value={{
        lastRequestCampaignsData,
        lastRequestProfileCampaignsData,
        searchByName,
        add,
        remove,
        getCampaignsByUser,
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
