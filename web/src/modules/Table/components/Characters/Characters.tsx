"use client"

import { useState } from "react"
import {
  CharactersDisplay,
  CharactersEdit,
  SelectedCharacterDisplay,
} from "./components"
import { useCharacters } from "@/shared/contexts/Characters/CharactersContext"

export const Characters = () => {
  const characters = useCharacters().characters
  const [selectedCharacter, setSelectedCharacter] = useState<ISheet | null>(null)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [createMode, setCreateMode] = useState<boolean>(false)
  const selectedCharacterState = { selectedCharacter, setSelectedCharacter }


  if (editMode)
    return (
      <CharactersEdit
        setEditMode={setEditMode}
        playerCharacter={selectedCharacter!}
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
