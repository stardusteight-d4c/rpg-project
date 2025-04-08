import { Button } from "@/shared/components/ui"
import { useCampaigns, useRolls, useToast } from "@/shared/contexts"
import React, { useState } from "react"

export const DiceRoll: React.FC<{
  mode: "dice" | "stats"
  activeSheet: ISheet
}> = ({ mode, activeSheet }) => {
  if (mode !== "dice") return null
  const { currentCampaign } = useCampaigns()
  const { addRoll, setOpenDiceModal } = useRolls()
  const { addToast } = useToast()
  const [numDice, setNumDice] = useState<number>(1)
  const [diceType, setDiceType] = useState<number>(4)
  const diceTypes = [4, 6, 8, 10, 12, 20, 100]

  if (!currentCampaign) return

  const rollDice = async (sides: number, quantity: number) => {
    const rolls = Array.from(
      { length: quantity },
      () => Math.floor(Math.random() * sides) + 1
    )

    await addRoll({
      id: crypto.randomUUID(),
      campaignId: currentCampaign.id,
      character: activeSheet,
      systemRoll: {
        diceQuantity: numDice,
        diceType: diceType,
        rolled: rolls,
        total: rolls.reduce((acc, num) => acc + num, 0),
      },
      createdAt: new Date().toISOString(),
    })
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
      .finally(() => {
        setOpenDiceModal(false)
      })
  }

  return (
    <div className="flex flex-col gap-4 select-none">
      <div className="flex p-2 items-center gap-4">
        <div className="flex flex-col gap-y-1">
          <span className="text-sm text-gray-400 block">Number of Dices</span>
          <div className="grid-cols-5 grid gap-2">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                onClick={() => setNumDice(index + 1)}
                key={index}
                className={`${
                  numDice === index + 1 && "background-gradient"
                } col-span-1 shadow-md shadow-black/50 text-lg hover:brightness-125 cursor-pointer select-none w-[48px] h-[48px] bg-border rounded-xl flex items-center justify-center text-center`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
        <div className="h-[80px] w-0 border-l border-border mx-[20px] mt-[29px]" />
        <div className="flex flex-col gap-y-1">
          <span className="text-sm text-gray-400 block">Dice Type</span>
          <div className="grid-cols-4 grid gap-2">
            {diceTypes.map((type, index) => (
              <div
                key={index}
                onClick={() => setDiceType(type)}
                className={`${
                  type === diceType && "background-gradient"
                } col-span-1 shadow-md shadow-black/50 text-lg hover:brightness-125 cursor-pointer select-none w-[48px] h-[48px] bg-border rounded-xl flex items-center justify-center text-center`}
              >
                d{type}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="custom-inset-shadow z-[100] p-4 sticky bottom-0 inset-x-0 bg-background border-t border-border">
        <Button
          variant="default"
          bgColor="gradientBlue"
          title={`Roll ${numDice}d${diceType}`}
          action={async () => rollDice(diceType, numDice)}
        />
      </div>
    </div>
  )
}
