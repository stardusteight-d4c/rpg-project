"use client"

import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { useAuth, useCampaigns, useSheets } from "@/shared/contexts"
import { Components } from "./components"

export function CampaignModule() {
  const campaignId = useParams().id as string
  const { getById, lastRequestCampaignsData } = useCampaigns()
  const { listSheets } = useSheets()
  const { currentSession } = useAuth()
  const [campaign, setCampaign] = useState<ICampaign | undefined>(undefined)

  useEffect(() => {
    ;(async () => {
      const existingCampaignData = lastRequestCampaignsData.get(campaignId)
      setCampaign(existingCampaignData)
      await getById(campaignId).then(async (res) => {
        if (!res) return
        setCampaign(res)
        await listSheets({
          campaignId,
          active: true,
          tableId: res.tableId,
        })
      })
    })()
  }, [campaignId, lastRequestCampaignsData])

  if (!campaign || !currentSession) return

  return (
    <Wrapper>
      <Components.Navbar />
      <Components.Header campaign={campaign} />
      <Components.Details campaign={campaign} />
      <Components.Feed campaign={campaign} />
      <Components.Footer />
    </Wrapper>
  )
}

export const Wrapper: React.FC<{ children: React.ReactNode[] }> = ({
  children,
}) => {
  const elements = React.Children.toArray(children)

  return (
    <main className="w-screen">
      {elements[0]}
      <div className="max-w-7xl mb-[200px] min-h-screen w-full mx-auto mt-[45px] pt-4">
        {elements[1]}
        <div className="grid grid-cols-2 w-full gap-x-4">
          {elements[2]}
          {elements[3]}
        </div>
      </div>
      {elements[4]}
    </main>
  )
}
