"use client"

import React, { useEffect, useState } from "react"
import { useCampaigns, useToast } from "@/shared/contexts"
import { Components } from "./components"
import { DataFetcher } from "@/shared/components/ui"

export const Campaigns: React.FC<{ user: IUser }> = ({ user }) => {
  const { lastRequestProfileCampaignsData, getCampaignsByUser } = useCampaigns()
  const { addToast } = useToast()
  const [campaigns, setCampaigns] = useState<ICampaign[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const pageSize = 2

  console.log("currentPage", currentPage)

  console.log(lastRequestProfileCampaignsData.get(user.id))

  useEffect(() => {
    ;(async () => {
      if (isLoading) return
      const existingData = lastRequestProfileCampaignsData.get(user.id)
      if (existingData && existingData.totalPages <= currentPage) return

      setIsLoading(true)
      await getCampaignsByUser({ ownerId: user.id, pageSize })
        .then((res) => {
          if (res) {
            setLastPage(res.totalPages)
            setCampaigns(res.items)
          }
        })
        .catch((error) => addToast(error, "error", 45))
        .finally(() => {
          setIsLoading(false)
        })
    })()

    setCampaigns(lastRequestProfileCampaignsData.get(user.id)?.items ?? [])
  }, [user, lastRequestProfileCampaignsData, currentPage])

  const handlePagination = () => {
    if (isLoading) return null
    if (currentPage <= lastPage && campaigns.length >= pageSize) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  return (
    <div>
      <Components.Heading />
      <Components.Empty campaigns={campaigns} />
      <Components.Slider
        campaigns={campaigns}
        onPagination={handlePagination}
      />
      {/* {isLoading && (
        <div>
          <DataFetcher />
        </div>
      )} */}
    </div>
  )
}
