"use client"

import { useState } from "react"
import {
  CharactersDisplay,
  CharactersEdit,
  SelectedCharacterDisplay,
} from "./components"
import { characters, playerCharacter } from "./mock-data"

export const Characters = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<{
    player: any
    infos: any
    attributes: any
    skills: any
    combat: any
  } | null>(null)
  const [editMode, setEditMode] = useState<boolean>(false)
  const selectedCharacterState = { selectedCharacter, setSelectedCharacter }

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
        setEditMode={setEditMode}
        characters={characters}
        {...selectedCharacterState}
      />
    )
}
