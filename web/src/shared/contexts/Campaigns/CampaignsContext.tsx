"use client"

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react"
import { MockAPI } from "@/shared/requests/MockAPI"
import { sortArrayOfMapObjectByCreatedAt } from "@/shared/utils"

interface CampaignsState {
  isMaster: boolean
  lastRequestCampaignsData: Map<string, ICampaign>
  lastRequestProfileCampaignsData: Map<string, ListResponseDTO<ICampaign>>
  searchByName: (name: string) => Promise<ICampaign[]>
  add: (campaign: CampaignCreate) => Promise<ICampaign | void>
  getCampaignsByUser: (
    queryParams: CampaignQueryParams
  ) => Promise<ListResponseDTO<ICampaign> | void>
  getById: (campaignId: string) => Promise<ICampaign | undefined>
  getByTableId: (tableId: string, userId: string) => Promise<ICampaign | void>
  update: (campaign: Partial<ICampaign>) => Promise<ICampaign | void>
  remove: (campaignId: string) => Promise<void>
}

const defaultState: CampaignsState = {
  isMaster: false,
  lastRequestCampaignsData: new Map(),
  lastRequestProfileCampaignsData: new Map(),
  add: async () => {},
  searchByName: async () => [],
  getCampaignsByUser: async () => {},
  getById: async () => undefined,
  getByTableId: async () => {},
  update: async () => {},
  remove: async () => {},
}

const CampaignsContext = createContext<CampaignsState>(defaultState)

export const CampaignsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const api = new MockAPI().initializeRoutes()
  const [isMaster, setIsMaster] = useState<boolean>(false)
  const [activeCampaign, setActiveCampaign] = useState<ICampaign | undefined>(
    undefined
  )
  const [lastRequestCampaignsData, setLastRequestCampaignsData] = useState<
    Map<string, ICampaign>
  >(new Map())
  const [lastRequestProfileCampaignsData, setLastRequestProfileCampaignsData] =
    useState<Map<string, ListResponseDTO<ICampaign>>>(new Map())

  const sortCampaignsMap = (campaginsMap: Map<string, ICampaign>) => {
    return new Map(
      sortArrayOfMapObjectByCreatedAt(Array.from(campaginsMap.entries()))
    )
  }

  const getCampaignsByUser = async (queryParams: CampaignQueryParams) => {
    const { ownerId, pageSize } = queryParams
    if (!ownerId || !pageSize) return

    return await api.campaign
      .list({ ownerId, pageSize })
      .then((res) => {
        setLastRequestProfileCampaignsData((prev) => {
          const newCache = new Map(prev)
          const prevProfileRequest = newCache.get(ownerId)

          if (prevProfileRequest) {
            const updatedItems = new Map()

            prevProfileRequest.items.forEach((item) => {
              updatedItems.set(item.id, item)
            })

            res.items.forEach((item) => {
              updatedItems.set(item.id, item)
            })

            newCache.set(ownerId, {
              ...res,
              currentPage: Math.ceil(updatedItems.size / pageSize),
              items: Array.from(updatedItems.values()),
            })
          } else {
            newCache.set(ownerId, {
              ...res,
              items: res.items,
            })
          }

          return newCache
        })
        return res
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
          const newCache = new Map(prev)
          campaignsFound.items.map((campaignFound) => {
            newCache.set(campaignFound.id, campaignFound)
          })
          return newCache
        })
        return campaignsFound.items
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const getByTableId = async (tableId: string, userId: string) => {
    const prevCampaignRequestData = lastRequestCampaignsData.get(tableId)

    if (prevCampaignRequestData) {
      setActiveCampaign(prevCampaignRequestData)
      setIsMaster(prevCampaignRequestData.owner.id === userId)
      return prevCampaignRequestData
    }

    return await api.campaign
      .list({ tableId })
      .then((campaign) => {
        setLastRequestCampaignsData((prev) => {
          const newCache = new Map(prev)
          newCache.set(campaign.items[0].id, campaign.items[0])
          return newCache
        })
        setActiveCampaign(campaign.items[0])
        setIsMaster(campaign.items[0].owner.id === userId)
        return campaign.items[0]
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
      .list({ campaignId })
      .then((campaign) => {
        setLastRequestCampaignsData((prev) => {
          const newCache = new Map(prev)
          newCache.set(campaign.items[0].id, campaign.items[0])
          return newCache
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
          const newCache = new Map(prev)
          newCache.delete(campaignId)
          return newCache
        })

        setLastRequestProfileCampaignsData((prev) => {
          const newCache = new Map(prev)
          newCache.forEach((profileData, userId) => {
            const filteredCampaigns = profileData.items.filter(
              (campaign) => campaign.id !== campaignId
            )
            newCache.set(userId, {
              ...profileData,
              items: filteredCampaigns,
            })
          })
          return newCache
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
          const newCache = new Map(prev)
          const existingCampaing = newCache.get(campaign.id!)
          if (existingCampaing) {
            newCache.set(existingCampaing.id, {
              ...existingCampaing,
              ...updatedCampaign,
            })
          }
          return newCache
        })

        setLastRequestProfileCampaignsData((prev) => {
          const newCache = new Map(prev)
          const prevProfileRequest = newCache.get(updatedCampaign.owner.id)

          if (prevProfileRequest) {
            newCache.set(updatedCampaign.owner.id, {
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
          return newCache
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
          const newCache = new Map(prev)
          newCache.set(createdCampaign.id, createdCampaign)
          return newCache
        })
        setLastRequestProfileCampaignsData((prev) => {
          const newCache = new Map(prev)
          const prevProfileCampaignRequest = newCache.get(
            createdCampaign.owner.id
          )

          if (prevProfileCampaignRequest) {
            newCache.set(createdCampaign.owner.id, {
              ...prevProfileCampaignRequest,
              totalItems: prevProfileCampaignRequest.totalItems + 1,
              items: [createdCampaign, ...prevProfileCampaignRequest.items],
            })
          } else {
            newCache.set(createdCampaign.owner.id, {
              items: [createdCampaign],
              totalItems: 1,
              totalPages: 1,
            })
          }

          return newCache
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
        isMaster,
        lastRequestCampaignsData,
        lastRequestProfileCampaignsData,
        searchByName,
        add,
        remove,
        getByTableId,
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
