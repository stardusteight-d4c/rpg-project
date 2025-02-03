"use client"

import { useCharacters } from "@/modules/Board/contexts/Characters/CharactersContext"
import { useState } from "react"
import {
  BackButton,
  SystemRolling,
  CharacterRolling,
  RollingType,
} from "./components"

export const Dice: React.FC = () => {
  const playerCharacter = useCharacters().characters[1]
  const [mode, setMode] = useState<"character" | "system" | null>(null)
  const [selectedType, setSelectedType] = useState<
    "attributes" | "status" | "skills" | "combat" | null
  >(null)

  return (
    <section className="p-4 w-[500px] select-none z-[999] flex flex-col gap-4">
      <h3 className="block text-3xl font-bold background-gradient bg-clip-text text-transparent">
        Roll
      </h3>
      <RollingType mode={mode} setMode={setMode} />
      <CharacterRolling
        playerCharacter={playerCharacter}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        mode={mode}
      />
      <SystemRolling mode={mode} />
      <BackButton mode={mode} setMode={setMode} />
    </section>
  )
}
