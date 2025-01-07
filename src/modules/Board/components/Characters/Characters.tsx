"use client"

import { useState } from "react"
import {
  CharactersDisplay,
  CharactersEdit,
  SelectedCharacterDisplay,
} from "./components"
import { characters, playerCharacter } from "./mock-data"
import { CharactersCreate } from "./components/CharactersCreate"
import { NPCs } from "../NPCs"

export const Characters = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<{
    player: any
    infos: any
    attributes: any
    skills: any
    combat: any
    inventory: Array<{
      id: string
      name: string
    }>
    backstory: string
  } | null>(null)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [createMode, setCreateMode] = useState<boolean>(false)
  const [isViewNPCs, setIsViewNPCs] = useState<boolean>(false)
  const selectedCharacterState = { selectedCharacter, setSelectedCharacter }

  const toggleSwitch = () => {
    setIsViewNPCs((prevState) => !prevState)
  }

  if (createMode) return <CharactersCreate setCreateMode={setCreateMode} />

  if (editMode)
    return (
      <CharactersEdit
        setEditMode={setEditMode}
        playerCharacter={playerCharacter}
      />
    )

  if (selectedCharacter)
    return (
      <SelectedCharacterDisplay
        setEditMode={setEditMode}
        {...selectedCharacterState}
      />
    )

  if (!selectedCharacter && !isViewNPCs)
    return (
      <CharactersDisplay
        setCreateMode={setCreateMode}
        setEditMode={setEditMode}
        isViewNPCs={isViewNPCs}
        toggleSwitch={toggleSwitch}
        characters={characters}
        {...selectedCharacterState}
      />
    )

  if (isViewNPCs)
    return <NPCs isViewNPCs={isViewNPCs} toggleSwitch={toggleSwitch} />
}
