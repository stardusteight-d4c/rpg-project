"use client"

import { useState } from "react"
import {
  CharactersDisplay,
  CharactersEdit,
  SelectedCharacterDisplay,
} from "./components"
import { characters, playerCharacter } from "./mock-data"
import { CharactersCreate } from "./components/CharactersCreate"

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
  const selectedCharacterState = { selectedCharacter, setSelectedCharacter }

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

  if (!selectedCharacter)
    return (
      <CharactersDisplay
        setCreateMode={setCreateMode}
        setEditMode={setEditMode}
        characters={characters}
        {...selectedCharacterState}
      />
    )
}
