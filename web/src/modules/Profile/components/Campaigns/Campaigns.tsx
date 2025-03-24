"use client"

import React, { useEffect, useState } from "react"
import { useCampaigns } from "@/shared/contexts"
import { Components } from "./components"

export const Campaigns: React.FC<{ user: IUser }> = ({ user }) => {
  const { lastRequestProfileCampaignsData, getCampaignsByUser } = useCampaigns()
  const [campaigns, setCampaigns] = useState<ICampaign[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [lastPage, setLastPage] = useState(undefined)

  useEffect(() => {
    ;(async () => {
      await getCampaignsByUser({ ownerId: user.id })
    })()

    setCampaigns(lastRequestProfileCampaignsData.get(user.id)?.items ?? [])
  }, [user, lastRequestProfileCampaignsData])

  return (
    <div>
      <Components.Heading />
      <Components.Empty campaigns={campaigns} />
      <Components.Slider campaigns={campaigns} />
    </div>
  )
}
