"use client"

import { useParams } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import { useCampaigns } from "@/shared/contexts"
import { Campaign } from "./components"

export function CampaignModule() {
  const campaignId = useParams().id as string
  const { getById, campaign } = useCampaigns()

  useEffect(() => {
    ;(async () => {
      await getById(campaignId)
    })()
  }, [campaignId])

  if (!campaign) return

  return (
    <Wrapper>
      <Campaign.Navbar />
      <Campaign.Header campaign={campaign} />
      <Campaign.Details campaign={campaign} />
      <Campaign.Feed campaign={campaign} />
      <Campaign.Footer />
    </Wrapper>
  )
}

export const Wrapper = ({ children }: { children: React.ReactNode[] }) => {
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
