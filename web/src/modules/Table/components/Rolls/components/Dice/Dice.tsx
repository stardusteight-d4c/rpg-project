"use client"

import { Fragment, useState } from "react"
import {
  BackButton,
  SystemRolling,
  CharacterRolling,
  RollingType,
} from "./components"
import { useSheets } from "@/shared/contexts"
import { useParams } from "next/navigation"

export const Dice: React.FC = () => {
  const { activeTablePlayerSheet } = useSheets()
  const tableId = useParams().id as string
  const activePlayerSheet = activeTablePlayerSheet.get(tableId)
  const [mode, setMode] = useState<"character" | "system" | null>(null)
  const [selectedType, setSelectedType] = useState<
    "attributes" | "status" | "skills" | "combat" | null
  >(null)

  return (
    <section className="p-4 w-[500px] select-none z-[999] flex flex-col gap-4">
      <h3 className="block text-3xl font-bold background-gradient bg-clip-text text-transparent">
        Roll
      </h3>

      {!activePlayerSheet ? (
        <div>Nenhuma ficha ativa</div>
      ) : (
        <Fragment>
          <RollingType mode={mode} setMode={setMode} />
          <CharacterRolling
            playerCharacter={activePlayerSheet}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            mode={mode}
          />
          <SystemRolling mode={mode} playerCharacter={activePlayerSheet} />
          <BackButton mode={mode} setMode={setMode} />
        </Fragment>
      )}
    </section>
  )
}
