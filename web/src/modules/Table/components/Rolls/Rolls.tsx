"use client"

import React from "react"
import { useCampaigns, useRolls } from "@/shared/contexts"
import { Components } from "./components"

export const Rolls = () => {
  const { rolls: tableRolls } = useRolls()
  const { currentCampaign } = useCampaigns()
  if (!currentCampaign) return

  const rolls = Array.from(
    tableRolls.get(currentCampaign.id)?.rolls.values() ?? []
  )

  return (
    <Wrapper>
      <Components.Empty length={rolls.length} />
      <Components.Display rolls={rolls} />
      <Components.Dice />
    </Wrapper>
  )
}

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <section className="w-full min-w-[20vw] max-w-[20vw] min-h-[100vh] max-h-[100vh] relative overflow-y-scroll no-scrollbar">
      {children}
    </section>
  )
}
