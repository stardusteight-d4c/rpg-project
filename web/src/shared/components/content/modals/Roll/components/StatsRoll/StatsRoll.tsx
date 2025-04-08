import React, { useState } from "react"
import { useCampaigns, useRolls } from "@/shared/contexts"
import { Components } from "./components"

export const StatsRoll: React.FC<{
  activeSheet: ISheet
  mode: "dice" | "stats"
}> = ({ activeSheet, mode }) => {
  if (mode !== "stats") return null
  const { addRoll, setOpenDiceModal } = useRolls()
  const { currentCampaign } = useCampaigns()
  if (!currentCampaign) return

  const [selectedType, setSelectedType] = useState<"attributes" | "skills">(
    "attributes"
  )

  const rollDice = async (selectedRoll: { value: number; name: string }) => {
    await addRoll({
      id: crypto.randomUUID(),
      campaignId: currentCampaign.id,
      character: activeSheet,
      characterRoll: {
        name: selectedRoll.name.toLocaleLowerCase(),
        value: selectedRoll.value,
        halfValue: Math.floor(selectedRoll.value / 2),
        fifthValue: Math.floor(selectedRoll.value / 5),
        rolled: Math.floor(Math.random() * 100) + 1,
      },
      createdAt: new Date().toISOString(),
    })
    setOpenDiceModal(false)
  }

  return (
    <Wrapper>
      <Components.SelectType
        selectedType={selectedType}
        onSelectedType={setSelectedType}
      />
      <Components.Attributes
        selectedType={selectedType}
        activeSheet={activeSheet}
        rollDice={rollDice}
      />
      <Components.Skills
        selectedType={selectedType}
        activeSheet={activeSheet}
        rollDice={rollDice}
      />
    </Wrapper>
  )
}

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex flex-col gap-4">{children}</div>
}
