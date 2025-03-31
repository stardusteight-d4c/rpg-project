"use client"

import { Fragment, useState } from "react"
import { DiceRoll, StatsRoll } from "./components"
import { useSheets } from "@/shared/contexts"
import { useParams } from "next/navigation"
import { Button, EmptyState, ModalWrapper } from "@/shared/components/ui"
import {
  AddressBook,
  DiceFive,
  IdentificationBadge,
} from "@/shared/components/ui/icons"

export const RollModal: React.FC<{
  status: boolean
  onStatusChange: (value: boolean) => void
}> = ({ status, onStatusChange }) => {
  const { activeTablePlayerSheet } = useSheets()
  const tableId = useParams().id as string
  const activePlayerSheet = activeTablePlayerSheet.get(tableId)
  const [mode, setMode] = useState<"dice" | "stats">("dice")

  return (
    <ModalWrapper status={status} title="Roll" onStatusChange={onStatusChange}>
      {activePlayerSheet ? (
        <div className="py-2 px-4 sticky z-[200] border-b border-border shadow-md shadow-black/50 top-0 w-full inset-x-0 bg-background">
          <div className="flex item-center gap-x-2 mb-2">
            <img
              src={activePlayerSheet.infos.characterUrl}
              alt=""
              className="w-[32px] h-[32px] shadow-md shadow-black/50 rounded-full"
            />
            <span className="font-medium mt-[3px] text-lg w-fit block background-gradient bg-clip-text text-transparent">
              {activePlayerSheet.infos.name}
            </span>
          </div>
          <div className="flex items-center gap-x-4">
            <Button
              title="Dice Rolling"
              action={() => setMode("dice")}
              variant="modal"
              bgColor="gradientBlue"
              active={mode === "dice"}
            >
              <DiceFive />
            </Button>
            <Button
              title="Stats Rolling"
              action={() => setMode("stats")}
              variant="modal"
              bgColor="gradientBlue"
              active={mode === "stats"}
            >
              <IdentificationBadge />
            </Button>
          </div>
        </div>
      ) : (
        <div className="border-b pb-2 -mt-2 border-border shadow-md shadow-black/50  w-full z-[200] bg-background"></div>
      )}
      <div className="w-[700px]">
        {!activePlayerSheet ? (
          <div className="p-2">
            <EmptyState description="No active sheet, create or select one in the sheets tab.">
              <AddressBook />
            </EmptyState>
          </div>
        ) : (
          <div>
            <DiceRoll activeSheet={activePlayerSheet} mode={mode} />
            <StatsRoll playerCharacter={activePlayerSheet} mode={mode} />
          </div>
        )}
      </div>
    </ModalWrapper>
  )
}
